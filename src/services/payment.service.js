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

  async updateTransactionStatus({ registration, payload }) {
    const { data } = await $api.post(
      `registrations/${registration}/transactions`,
      payload
    );
    return data;
  },
};
