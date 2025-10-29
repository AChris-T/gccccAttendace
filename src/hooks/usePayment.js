import { useCallback, useMemo } from 'react';
import { useInitiatePayment, useVerifyPayment } from '@/queries/payment.query';
import { Toast } from '@/lib/toastify';


export default function usePayment() {
  const initiatePayment = useInitiatePayment();
  const startPayment = useCallback(
    async (payload, { onSuccess, onError } = {}) => {
      try {
        const result = await initiatePayment.mutateAsync(payload);
        Toast.success('Payment initialized successfully');
        onSuccess?.(result);
        return result;
      } catch (error) {
        const message =
          error?.response?.data?.message || 'Payment initialization failed';
        Toast.error(message);
        onError?.(error);
        throw error;
      }
    },
    [initiatePayment]
  );

  const isInitiating = initiatePayment.isPending || initiatePayment.isLoading;

 
  const loadPaystackScript = useCallback(async () => {
    if (window.PaystackPop) return;

    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = () =>
        reject(new Error('Failed to load Paystack script'));
      document.body.appendChild(script);
    });
  }, []);

  
  const openPaystack = useCallback(
    async ({ email, amount, reference, metadata, onSuccess, onClose }) => {
      await loadPaystackScript();

      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        Toast.error('Missing Paystack public key');
        throw new Error(
          'Missing VITE_PAYSTACK_PUBLIC_KEY in environment variables'
        );
      }

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount: Math.round(Number(amount) * 100), 
        ref: reference,
        metadata,
        callback: (response) => {
          Toast.success('Payment successful');
          onSuccess?.(response);
        },
        onClose: () => {
          Toast.info('Payment process closed');
          onClose?.();
        },
      });

      handler.openIframe();
    },
    [loadPaystackScript]
  );

 
  const verifyByRef = useCallback(
    (reference, options) => useVerifyPayment(reference, options),
    []
  );

  return useMemo(
    () => ({
      startPayment,
      isInitiating,
      openPaystack,
      verifyByRef,
      initiatePayment,
    }),
    [startPayment, isInitiating, openPaystack, verifyByRef, initiatePayment]
  );
}
