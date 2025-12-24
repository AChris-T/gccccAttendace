import $api from '../lib/axios';

const PICNIC = '/picnic';
export const PicnicService = {
    async register(payload) {
        const { data } = await $api.post(`${PICNIC}/register`, payload);
        return data;
    },
    async getMyRegistration() {
        const { data } = await $api.get(`${PICNIC}/my-registration`);
        return data;
    },
    async fetchRegistrations() {
        const { data } = await $api.get(`${PICNIC}/registrations/admin`);
        return data;
    },
};
