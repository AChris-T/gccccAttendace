import $api from '../lib/axios';

const FOLLOWUP_FEEDBACKS = 'followup-feedbacks';
const FIRST_TIMER = 'first-timers';

export const FollowupFeedbacksService = {
  async createFollowupFeedbacks(payload) {
    const { data } = await $api.post(`/${FOLLOWUP_FEEDBACKS}`, payload);
    return data;
  },
  getFollowUpsByFirstTimer: async (id) => {
    const { data } = await $api.get(
      `/${FIRST_TIMER}/${id}/${FOLLOWUP_FEEDBACKS}`
    );
    return data;
  },
  //   getFirstTimersWithFollowups: async () => {
  //     const { data } = await $api.get(`/${FIRST_TIMER}/followups`);
  //     return data;
  //   },
};
