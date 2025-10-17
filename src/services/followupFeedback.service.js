import $api from '../lib/axios';

const FOLLOWUP_FEEDBACKS = 'followup-feedbacks';
const FIRST_TIMER = 'first-timers';
const MEMBER = 'members';

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
  getFollowUpsByMember: async (id) => {
    const { data } = await $api.get(`/${MEMBER}/${id}/${FOLLOWUP_FEEDBACKS}`);
    return data;
  },
  getFirstTimersWithFollowups: async () => {
    const { data } = await $api.get(`/${FIRST_TIMER}/${FOLLOWUP_FEEDBACKS}`);
    return data;
  },
  getAbsentMembersWithFollowups: async () => {
    const { data } = await $api.get(`/absent-members/${FOLLOWUP_FEEDBACKS}`);
    return data;
  },
  getMembersWithFollowups: async () => {
    const { data } = await $api.get(`/all-members/${FOLLOWUP_FEEDBACKS}`);
    return data;
  },
};
