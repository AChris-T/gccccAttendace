import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MemberService } from '../services/member.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';

// Get all members
export const useMembers = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MEMBERS.ALL,
    queryFn: async () => {
      const { data } = await MemberService.getAllMembers();
      return data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    ...options,
  });
};

// Get member by ID
export const useMember = (memberId, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MEMBERS.DETAIL(memberId),
    queryFn: async () => {
      const response = await MemberService.getMemberById(memberId);
      return response.data;
    },
    enabled: !!memberId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create member mutation
export const useCreateMember = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MemberService.createMember,
    onSuccess: (response, variables) => {
      // Optimistic update: Add new member to the cache
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

// Update member mutation
export const useUpdateMember = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, ...payload }) =>
      MemberService.updateMember(memberId, payload),
    onSuccess: (response, variables) => {
      const { memberId } = variables;

      // Update specific member in cache
      queryClient.setQueryData(
        QUERY_KEYS.MEMBERS.DETAIL(memberId),
        response.data
      );

      // Update member in the list
      queryClient.setQueryData(QUERY_KEYS.MEMBERS.ALL, (oldData) =>
        oldData?.map((member) =>
          member.id === memberId ? response.data : member
        )
      );

      options.onSuccess?.(response.data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};

// Delete member mutation with optimistic updates
export const useDeleteMember = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MemberService.deleteMember,
    onMutate: async (memberId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MEMBERS.ALL });

      // Snapshot the previous value
      const previousMembers = queryClient.getQueryData(QUERY_KEYS.MEMBERS.ALL);

      // Optimistically update by removing the member
      queryClient.setQueryData(
        QUERY_KEYS.MEMBERS.ALL,
        (old) => old?.filter((member) => member.id !== memberId) || []
      );

      return { previousMembers };
    },
    onSuccess: (data, variables, context) => {
      // Remove member detail from cache
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.MEMBERS.DETAIL(variables),
      });

      options.onSuccess?.(data, variables);
    },
    onError: (error, variables, context) => {
      // Rollback optimistic update
      queryClient.setQueryData(QUERY_KEYS.MEMBERS.ALL, context.previousMembers);

      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};

// Bulk update members mutation
export const useBulkUpdateMembers = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MemberService.bulkUpdate,
    onSuccess: (data, variables) => {
      // Invalidate members list to refetch updated data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS.ALL });

      Toast.success(data?.message || 'Members updated successfully');
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};
