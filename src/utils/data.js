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
      { name: 'Attendance', path: '/dashboard/admin/attendance', pro: true },
      { name: 'Members', path: '/dashboard/admin/members', pro: true },
      { name: 'Leaders', path: '/dashboard/admin/leaders', pro: true },
      {
        name: 'First Timers',
        path: '/dashboard/admin/first-timers',
        pro: true,
      },
      { name: 'Units', path: '/dashboard/admin/units', pro: true },
    ],
  },
];
