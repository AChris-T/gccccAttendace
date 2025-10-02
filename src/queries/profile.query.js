import { useAuthStore } from "../store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/queryKeys";
import { ProfileService } from "../services/profile.service";
import { Toast } from "../lib/toastify";

export const useUploadAvatar = (options = {}) => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationKey: QUERY_KEYS.AUTH.AVATAR_UPLOAD,
    mutationFn: ProfileService.uploadAvatar,

    onSuccess: (response, variables) => {
      console.log("✅ Avatar upload response:", response);

      Toast.success(response?.message || "Avatar uploaded successfully ✅");

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
      console.error(" Avatar upload error:", error);

      // ✅ Safely extract backend message
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to upload avatar.";

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
    mutationFn: ProfileService.updateProfile,

    onSuccess: (response, variables) => {
      console.log(" Profile update full response:", response);

    
      Toast.success(response?.message || "Profile updated successfully");
      const updatedUser =
        response?.data?.user || response?.data || response?.user;

      if (updatedUser) {
        console.log("Updating Zustand store with:", updatedUser);
        setUser((prev) => ({
          ...prev,
          ...updatedUser,
        }));
      } else {
        console.warn(" No user found in response data");
      }

      queryClient.invalidateQueries(QUERY_KEYS.AUTH.ME);
      queryClient.invalidateQueries(QUERY_KEYS.AUTH.PROFILE);

      options.onSuccess?.(response.data, variables);
    },

    onError: (error) => {
      console.error("Profile update error:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update profile.";

      Toast.error(message);
      options.onError?.(error);
    },
  });
};
