import { getUserRoles } from '@/utils/auth.helpers';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  userUnitsDetails: [],
};
export const useAuthStore = create()(
  persist(
    (set, _) => ({
      ...initialState,

      setAuthenticatedUser: ({ user }) => {
        const { isAdmin, isLeader, isMember, isFirstTimer } = getUserRoles(
          user?.roles
        );
        set({
          user,
          isAdmin,
          isLeader,
          isMember,
          isFirstTimer,
          userRoles: user?.roles || [],
          userUnits: user?.units?.map((role) => role?.name) || [],
          userUnitsDetails: user?.units || [],
        });
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
          userUnitsDetails: [],
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
        userRoles: state.userRoles,
        userUnits: state.userUnits,
        userUnitsDetails: state.userUnitsDetails,
      }),
    }
  )
);
