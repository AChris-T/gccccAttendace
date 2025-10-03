import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/queryKeys';
import { UserService } from '../services/user.service';
import { Toast } from '../lib/toastify';
import { useAuthStore } from '@/store/auth.store';

export const useUploadAvatar = (options = {}) => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationKey: QUERY_KEYS.AUTH.AVATAR_UPLOAD,
    mutationFn: UserService.uploadAvatar,

    onSuccess: (response, variables) => {
      Toast.success(response?.message || 'Avatar uploaded successfully ✅');

      if (response?.data?.avatar_url) {
        setUser((prev) => ({
          ...prev,
          avatar_url: response.data.avatar_url,
          avatar: response.data.avatar,
        }));
      }

      queryClient.invalidateQueries(QUERY_KEYS.AUTH.ME);
      queryClient.invalidateQueries(QUERY_KEYS.AUTH.PROFILE);
      options.onSuccess?.(response.data, variables);
    },

    onError: (error) => {
      // ✅ Safely extract backend message
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to upload avatar.';

      Toast.error(message);
      options.onError?.(error);
    },
  });
};

export const useUpdateProfile = (options = {}) => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationKey: QUERY_KEYS.AUTH.UPDATE_PROFILE,
    mutationFn: UserService.updateProfile,

    onSuccess: (response, variables) => {
      Toast.success(response?.message || 'Profile updated successfully');
      const updatedUser =
        response?.data?.user || response?.data || response?.user;

      if (updatedUser) {
        setUser((prev) => ({
          ...prev,
          ...updatedUser,
        }));
      } else {
      }

      queryClient.invalidateQueries(QUERY_KEYS.AUTH.ME);
      queryClient.invalidateQueries(QUERY_KEYS.AUTH.PROFILE);

      options.onSuccess?.(response.data, variables);
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to update profile.';

      Toast.error(message);
      options.onError?.(error);
    },
  });
};

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
