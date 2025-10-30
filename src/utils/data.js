import { ShieldIcon, StarIcon, UsersIcon } from '@/icons';

export const navItems = [
  {
    icon: 'DashboardIcon',
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: 'AttendanceIcon2',
    name: 'Attendance',
    path: '/dashboard/attendance',
  },
  {
    icon: 'EventIcon',
    name: 'Events',
    path: '/dashboard/events',
  },
  {
    icon: 'UserIcon',
    name: 'Profile',
    path: '/dashboard/profile',
  },
];
export const adminNavItems = [
  {
    icon: 'AdminIcon',
    name: 'Admin',
    subItems: [
      {
        name: 'Dashboard',
        path: '/dashboard/admin',
        pro: true,
      },
      { name: 'Attendance', path: '/dashboard/admin/attendance', pro: true },
      {
        name: 'Attendance Records',
        path: '/dashboard/admin/attendance-records',
        pro: true,
      },
      {
        name: 'First Timers',
        path: '/dashboard/admin/first-timers',
        pro: true,
      },
      { name: 'Members', path: '/dashboard/admin/members', pro: true },
      { name: 'Forms', path: '/dashboard/admin/forms', pro: true },
      {
        name: 'Follow-Up Feedbacks',
        path: '/dashboard/admin/followup-feedbacks',
        pro: true,
      },
      {
        name: 'Settings',
        path: '/dashboard/admin/settings',
        pro: true,
      },
    ],
  },
];
export const leaderNavItems = [
  {
    icon: 'LeaderIcon',
    name: 'Leaders',
    subItems: [
      {
        name: 'Dashboard',
        path: '/dashboard/leaders',
        pro: false,
      },
      {
        name: 'Attendance Records',
        path: '/dashboard/leaders/attendance-records',
        pro: true,
      },
      {
        name: 'Units',
        path: '/dashboard/leaders/units',
        pro: false,
      },
    ],
  },
];

export const gradients = [
  'from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700',
  'from-pink-500 to-rose-600 dark:from-pink-600 dark:to-rose-700',
  'from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700',
  'from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700',
  'from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700',
  'from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700',
  'from-fuchsia-500 to-pink-600 dark:from-fuchsia-600 dark:to-pink-700',
  'from-lime-500 to-green-600 dark:from-lime-600 dark:to-green-700',
  'from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700',
  'from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700',
  'from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700',
  'from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700',
  'from-red-500 to-orange-600 dark:from-red-600 dark:to-orange-700',
  'from-purple-500 to-fuchsia-600 dark:from-purple-600 dark:to-fuchsia-700',
  'from-sky-500 to-indigo-600 dark:from-sky-600 dark:to-indigo-700',
];

export const avatarGradients = [
  'from-blue-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-500 to-green-600',
  'from-amber-500 to-orange-600',
  'from-indigo-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-teal-500 to-cyan-600',
  'from-red-500 to-orange-600',
  'from-purple-500 to-fuchsia-600',
  'from-sky-500 to-indigo-600',
];

export const assistantGradients = [
  'from-purple-500 to-pink-600',
  'from-rose-500 to-orange-600',
  'from-teal-500 to-emerald-600',
  'from-red-500 to-pink-600',
  'from-purple-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-pink-500 to-fuchsia-600',
  'from-green-500 to-lime-600',
  'from-orange-500 to-amber-600',
  'from-blue-500 to-indigo-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-fuchsia-500 to-purple-600',
  'from-indigo-500 to-sky-600',
];
export const ROLE_CONFIGS = {
  admin: {
    label: 'Admin',
    color: 'error',
    icon: ShieldIcon,
    bgClass:
      'from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950',
  },
  leader: {
    label: 'Leader',
    color: 'warning',
    icon: StarIcon,
    bgClass:
      'from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800',
  },
  member: {
    label: 'Member',
    color: 'primary',
    icon: UsersIcon,
    bgClass: 'from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700',
  },
};

export const ROLE_CONFIG = {
  admin: { label: 'Admin', color: 'error' },
  leader: { label: 'Leader', color: 'warning' },
  member: { label: 'Member', color: 'primary' },
};
export const MIME_TYPE_EXTENSIONS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

export const DEFAULT_EXTENSION = 'jpg';
