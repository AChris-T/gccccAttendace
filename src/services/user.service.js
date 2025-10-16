import $api from '../lib/axios';

// for all users  (admin, leaders and members)
export const UserService = {
  updateProfile: async (payload) => {
    const { data } = await $api.put('/update-profile', payload);
    return data;
  },
  // leaders
  getAssignedAbsentees: async () => {
    const { data } = await $api.get('/leaders/absentees');
    return data;
  },
};
