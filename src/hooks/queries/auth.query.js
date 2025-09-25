import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../../services/auth.service';
import { QUERY_KEYS } from '../../utils/queryKeys';
import {
  hasRole as checkRole,
  hasUnit as checkUnit,
  getUserRoles,
} from '../../utils/auth.helpers';
import { Toast } from '../../lib/toastify';
import { handleApiError } from '../../utils/helper';
import { useAuthStore } from '../../store/auth.store';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useMe = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: async () => {
      const { data } = await AuthService.getMe();
      return data.user;
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
    ...options,
  });
};

export const useLogin = (options = {}) => {
  const queryClient = useQueryClient();
  const { setAuthenticatedUser } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: ({ data }) => {
      const { token, user } = data;

      setAuthenticatedUser({ token, user });
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, user);

      Toast.success(`Welcome back, ${user?.first_name}!`);
      navigate(redirect, { replace: true });

      options.onSuccess?.(response, credentials);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message);
    },
  });
};

// Logout mutation
export const useLogout = (options = {}) => {
  const queryClient = useQueryClient();
  const { resetAuthenticatedUser } = useAuthStore();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.clear();
      resetAuthenticatedUser();

      Toast.info('You have been logged out successfully');
      options.onSuccess?.();
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message);
      options.onError?.(error);
    },
  });
};

export const useAuthHelpers = () => {
  const { data: user } = useMe();

  const hasRole = (role) => checkRole(user?.roles, role);
  const hasUnit = (unit) => checkUnit(user?.units, unit);
  const userRoles = getUserRoles(user?.roles || []);

  return {
    user,
    hasRole,
    hasUnit,
    isAdmin: userRoles.isAdmin,
    isLeader: userRoles.isLeader,
    isMember: userRoles.isMember,
    isAuthenticated: !!user,
  };
};
