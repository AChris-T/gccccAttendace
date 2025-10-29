import { useMutation, useQuery } from '@tanstack/react-query';
import { PaymentService } from '@/services/payment.service';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { Toast } from '@/lib/toastify';
import { handleApiError } from '@/utils/helper';

export const useInitiatePayment = (options = {}) => {
  return useMutation({
    mutationFn: PaymentService.initiatePayment,
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
      const data = await PaymentService.verifyPayment(reference);
      return data;
    },
    enabled: !!reference,
    staleTime: 0,
    ...options,
  });
};


