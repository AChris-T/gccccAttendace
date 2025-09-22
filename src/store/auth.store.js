import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../utils/constant';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      isAdmin: false,
      isMember: false,
      isLeader: false,

      getMe: async () => {
        set({ loading: true });
        try {
          const { data } = await AuthService.getMe();
          const { user } = data;
          set({ user, isAuthenticated: true });
        } catch (err) {
          set({ user: null, isAuthenticated: false, token: null });
        } finally {
          set({ loading: false });
        }
      },

      login: async (credentials) => {
        set({ loading: true });
        try {
          const { data } = await AuthService.login(credentials);
          const { token, user } = data;
          const isAdmin = user?.role?.includes(
            UserRole.ADMIN || UserRole.SUPER_ADMIN
          );
          const isLeader = user?.role?.includes(UserRole.LEADER);
          const isMember = user?.role?.includes(UserRole.MEMBER);
          await set({
            token,
            user,
            isAdmin,
            isLeader,
            isMember,
            isAuthenticated: true,
          });
          return { user };
        } catch (err) {
          const message = err.response?.data?.message || 'Login failed';
          throw new Error(message);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await AuthService.logout();
          set({
            user: null,
            token: null,
            isAdmin: false,
            isLeader: false,
            isMember: false,
            isAuthenticated: false,
            loading: false,
          });
        } catch (err) {
          const message = err.response?.data?.message || 'Login failed';
          throw new Error(message);
        } finally {
          set({ loading: false });
        }
      },

      resetAuth: () => {
        set({
          user: null,
          token: null,
          isAdmin: false,
          isLeader: false,
          isMember: false,
          isAuthenticated: false,
          loading: false,
        });
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAdmin: state.isAdmin,
        isLeader: state.isLeader,
        isMember: state.isMember,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
