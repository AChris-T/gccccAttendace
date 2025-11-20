import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { Toast } from '@/lib/toastify';
import { handleApiError } from '@/utils/helper';
import { paymentService } from '@/services/payment.service';

export const useInitiatePayment = (options = {}) => {
  return useMutation({
    mutationFn: paymentService.initiatePayment,
    onSuccess: (data, variables) => {
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

export const useVerifyPayment = (reference, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.PAYMENT.VERIFY(reference),
    queryFn: async () => {
      const data = await paymentService.verifyPayment(reference);
      return data;
    },
    enabled: !!reference,
    staleTime: 0,
    ...options,
  });
};

export const useUpdateTransactionStatus = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.updateTransactionStatus,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.DETAIL() });
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
