import $api from '../lib/axios';

const RESOURCE_URL = '/follow-up-statuses';
export const FollowUpStatusService = {
  /**
   * Fetches all follow up statuses with pagination.
   * @returns {Promise<object>} The paginated response.
   */
  async getAllFollowUpStatuses(page = 1) {
    const { data } = await $api.get(`${RESOURCE_URL}`);
    return data;
  },

  /**
   * Fetches a single follow up status by its ID.
   * @param {string|number} statusId The ID of the status.
   * @returns {Promise<object>} The status data.
   */
  async getFollowUpStatusById(statusId) {
    const { data } = await $api.get(`${RESOURCE_URL}/${statusId}`);
    return data;
  },

  /**
   * Creates a new follow up status.
   * @param {object} payload The status data to create.
   * @returns {Promise<object>} The created status data.
   */
  async createFollowUpStatus(payload) {
    const { data } = await $api.post(RESOURCE_URL, payload);
    return data;
  },

  /**
   * Updates an existing follow up status.
   * @param {string|number} statusId The ID of the status to update.
   * @param {object} payload The updated status data.
   * @returns {Promise<object>} The updated status data.
   */
  async updateFollowUpStatus(statusId, payload) {
    const { data } = await $api.put(`${RESOURCE_URL}/${statusId}`, payload);
    return data;
  },

  /**
   * Deletes a follow up status.
   * @param {string|number} statusId The ID of the status to delete.
   * @returns {Promise<void>}
   */
  async deleteFollowUpStatus(statusId) {
    const { data } = await $api.delete(`${RESOURCE_URL}/${statusId}`);
    return data;
  },
};
