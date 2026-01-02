import $api from '../lib/axios';

const MAIL = '/admin/mail';
export const MailService = {
    async sendBulkMail(payload) {
        const { data } = await $api.post(`${MAIL}/bulk`, payload);
        return data;
    },
};
