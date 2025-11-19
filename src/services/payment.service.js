import $api from '../lib/axios';

const PAYMENT = 'registrations';

export const paymentService = {
  async initiatePayment({ registration, payload }) {
    const { data } = await $api.post(
      `/${PAYMENT}/${registration}/transactions`,
      payload
    );
    return data;
  },
  async verifyPayment(reference) {
    const { data } = await $api.get(`/${PAYMENT}/verify/${reference}`);
    return data;
  },

  async getEventPayments() {
    const { data } = await $api.get(`/${PAYMENT}/events`);
    return data;
  },

  async getPaymentDetails(paymentId) {
    const { data } = await $api.get(`/${PAYMENT}/${paymentId}`);
    return data;
  },

  async exportPayments(format = 'excel') {
    const { data } = await $api.get(`/${PAYMENT}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return data;
  },
};
