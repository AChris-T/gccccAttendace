export const QUERY_KEYS = {
  FORM_MESSAGES: {
    ALL: (type) => ['formMessages', type],
    DETAIL: (id) => ['formMessages', id],
  },

  FOLLOWUP_FEEDBACKS: {
    FIRST_TIMERS: ['followup-feedbacks', 'first-timers'],
    ALL_MEMBERS: ['followup-feedbacks', 'all-members'],
    ABSENT_MEMBERS: ['followup-feedbacks', 'absent-members'],
    MEMBER: (id) => ['followup-feedbacks', 'member', id],
    FIRST_TIMER: (id) => ['followup-feedbacks', 'first-timer', id],
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
    ASSIGNED_MEMBER: ['assigned_members'],
  },

  SERVICES: {
    ALL: ['services'],
    TODAY: ['services', 'today'],
    DETAIL: (id) => ['services', 'detail', id],
  },
  FIRST_TIMERS: {
    ALL: ['first-timers'],
    FIRSTTIMER_FOLLOWUPS: ['first-timers', 'FIRSTTIMER_FOLLOWUPS'],
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
  },

  ADMIN: {
    ALL: ['admin'],
    ANALYTICS: (params) => ['admin', 'analytics', params],
  },

  EVENTS: {
    ALL: ['events'],
    DETAIL: (id) => ['events', 'detail', id],
  },

  PAYMENT: {
    INITIATE: (payloadHash) => ['payment', 'initiate', payloadHash],
    VERIFY: (reference) => ['payment', 'verify', reference],
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
