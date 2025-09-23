import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';
import { handleApiError } from '../utils/error.helpers';
import {
  hasRole as checkRole,
  hasUnit as checkUnit,
  getUserRoles,
} from '../utils/auth.helpers';
import { Toast } from '../lib/toastify';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  // Computed user properties (updated when user changes)
  isAdmin: false,
  isSuperAdmin: false,
  isLeader: false,
  isMember: false,
  userRoles: [],
  userUnits: [],
  // Loading states
  isLoginLoading: false,
  isLogoutLoading: false,
  isGetMeLoading: false,

  isLoginError: false,
  isLogoutError: false,
  isGetMeError: false,
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      hasRole: (role) => {
        const { user } = get();
        return checkRole(user?.roles, role);
      },

      hasUnit: (unit) => {
        const { user } = get();
        return checkUnit(user?.units, unit);
      },

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
        set({ isLoginLoading: true, isLoginError: false });
        try {
          const { data } = await AuthService.login(credentials);
          const { token, user } = data;
          const { isAdmin, isLeader, isMember } = getUserRoles(user?.roles);
          set({
            token,
            user,
            isAdmin,
            isLeader,
            isMember,
            isAuthenticated: true,
            isLoginLoading: false,
          });
          Toast.success(`Welcome back, ${user?.first_name || 'User'}!`);
          return { user };
        } catch (error) {
          set({ isLoginLoading: false, isLoginError: true });
          const errorDetails = handleApiError(error);
          throw new Error(errorDetails.message);
        }
      },

      logout: async () => {
        set({ isLogoutLoading: true });
        try {
          await AuthService.logout();
          set({
            user: null,
            token: null,
            isAdmin: false,
            isLeader: false,
            isMember: false,
            isAuthenticated: false,
            isLogoutLoading: false,
          });
          Toast.info('You have been logged out successfully');
        } catch (error) {
          set({ isLogoutLoading: false });
          const errorDetails = handleApiError(error);
          throw new Error(errorDetails.message);
        }
      },

      resetAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          // Computed user properties (updated when user changes)
          isAdmin: false,
          isSuperAdmin: false,
          isLeader: false,
          isMember: false,
          userRoles: [],
          userUnits: [],
          // Loading states
          isLoginLoading: false,
          isLogoutLoading: false,
          isGetMeLoading: false,

          isLoginError: false,
          isLogoutError: false,
          isGetMeError: false,
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
