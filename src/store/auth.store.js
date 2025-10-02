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
        const { isAdmin, isLeader, isMember } = getUserRoles(user?.roles);
        set({ user, isAdmin, isLeader, isMember });
      },
      setToken: ({ token }) => {
        set({ token, isAuthenticated: true });
      },

      setUser: (updatedUser) => {
        const { user } = get();
        // If `updatedUser` is a function, call it (so we can do setUser(prev => ...))
        if (typeof updatedUser === 'function') {
          set({ user: updatedUser(user) });
        } else {
          set({ user: { ...user, ...updatedUser } });
        }
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
        isAuthenticated: state.isAuthenticated,
        userRoles: [],
        userUnits: [],
      }),
    }
  )
);
// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       ...initialState,

//       hasRole: (role) => {
//         const { user } = get();
//         return checkRole(user?.roles, role);
//       },

//       hasUnit: (unit) => {
//         const { user } = get();
//         return checkUnit(user?.units, unit);
//       },

//       getMe: async () => {
//         set({ loading: true });
//         try {
//           const { data } = await AuthService.getMe();
//           const { user } = data;
//           set({ user, isAuthenticated: true });
//         } catch (err) {
//           set({ user: null, isAuthenticated: false, token: null });
//         } finally {
//           set({ loading: false });
//         }
//       },

//       login: async (credentials) => {
//         set({ isLoginLoading: true, isLoginError: false });
//         try {
//           const { data } = await AuthService.login(credentials);
//           const { token, user } = data;

//           Toast.success(`Welcome back, ${user?.first_name || 'User'}!`);
//           return { user };
//         } catch (error) {
//           set({ isLoginLoading: false, isLoginError: true });
//           const errorDetails = handleApiError(error);
//           throw new Error(errorDetails.message);
//         }
//       },

//       logout: async () => {
//         set({ isLogoutLoading: true });
//         try {
//           await AuthService.logout();
//           set({
//             user: null,
//             token: null,
//             isAdmin: false,
//             isLeader: false,
//             isMember: false,
//             isAuthenticated: false,
//             isLogoutLoading: false,
//           });
//           Toast.info('You have been logged out successfully');
//         } catch (error) {
//           set({ isLogoutLoading: false });
//           const errorDetails = handleApiError(error);
//           throw new Error(errorDetails.message);
//         }
//       },
//     }),
//     {
//       name: 'auth',
//       partialize: (state) => ({
//         token: state.token,
//         user: state.user,
//         isAdmin: state.isAdmin,
//         isLeader: state.isLeader,
//         isMember: state.isMember,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );
