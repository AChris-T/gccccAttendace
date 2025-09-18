import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      getMe: async () => {
        set({ loading: true });
        try {
          const user = await AuthService.getMe();
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
          await set({ token, user, isAuthenticated: true });
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
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
