import { useCallback, useMemo, useRef } from 'react';
import { useInitiatePayment, useVerifyPayment } from '@/queries/payment.query';

export default function usePayment() {
  const initiate = useInitiatePayment();

  const startPayment = useCallback(
    async (payload, { onSuccess, onError } = {}) => {
      try {
        const result = await initiate.mutateAsync(payload);
        onSuccess?.(result);
        return result;
      } catch (err) {
        onError?.(err);
        throw err;
      }
    },
    [initiate]
  );

  const isInitiating = initiate.isPending || initiate.isLoading;

  const verifyByRef = useCallback(
    (reference, options) => useVerifyPayment(reference, options),
    []
  );

  const scriptLoadingRef = useRef(false);
  const loadPaystackScript = useCallback(async () => {
    if (typeof window !== 'undefined' && window.PaystackPop) return;
    if (scriptLoadingRef.current) return;
    scriptLoadingRef.current = true;
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        scriptLoadingRef.current = false;
        resolve();
      };
      script.onerror = (e) => {
        scriptLoadingRef.current = false;
        reject(e);
      };
      document.body.appendChild(script);
    });
  }, []);

  const normalizeAmountToKobo = (amount) => {
    const num = Number(amount);
    if (!Number.isFinite(num) || num <= 0) throw new Error('Invalid amount');
    return Math.round(num * 100);
  };

  const createReference = useCallback((prefix = 'PAY') => {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  }, []);

  const openPaystack = useCallback(
    async ({ email, amount, reference, metadata, currency = 'NGN', onSuccess, onClose }) => {
      await loadPaystackScript();
      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) throw new Error('Missing VITE_PAYSTACK_PUBLIC_KEY');

      const amtInKobo = normalizeAmountToKobo(amount);
      const ref = reference || createReference('EVT');

      return new Promise((resolve) => {
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email,
          amount: amtInKobo,
          currency,
          ref,
          metadata,
          callback: (response) => {
            onSuccess?.(response);
            resolve({ status: 'success', response });
          },
          onClose: () => {
            onClose?.();
            resolve({ status: 'closed' });
          },
        });
        handler.openIframe();
      });
    },
    [loadPaystackScript, createReference]
  );

  return useMemo(
    () => ({
      startPayment,
      isInitiating,
      initiate,
      openPaystack,
      verifyByRef,
      createReference,
    }),
    [startPayment, isInitiating, initiate, openPaystack, verifyByRef, createReference]
  );
}


