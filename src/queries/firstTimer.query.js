import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirstTimerService } from '../services/firstTimer.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';

export const useFirstTimers = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FIRST_TIMERS.ALL,
    queryFn: async () => {
      const { data } = await FirstTimerService.getFirstTimers();
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
export const useFirstTimer = (id, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FIRST_TIMERS.DETAIL(id),
    queryFn: async () => {
      const { data } = await FirstTimerService.fetchFirstTimer(id);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useGetFirstTimersAssigned = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FIRST_TIMERS.ASSIGNED,
    queryFn: async () => {
      const { data } = await FirstTimerService.getFirstTimersAssigned();
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetFirstTimersFollowups = (id, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FIRST_TIMERS.FOLLOWUPS(id),
    queryFn: async () => {
      const { data } = await FirstTimerService.getFirstTimersFollowups(id);
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateFirstTimersFollowups = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await FirstTimerService.storeFirstTimersFollowups(payload);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FIRST_TIMERS.FOLLOWUPS(
          variables.first_timer_id?.toString()
        ),
      });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message || 'Failed to save followup feedback.');
      options.onError?.(new Error(message));
    },
  });
};

export const useUpdateFirstTimer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await FirstTimerService.updateFirstTimer(payload);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FIRST_TIMERS.DETAIL(variables?.id?.toString()),
        exact: true,
      });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      console.log(error);
      const message = handleApiError(error);
      Toast.error(message || 'Failed to update first timer record');
      options.onError?.(new Error(message));
    },
  });
};

export const useFirstTimerWelcomeEmail = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await FirstTimerService.sendFirstTimerWelcomeEmail(payload);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FIRST_TIMERS.DETAIL(variables?.id?.toString()),
        exact: true,
      });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message || 'Failed to update first timer record');
      options.onError?.(new Error(message));
    },
  });
};

export const useCreateFirstTimer = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FirstTimerService.createFirstTimer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FIRST_TIMERS.ALL });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message || 'Failed to create first timer record');
      options.onError?.(new Error(message));
    },
  });
};

export const useFirstTimersAnalytics = (params = {}, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FIRST_TIMERS.FIRST_TIMERS_ANALYTICS(params),
    queryFn: async () => {
      const { data } = await FirstTimerService.getFirstTimersAnalytics(params);
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
