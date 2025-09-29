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
