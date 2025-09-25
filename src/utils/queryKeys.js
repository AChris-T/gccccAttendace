export const QUERY_KEYS = {
  AUTH: {
    ME: ['auth', 'me'],
    PROFILE: ['auth', 'profile'],
  },

  ADMIN: {
    ALL: ['admin'],
    ANALYTICS: (params) => ['admin', 'analytics', params],
    FIRST_TIMERS_ANALYTICS: (params) => [
      'admin',
      'first-timers-analytics',
      params,
    ],
  },

  ATTENDANCE: {
    ALL: ['attendance'],
    HISTORY: ['attendance', 'history'],
    ALL_RECORDS: ['attendance', 'all-records'],
    BY_MONTH_YEAR: (month, year) => ['attendance', 'filtered', month, year],
  },

  FIRST_TIMERS: {
    ALL: ['first-timers'],
    LIST: (params) => ['first-timers', 'list', params],
    DETAIL: (id) => ['first-timers', 'detail', id],
  },

  MEMBERS: {
    ALL: ['members'],
    LIST: (params) => ['members', 'list', params],
    DETAIL: (id) => ['members', 'detail', id],
  },

  SERVICES: {
    ALL: ['services'],
    TODAY: ['services', 'today'],
    DETAIL: (id) => ['services', 'detail', id],
  },
};
