import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UnitService } from '../services/unit.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';

export const useUnits = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.UNITS.ALL,
    queryFn: async () => {
      const { data } = await UnitService.getAllUnits();
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
export const useUpdateUnit = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await UnitService.updateUnit(payload);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UNITS.ALL });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message || 'Failed to create unit record');
      options.onError?.(new Error(message));
    },
  });
};
export const useCreateUnit = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UnitService.createUnit,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UNITS.ALL });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message || 'Failed to create unit record');
      options.onError?.(new Error(message));
    },
  });
};
export const useDeleteUnit = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await UnitService.deleteUnit(id);
    },
    onSuccess: (data, { ids }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UNITS.ALL });
      Toast.success(data?.message);
      options.onSuccess?.(data, ids);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message || 'Failed to delete messages');
      options.onError?.(new Error(errorDetails.message));
    },
  });
};
