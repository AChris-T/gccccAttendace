import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/queryKeys';
import { UserService } from '../services/user.service';
import { Toast } from '../lib/toastify';
import { useAuthStore } from '@/store/auth.store';
import { handleApiError } from '@/utils/helper';

export const useUpdateProfile = (options = {}) => {
  const { setAuthenticatedUser, user } = useAuthStore();

  return useMutation({
    mutationKey: undefined,
    mutationFn: async (variables) => {
      const data = await UserService.updateProfile(variables);
      return data;
    },
    onMutate: async (variables) => {
      if (variables.avatar) {
        const optimisticUser = { ...user, avatar: variables.avatar };
        setAuthenticatedUser({ user: optimisticUser });
      }
      return { previousUser: user };
    },
    onSuccess: ({ data }, variables, _) => {
      const { user } = data;
      requestAnimationFrame(() => {
        setAuthenticatedUser({ user });
        Toast.success(data?.message || 'Profile updated successfully');
        options.onSuccess?.(data, variables);
      });
    },

    onError: (error, _, context) => {
      if (context?.previousUser) {
        setAuthenticatedUser({ user: context.previousUser });
      }
      const message = handleApiError(error);
      Toast.error(message || 'Failed to update user record');
      options.onError?.(error);
    },
  });
};

// export const useUpdateProfile = (options = {}) => {
//   const queryClient = useQueryClient();
//   const { setAuthenticatedUser } = useAuthStore();

//   return useMutation({
//     mutationKey: QUERY_KEYS.AUTH.PROFILE,
//     mutationFn: UserService.updateProfile,

//     onSuccess: ({ data }, variables) => {
//       const { user } = data;
//       setAuthenticatedUser({ user });
//       Toast.success(data?.message || 'Profile updated successfully');
//       options.onSuccess?.(data, variables);
//     },

//     onError: (error) => {
//       const message = handleApiError(error);
//       Toast.error(message || 'Failed to update user record');
//       options.onError?.(error);
//     },
//   });
// };

export const useGetAssignedAbsentees = (options = {}) => {
  const { isAdmin, isLeader } = useAuthStore();
  return useQuery({
    queryKey: QUERY_KEYS.USER.ABSENT,
    queryFn: async () => {
      const { data } = await UserService.getAssignedAbsentees();
      return data;
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: isAdmin || isLeader,
    ...options,
  });
};
