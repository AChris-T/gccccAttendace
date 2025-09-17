// homepage
import HomeLayout from '../layout/HomeLayout';
import NotfoundPage from '../pages/Error/NotfoundPage';
import LoginPage from '../pages/Home/Auth/LoginPage';
import Formspage from '../pages/Home/FormPage';

// dashboard
import AppLayout from '../layout/AppLayout';
import ProtectedRoute from '../providers/ProtectedRoute';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import HomePage from '../pages/Home/HomePage';
import AdminProtectedRoute from '../providers/AdminProtectedRoute';
import UserProfilePage from '../pages/Dashboard/UserProfilePage';
import MembersPage from '../pages/Admin/MembersPage';
import AttendancePage from '../pages/Dashboard/AttendancePage';
import { AttendancePage as AdminAttendancePage } from '../pages/Admin/AttendancePage';
import FirstTimerPage from '../pages/Home/FirstTimerPage';
import AdminFirstTimerPage from '../pages/Admin/FirstTimerPage';

const AppRoutes = [
  // Public Home Routes
  {
    path: '/',
    Component: HomeLayout,
    children: [
      {
        // Protected Home Pages
        Component: ProtectedRoute,
        children: [{ index: true, Component: HomePage }],
      },
      { path: 'login', Component: LoginPage },
      { path: 'forms', Component: Formspage },
      { path: 'first-timer', Component: FirstTimerPage },
    ],
  },

  // Dashboard Routes
  {
    path: '/dashboard',
    Component: ProtectedRoute,
    children: [
      {
        Component: AppLayout,
        children: [
          // Regular dashboard protected routes
          {
            Component: ProtectedRoute,
            children: [
              { index: true, Component: DashboardPage }, // `/dashboard`
              { path: 'attendance', Component: AttendancePage }, // `/dashboard/attendance`
              { path: 'events', Component: DashboardPage }, // `/dashboard/events`
              { path: 'profile', Component: UserProfilePage }, // `/dashboard/profile`
            ],
          },
          // Admin-only protected routes
          {
            Component: AdminProtectedRoute,
            children: [
              { path: 'admin/attendance', Component: AdminAttendancePage }, // `/dashboard/admin/attendance`
              { path: 'admin/first-timers', Component: AdminFirstTimerPage }, // `/dashboard/admin/first-timer`
              { path: 'admin/members', Component: MembersPage }, // `/dashboard/admin/attendance`
            ],
          },
        ],
      },
    ],
  },
  // 404 Page
  { path: '*', Component: NotfoundPage },
];

export default AppRoutes;
