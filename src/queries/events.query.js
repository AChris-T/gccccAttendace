import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EventService } from '@/services/events.service';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { Toast } from '@/lib/toastify';
import { handleApiError } from '@/utils/helper';

export const useCreateEvent = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EventService.createEvent,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      if (data?.message) Toast.success(data.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message);
      options.onError?.(new Error(message));
    },
  });
};

export const useGetEvent = (params = {}, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.EVENTS.DETAIL(params?.event),
    queryFn: async () => {
      const data = await EventService.getEvent(params);
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetAllEvent = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.EVENTS.DETAIL(),
    queryFn: async () => {
      const data = await EventService.getAllEvents();
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useUpdateEvent = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EventService.updateEvent,
    onSuccess: (data, variables) => {
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.EVENTS.DETAIL(variables.id),
        });
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      if (data?.message) Toast.success(data.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message);
      options.onError?.(new Error(message));
    },
  });
};
