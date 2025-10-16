import { lazy, Suspense } from 'react';
import HomeLayout from '../layout/HomeLayout';
import AppLayout from '../layout/AppLayout';

import ProtectedRoute from '../layout/Protected/ProtectedRoute';
import AdminProtectedRoute from '../layout/Protected/AdminProtectedRoute';
import LeadersProtectedRoute from '../layout/Protected/LeadersProtectedRoute';
import PublicRoute from '../layout/PublicRoute';
import PageLoader from '@/components/ui/PageLoader';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const LoginPage = lazy(() => import('../pages/Home/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Home/Auth/RegisterPage'));
const FormPage = lazy(() => import('../pages/Home/FormPage'));
const FirstTimerPage = lazy(() => import('../pages/Home/FirstTimerPage'));

const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const AttendancePage = lazy(() => import('../pages/Dashboard/AttendancePage'));
const UserProfilePage = lazy(() => import('../pages/Dashboard/UserProfilePage'));
const EventsPage = lazy(() => import('../pages/Dashboard/EventsPage'));
const FirstTimerDetailsPage = lazy(() => import('../pages/Dashboard/FirstTimerDetailsPage'));
const MemberDetailsPage = lazy(() => import('../pages/Dashboard/MemberDetailsPage'));

const AdminDashboardPage = lazy(() => import('../pages/Admin/AdminDashboardPage'));
const AdminAttendancePage = lazy(() => import('../pages/Admin/AdminAttendancePage'));
const AdminFirstTimerPage = lazy(() => import('../pages/Admin/AdminFirstTimerPage'));
const AdminMembersPage = lazy(() => import('../pages/Admin/AdminMembersPage'));
const AdminFormsPage = lazy(() => import('../pages/Admin/AdminFormsPage'));
const AdminFollowupFeedbacksPage = lazy(() => import('../pages/Admin/AdminFollowupFeedbacksPage'));

const LeadersDashboardPage = lazy(() => import('../pages/Leaders/LeadersDashboardPage'));
const LeadersUnitPage = lazy(() => import('../pages/Leaders/LeadersUnitPage'));

const NotFoundPage = lazy(() => import('../pages/Error/NotfoundPage'));

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const AppRoutes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [{ index: true, element: withSuspense(HomePage) }],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: 'login', element: withSuspense(LoginPage) },
          { path: 'register', element: withSuspense(RegisterPage) },
        ],
      },
      { path: 'forms', element: withSuspense(FormPage) },
      { path: 'first-timer/welcome', element: withSuspense(FirstTimerPage) },
    ],
  },

  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: withSuspense(DashboardPage),
          },
          { path: 'attendance', element: withSuspense(AttendancePage) },
          { path: 'profile', element: withSuspense(UserProfilePage) },
          { path: 'events', element: withSuspense(EventsPage) },
          {
            path: 'first-timers/:firstTimerId',
            element: withSuspense(FirstTimerDetailsPage),
          },
          {
            path: 'members/:memberId',
            element: withSuspense(MemberDetailsPage),
          },

          {
            path: 'admin',
            element: <AdminProtectedRoute />,
            children: [
              { index: true, element: withSuspense(AdminDashboardPage) },
              {
                path: 'attendance',
                element: withSuspense(AdminAttendancePage),
              },
              {
                path: 'first-timers',
                element: withSuspense(AdminFirstTimerPage),
              },
              { path: 'members', element: withSuspense(AdminMembersPage) },
              { path: 'forms', element: withSuspense(AdminFormsPage) },
              {
                path: 'followup-feedbacks',
                element: withSuspense(AdminFollowupFeedbacksPage),
              },
            ],
          },

          {
            path: 'leaders',
            element: <LeadersProtectedRoute />,
            children: [
              { index: true, element: withSuspense(LeadersDashboardPage) },
              { path: 'units', element: withSuspense(LeadersUnitPage) },
            ],
          },
        ],
      },
    ],
  },

  { path: '*', element: withSuspense(NotFoundPage) },
];

export default AppRoutes;