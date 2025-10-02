import $api from "../lib/axios";

export const ProfileService = {
  async uploadAvatar(formData) {
    const { data } = await $api.post("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

   updateProfile: async (payload) => {
  const { data } = await $api.patch("/profile", payload);
  return data;
},
};
