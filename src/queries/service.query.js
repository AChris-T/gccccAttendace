import { useQuery } from '@tanstack/react-query';
import { ServiceService } from '../services/service.service';
import { QUERY_KEYS } from '../utils/queryKeys';

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
    staleTime: 1 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
    ...options,
  });
};
