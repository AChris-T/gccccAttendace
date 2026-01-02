import { getUserRoles } from '@/utils/auth.helpers';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  isPastor: false,
  isSuperAdmin: false,
  isLeader: false,
  isMember: false,
  isFirstTimer: false,
  userRoles: [],
  userPermissions: [],
  userUnits: [],
  userUnitsDetails: [],
};
export const useAuthStore = create()(
  persist(
    (set, _) => ({
      ...initialState,

      setAuthenticatedUser: ({ user }) => {
        const { isAdmin, isLeader, isMember, isFirstTimer, isPastor } = getUserRoles(
          user?.roles
        );
        set({
          user,
          isAdmin,
          isPastor,
          isLeader,
          isMember,
          isFirstTimer,
          userRoles: user?.roles || [],
          userPermissions: user?.permissions || [],
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
          isPastor: false,
          isSuperAdmin: false,
          isLeader: false,
          isMember: false,
          userRoles: [],
          userPermissions: [],
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
        isPastor: state.isPastor,
        isLeader: state.isLeader,
        isMember: state.isMember,
        isFirstTimer: state.isFirstTimer,
        isAuthenticated: state.isAuthenticated,
        userPermissions: state.userPermissions,
        userRoles: state.userRoles,
        userUnits: state.userUnits,
        userUnitsDetails: state.userUnitsDetails,
      }),
    }
  )
);
