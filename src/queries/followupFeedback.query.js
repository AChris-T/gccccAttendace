import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';
import { FollowupFeedbacksService } from '@/services/followupFeedback.service';

export const useCreateFirstTimersFollowups = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await FollowupFeedbacksService.createFollowupFeedbacks(payload);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FOLLOWUP_FEEDBACKS.FIRST_TIMERS(
          variables.subject_id?.toString()
        ),
      });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message || 'Failed to save followup feedback.');
      options.onError?.(new Error(message));
    },
  });
};
export const useGetFollowUpsByFirstTimer = (id, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOWUP_FEEDBACKS.FIRST_TIMERS(id),
    queryFn: async () => {
      const { data } = await FollowupFeedbacksService.getFollowUpsByFirstTimer(
        id
      );
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
// export const useFirstTimersWithFollowups = (options = {}) => {
//   return useQuery({
//     queryKey: QUERY_KEYS.FIRST_TIMERS.FIRSTTIMER_FOLLOWUPS,
//     queryFn: async () => {
//       const { data } = await FirstTimerService.getFirstTimersWithFollowups();
//       return data || [];
//     },
//     staleTime: 2 * 60 * 1000,
//     cacheTime: 5 * 60 * 1000,
//     ...options,
//   });
// };
