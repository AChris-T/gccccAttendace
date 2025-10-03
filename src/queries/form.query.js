import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { FormService } from '../services/form.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';

export const useAllFormMessages = (
  formTypes = ['question', 'prayer', 'testimony']
) => {
  const results = useQueries({
    queries: formTypes.map((type) => ({
      queryKey: [...QUERY_KEYS.FORM_MESSAGES.ALL, { type }],
      queryFn: async () => {
        const { data } = await FormService.getFormMessages({ type });
        return data || [];
      },
      staleTime: 2 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    })),
  });
  const categorized = formTypes.reduce((acc, type, i) => {
    acc[type] = results[i]?.data || [];
    return acc;
  }, {});

  return {
    categorized,
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
    error: results.find((r) => r.error)?.error ?? null,
  };
};

export const useUpdateFormMessages = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ids, attended }) => {
      return await FormService.updateFormMessages({ ids, attended });
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(QUERY_KEYS.FORM_MESSAGES.ALL);
      options.onSuccess?.(response.data, variables);
      Toast.success('Messages updated successfully!');
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};

// useDeleteFormMessages.js
export const useDeleteFormMessages = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    // expect an object with ids array
    mutationFn: async ({ ids }) => {
      return await FormService.deleteFormMessages({ ids });
    },
    onMutate: async ({ ids }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.FORM_MESSAGES.ALL,
      });
      const previousMessages = queryClient.getQueryData(
        QUERY_KEYS.FORM_MESSAGES.ALL
      );

      queryClient.setQueryData(QUERY_KEYS.FORM_MESSAGES.ALL, (old = []) =>
        old.filter((msg) => !ids.includes(msg.id))
      );

      return { previousMessages };
    },
    onSuccess: (data, { ids }, context) => {
      ids.forEach((id) =>
        queryClient.removeQueries({
          queryKey: QUERY_KEYS.FORM_MESSAGES.DETAIL(id),
        })
      );
      Toast.success('Messages deleted successfully');
      options.onSuccess?.(data, ids);
    },
    onError: (error, { ids }, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.FORM_MESSAGES.ALL,
        context.previousMessages
      );

      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message || 'Failed to delete messages');
      options.onError?.(new Error(errorDetails.message));
    },
  });
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
