export const QUERY_KEYS = {
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

  SERVICES: {
    ALL: ['services'],
    TODAY: ['services', 'today'],
    DETAIL: (id) => ['services', 'detail', id],
  },
  FIRST_TIMERS: {
    ALL: ['first-timers'],
    FIRST_TIMERS_ANALYTICS: (params) => [
      'admin',
      'first-timers-analytics',
      params,
    ],
  },
  UNITS: {
    ALL: ['units'],
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  AUTH: {
    ME: ['auth', 'me'],
    PROFILE: ['auth', 'profile'],
  },

  ADMIN: {
    ALL: ['admin'],
    ANALYTICS: (params) => ['admin', 'analytics', params],
  },

  ATTENDANCE: {
    ALL: ['attendance'],
    HISTORY: ['attendance', 'history'],
    ALL_RECORDS: (params) => ['attendance', 'all-records', params],
    BY_MONTH_YEAR: (month, year) => ['attendance', 'filtered', month, year],
    USER_BY_MONTH_YEAR: (month, year) => [
      'attendance',
      'filtered',
      month,
      year,
    ],
  },
};
