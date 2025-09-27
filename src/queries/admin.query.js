import { useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';
import { QUERY_KEYS } from '../utils/queryKeys';

export const useAdminAnalytics = (params = {}, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.ANALYTICS(params),
    queryFn: async () => {
      const { data } = await AdminService.getAdminAnalytics(params);
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
