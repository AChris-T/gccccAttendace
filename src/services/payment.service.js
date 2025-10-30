import $api from '../lib/axios';

const PAYMENT = 'payment';

export const PaymentService = {
  async initiatePayment(payload) {
    const { data } = await $api.post(`/${PAYMENT}/initiate`, payload);
    return data;
  },
  async verifyPayment(reference) {
    const { data } = await $api.get(`/${PAYMENT}/verify/${reference}`);
    return data;
  },
};
