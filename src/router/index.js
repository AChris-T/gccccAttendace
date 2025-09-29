// homepage
import HomeLayout from '../layout/HomeLayout';
import NotfoundPage from '../pages/Error/NotfoundPage';
import LoginPage from '../pages/Home/Auth/LoginPage';
import Formspage from '../pages/Home/FormPage';

// dashboard
import AppLayout from '../layout/AppLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import HomePage from '../pages/Home/HomePage';

import UserProfilePage from '../pages/Dashboard/UserProfilePage';
import AttendancePage from '../pages/Dashboard/AttendancePage';
import FirstTimerPage from '../pages/Home/FirstTimerPage';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import AdminFirstTimerPage from '../pages/Admin/AdminFirstTimerPage';
import AdminMembersPage from '../pages/Admin/AdminMembersPage';
import AdminAttendancePage from '../pages/Admin/AdminAttendancePage';
import AdminUnitAndLeaderPage from '../pages/Admin/AdminUnitAndLeaderPage';
import FirstTimerDetailsPage from '../pages/Dashboard/FirstTimerDetailsPage';
import EventsPage from '../pages/Dashboard/EventsPage';
import AdminFormsPage from '../pages/Admin/AdminFormsPage';
import AdminProtectedRoute from '../layout/Protected/AdminProtectedRoute';
import ProtectedRoute from '../layout/Protected/ProtectedRoute';
import PublicRoute from '@/layout/PublicRoute';

const AppRoutes = [
  {
    path: '/',
    Component: HomeLayout,
    children: [
      {
        Component: ProtectedRoute,
        children: [{ index: true, Component: HomePage }],
      },
      {
        Component: PublicRoute,
        children: [{ path: 'login', Component: LoginPage }],
      },
      { path: 'forms', Component: Formspage },
      { path: 'first-timer/welcome', Component: FirstTimerPage },
    ],
  },
  {
    path: '/dashboard',
    Component: ProtectedRoute,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            Component: ProtectedRoute,
            children: [
              { index: true, Component: DashboardPage },
              { path: 'attendance', Component: AttendancePage },
              { path: 'profile', Component: UserProfilePage },
              { path: 'events', Component: EventsPage },
              {
                path: 'first-timer/:firstTimerId',
                Component: FirstTimerDetailsPage,
              },
            ],
          },
          {
            Component: AdminProtectedRoute,
            children: [
              { path: 'admin', Component: AdminDashboardPage },
              { path: 'admin/attendance', Component: AdminAttendancePage },
              { path: 'admin/first-timers', Component: AdminFirstTimerPage },
              { path: 'admin/members', Component: AdminMembersPage },
              { path: 'admin/forms', Component: AdminFormsPage },
              {
                path: 'admin/units-and-leaders',
                Component: AdminUnitAndLeaderPage,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', Component: NotfoundPage },
];

export default AppRoutes;
