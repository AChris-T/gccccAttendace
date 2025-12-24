import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PicnicService } from '@/services/picnic.service';
import { handleApiError } from '@/utils/helper';
import { Toast } from '@/lib/toastify';


export const useCreatePicnicRegistration = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PicnicService.register,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['picnic-registration'] });
            if (data?.message) Toast.success(data.message);
            options.onSuccess?.(data, variables);
        },
        onError: (error) => {
            const message = handleApiError(error);
            Toast.error(message);
            options.onError?.(new Error(message));
        },
    });
};

export const useGetMyRegistration = (options = {}) => {
    return useQuery({
        queryKey: ['picnic-registration'],
        queryFn: async () => {
            const data = await PicnicService.getMyRegistration();
            return data;
        },
        staleTime: 2 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        ...options,
    });
};