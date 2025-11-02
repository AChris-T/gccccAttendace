import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';
import { FollowupFeedbacksService } from '@/services/followupFeedback.service';

export const useCreateFollowupsFeedbacks = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await FollowupFeedbacksService.createFollowupFeedbacks(payload);
    },
    onSuccess: (data, variables) => {
      const queryKey = QUERY_KEYS.FOLLOWUP_FEEDBACKS.MEMBER_FIRST_TIMER(
        variables.user_id?.toString()
      );
      queryClient.invalidateQueries({ queryKey: queryKey });
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
export const useGetFollowUpsByMember = (id, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOWUP_FEEDBACKS.MEMBER_FIRST_TIMER(id),
    queryFn: async () => {
      const { data } = await FollowupFeedbacksService.getFollowUpsByMember(id);
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
export const useGetFollowUpsByFirstTimer = (id, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOWUP_FEEDBACKS.MEMBER_FIRST_TIMER(id),
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
export const useFirstTimersWithFollowups = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOWUP_FEEDBACKS.FIRST_TIMERS,
    queryFn: async () => {
      const { data } =
        await FollowupFeedbacksService.getFirstTimersWithFollowups();
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
export const useMembersWithFollowups = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOWUP_FEEDBACKS.ALL_MEMBERS,
    queryFn: async () => {
      const { data } = await FollowupFeedbacksService.getMembersWithFollowups();
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
export const useAbsentMembersWithFollowups = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLLOWUP_FEEDBACKS.ABSENT_MEMBERS,
    queryFn: async () => {
      const { data } =
        await FollowupFeedbacksService.getAbsentMembersWithFollowups();
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};
