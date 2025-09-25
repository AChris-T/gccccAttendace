import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirstTimerService } from '../../services/firstTimer.service';
import { QUERY_KEYS } from '../../utils/queryKeys';
import { Toast } from '../../lib/toastify';

export const useFirstTimers = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FIRST_TIMERS.ALL,
    queryFn: async () => {
      const { data } = await FirstTimerService.getAll();
      return data || [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Get first timer by ID
export const useFirstTimer = (id, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FIRST_TIMERS.DETAIL(id),
    queryFn: () => FirstTimerService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Create first timer mutation
export const useCreateFirstTimer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FirstTimerService.create,
    onSuccess: (data, variables) => {
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FIRST_TIMERS.ALL });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message || 'Failed to create first timer record');
      options.onError?.(new Error(message));
      options.onError?.(new Error(message));
    },
  });
};

// Update first timer mutation
export const useUpdateFirstTimer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }) => FirstTimerService.update(id, payload),
    onSuccess: (data, variables) => {
      // Update specific first timer in cache
      queryClient.setQueryData(
        QUERY_KEYS.FIRST_TIMERS.DETAIL(variables.id),
        data
      );
      // Invalidate first timers list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FIRST_TIMERS.ALL });

      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to update first timer record';
      options.onError?.(new Error(message));
    },
  });
};

// Delete first timer mutation
export const useDeleteFirstTimer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FirstTimerService.delete,
    onSuccess: (data, variables) => {
      // Remove first timer from cache
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.FIRST_TIMERS.DETAIL(variables),
      });
      // Invalidate first timers list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FIRST_TIMERS.ALL });

      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to delete first timer record';
      options.onError?.(new Error(message));
    },
  });
};
