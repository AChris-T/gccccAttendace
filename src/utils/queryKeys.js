export const QUERY_KEYS = {
  ////forms
  FORM_MESSAGES: {
    ALL: ['form-messages'],
  },
  // refactored
  FOLLOW_UP_STATUSES: {
    ALL: ['followup-status'],
    DETAIL: (statusId) => ['followup-status', statusId],
  },
  MEMBERS: {
    ALL: ['members'],
    LIST: (params) => ['members', 'list', params],
    DETAIL: (id) => ['members', 'detail', id],
    ROLE: (role) => [('members', role)],
  },
  USER: {
    ABSENT: ['all_absent_members'],
  },

  SERVICES: {
    ALL: ['services'],
    TODAY: ['services', 'today'],
    DETAIL: (id) => ['services', 'detail', id],
  },
  FIRST_TIMERS: {
    ALL: ['first-timers'],
    DETAIL: (id) => ['first-timers', id],
    FOLLOWUPS: (id) => ['FOLLOWUPS', id],
    FIRST_TIMERS_ANALYTICS: (params) => [
      'admin',
      'first-timers-analytics',
      params,
    ],
    ASSIGNED: ['assigned'],
  },
  UNITS: {
    ALL: ['units'],
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  AUTH: {
    ME: ['auth', 'me'],
    PROFILE: ['auth', 'profile'],
    AVATAR_UPLOAD: ['auth', 'avatar-upload'],
  },

  ADMIN: {
    ALL: ['admin'],
    ANALYTICS: (params) => ['admin', 'analytics', params],
  },

  ATTENDANCE: {
    ALL: ['attendance'],
    HISTORY: ['attendance', 'history'],
    ALL_RECORDS: (params) => ['attendance', 'all-records', params],
    ALL_RECORDS_USER: (params) => ['attendance', 'all-records_user', params],
    BY_MONTH_YEAR: (month, year) => ['attendance', 'filtered', month, year],
    USER_BY_MONTH_YEAR: (month, year) => [
      'attendance',
      'filtered',
      month,
      year,
    ],
  },
};
