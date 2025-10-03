import $api from '../lib/axios';

// for all users  (admin, leaders and members)
export const UserService = {
  async uploadAvatar(formData) {
    const { data } = await $api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await $api.patch('/profile', payload);
    return data;
  },
  // leaders
  getAssignedAbsentees: async () => {
    const { data } = await $api.get('/leaders/absentees');
    return data;
  },
};
