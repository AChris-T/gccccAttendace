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
        name: 'First Timers',
        path: '/dashboard/admin/first-timers',
        pro: true,
      },
      { name: 'Members', path: '/dashboard/admin/members', pro: true },
      { name: 'Forms', path: '/dashboard/admin/forms', pro: true },
      {
        name: 'Units And Leaders',
        path: '/dashboard/admin/units-and-leaders',
        pro: true,
      },
    ],
  },
];
