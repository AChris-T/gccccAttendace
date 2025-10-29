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

export const useGetEventById = (id, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.EVENTS.DETAIL(id),
    queryFn: async () => {
      const data = await EventService.getEventById(id);
      return data;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
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


