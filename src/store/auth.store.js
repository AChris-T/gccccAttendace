import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  hasRole as checkRole,
  hasUnit as checkUnit,
  getUserRoles,
} from '../utils/auth.helpers';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  isSuperAdmin: false,
  isLeader: false,
  isMember: false,
  isFirstTimer: false,
  userRoles: [],
  userUnits: [],
};
export const useAuthStore = create()(
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

      setAuthenticatedUser: ({ user }) => {
        const { isAdmin, isLeader, isMember, isFirstTimer } = getUserRoles(
          user?.roles
        );
        set({ user, isAdmin, isLeader, isMember, isFirstTimer });
      },
      setToken: ({ token }) => {
        set({ token, isAuthenticated: true });
      },

      resetAuthenticatedUser: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
          isSuperAdmin: false,
          isLeader: false,
          isMember: false,
          userRoles: [],
          userUnits: [],
        });
      },
    }),
    {
      name: 'auth-user',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAdmin: state.isAdmin,
        isLeader: state.isLeader,
        isMember: state.isMember,
        isFirstTimer: state.isFirstTimer,
        isAuthenticated: state.isAuthenticated,
        userRoles: [],
        userUnits: [],
      }),
    }
  )
);
