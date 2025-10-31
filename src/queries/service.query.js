import { useQuery } from '@tanstack/react-query';
import { ServiceService } from '../services/service.service';
import { QUERY_KEYS } from '../utils/queryKeys';

export const useServices = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SERVICES.ALL,
    queryFn: async () => {
      const { data } = await ServiceService.getAllServices();
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useTodaysService = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SERVICES.TODAY,
    queryFn: async () => {
      const { data } = await ServiceService.getTodaysService();
      return {
        service: data.service,
        canMark: data.can_mark,
      };
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: false,
    retry: 0,
    ...options,
  });
};
