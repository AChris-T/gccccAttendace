import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FollowUpStatusService } from '../services/followupstatus.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';

// Get all follow up statuses
export const useFollowUpStatuses = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOW_UP_STATUSES.ALL,
    queryFn: async () => {
      const { data } = await FollowUpStatusService.getAllFollowUpStatuses();
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

// Get follow up status by ID
export const useFollowUpStatus = (statusId, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOW_UP_STATUSES.DETAIL(statusId),
    queryFn: async () => {
      const response = await FollowUpStatusService.getFollowUpStatusById(
        statusId
      );
      return response.data;
    },
    enabled: !!statusId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create follow up status mutation
export const useCreateFollowUpStatus = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FollowUpStatusService.createFollowUpStatus,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FOLLOW_UP_STATUSES.ALL,
      });
      options.onSuccess?.(response.data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};

// Update follow up status mutation
export const useUpdateFollowUpStatus = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ statusId, ...payload }) =>
      FollowUpStatusService.updateFollowUpStatus(statusId, payload),
    onSuccess: (response, variables) => {
      const { statusId } = variables;

      // Update specific status in cache
      queryClient.setQueryData(
        QUERY_KEYS.FOLLOW_UP_STATUSES.DETAIL(statusId),
        response.data
      );

      // Update status in the list
      queryClient.setQueryData(QUERY_KEYS.FOLLOW_UP_STATUSES.ALL, (oldData) =>
        oldData?.map((status) =>
          status.id === statusId ? response.data : status
        )
      );

      options.onSuccess?.(response.data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};

// Delete follow up status mutation with optimistic updates
export const useDeleteFollowUpStatus = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FollowUpStatusService.deleteFollowUpStatus,
    onMutate: async (statusId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.FOLLOW_UP_STATUSES.ALL,
      });

      const previousStatuses = queryClient.getQueryData(
        QUERY_KEYS.FOLLOW_UP_STATUSES.ALL
      );

      queryClient.setQueryData(
        QUERY_KEYS.FOLLOW_UP_STATUSES.ALL,
        (old) => old?.filter((status) => status.id !== statusId) || []
      );

      return { previousStatuses };
    },
    onSuccess: (data, variables, context) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.FOLLOW_UP_STATUSES.DETAIL(variables),
      });

      options.onSuccess?.(data, variables);
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.FOLLOW_UP_STATUSES.ALL,
        context.previousStatuses
      );

      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};
