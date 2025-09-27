import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FormService } from '../../services/form.service';
import { QUERY_KEYS } from '../../utils/queryKeys';
import { Toast } from '../../lib/toastify';

// Create member mutation
export const useFormMessages = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FormService.form,
    onSuccess: (response, variables) => {
      queryClient.setQueryData(QUERY_KEYS.MEMBERS.ALL, (oldData) => [
        response.data,
        ...(oldData || []),
      ]);

      options.onSuccess?.(response.data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};
