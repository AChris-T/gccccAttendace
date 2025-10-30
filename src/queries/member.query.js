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

export function useMembersByRole(role) {
  return useQuery({
    queryKey: QUERY_KEYS.MEMBERS.ROLE(role),
    queryFn: async () => {
      const { data } = await MemberService.fetchMembersByRole(role);
      return data;
    },
    enabled: !!role,
    staleTime: 1000 * 60 * 5,
  });
}

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

export const useUpdateMember = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await MemberService.updateMember(payload);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        QUERY_KEYS.MEMBERS.DETAIL(variables?.id?.toString()),
        data?.data || data
      );
      Toast.success(data?.message);
      options.onSuccess?.(response.data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};

export const useCreateMember = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MemberService.createMember,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MEMBERS.ALL,
      });
      queryClient.invalidateQueries;
      Toast.success(response.message);
      options.onSuccess?.(response.data, variables);
    },
    onError: (error) => {
      const errorDetails = handleApiError(error);
      Toast.error(errorDetails.message);
      options.onError?.(new Error(errorDetails.message));
    },
  });
};

// // Update member mutation

// // Delete member mutation with optimistic updates
// export const useDeleteMember = (options = {}) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: MemberService.deleteMember,
//     onMutate: async (memberId) => {
//       // Cancel outgoing refetches
//       await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MEMBERS.ALL });

//       // Snapshot the previous value
//       const previousMembers = queryClient.getQueryData(QUERY_KEYS.MEMBERS.ALL);

//       // Optimistically update by removing the member
//       queryClient.setQueryData(
//         QUERY_KEYS.MEMBERS.ALL,
//         (old) => old?.filter((member) => member.id !== memberId) || []
//       );

//       return { previousMembers };
//     },
//     onSuccess: (data, variables, context) => {
//       // Remove member detail from cache
//       queryClient.removeQueries({
//         queryKey: QUERY_KEYS.MEMBERS.DETAIL(variables),
//       });

//       options.onSuccess?.(data, variables);
//     },
//     onError: (error, variables, context) => {
//       // Rollback optimistic update
//       queryClient.setQueryData(QUERY_KEYS.MEMBERS.ALL, context.previousMembers);

//       const errorDetails = handleApiError(error);
//       Toast.error(errorDetails.message);
//       options.onError?.(new Error(errorDetails.message));
//     },
//   });
// };
