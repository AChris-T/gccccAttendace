import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/services/payment.service';

export const useEventPayments = () => {
  return useQuery({
    queryKey: ['event-payments'],
    queryFn: async () => {
      const data = await paymentService.getEventPayments();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });
};

export const useEventPaymentDetails = (paymentId) => {
  return useQuery({
    queryKey: ['event-payment', paymentId],
    queryFn: async () => {
      if (!paymentId) return null;
      const data = await paymentService.getPaymentDetails(paymentId);
      return data;
    },
    enabled: !!paymentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
