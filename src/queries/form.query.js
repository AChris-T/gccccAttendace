import { useQuery, useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import { FormService } from '../services/form.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';

export const useFormMessages = (type, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.FORM_MESSAGES.ALL, { type }],
    queryFn: async () => {
      const { data } = await FormService.getFormMessages({ type });
      return data || [];
    },
    enabled: Boolean(type),
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

// Fetch all three types concurrently and combine results
export const useAllFormMessages = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: [...QUERY_KEYS.FORM_MESSAGES.ALL, { type: 'question' }],
        queryFn: async () => {
          const { data } = await FormService.getFormMessages({ type: 'question' });
          return data || [];
        },
        staleTime: 2 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
      },
      {
        queryKey: [...QUERY_KEYS.FORM_MESSAGES.ALL, { type: 'prayer' }],
        queryFn: async () => {
          const { data } = await FormService.getFormMessages({ type: 'prayer' });
          return data || [];
        },
        staleTime: 2 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
      },
      {
        queryKey: [...QUERY_KEYS.FORM_MESSAGES.ALL, { type: 'testimony' }],
        queryFn: async () => {
          const { data } = await FormService.getFormMessages({ type: 'testimony' });
          return data || [];
        },
        staleTime: 2 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
      },
    ],
  });

  const [q, p, t] = results;

  return {
    categorized: {
      question: q?.data || [],
      prayer: p?.data || [],
      testimony: t?.data || [],
    },
    isLoading: Boolean(q?.isLoading || p?.isLoading || t?.isLoading),
    isError: Boolean(q?.isError || p?.isError || t?.isError),
    error: q?.error || p?.error || t?.error,
  };
};

export const useCreateFormMessages = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FormService.createFormMessages,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FORM_MESSAGES.ALL });
      Toast.success('Your message has been submitted successfully.');
      options.onSuccess?.(response.data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};
