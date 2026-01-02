import { useMutation } from '@tanstack/react-query';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';
import { MailService } from '@/services/mail.service';

export const useSendBulkMail = (options = {}) => {
    return useMutation({
        mutationFn: MailService.sendBulkMail,
        onSuccess: (data, variables) => {
            Toast.success(data?.message);
            options.onSuccess?.(data, variables);
        },
        onError: (error) => {
            const message = handleApiError(error);
            Toast.error(message || 'Failed to send mails');
            options.onError?.(new Error(message));
        },
    });
};
