import { lazy, Suspense } from 'react';
// Layouts
import HomeLayout from '../layout/HomeLayout';
import AppLayout from '../layout/AppLayout';

// Route Guards
import ProtectedRoute from '../layout/Protected/ProtectedRoute';
import AdminProtectedRoute from '../layout/Protected/AdminProtectedRoute';
import LeadersProtectedRoute from '../layout/Protected/LeadersProtectedRoute';
import PublicRoute from '../layout/PublicRoute';

// Lazy-loaded Pages (Code Splitting)
const HomePage = lazy(() => import('../pages/Home/HomePage'));
const LoginPage = lazy(() => import('../pages/Home/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Home/Auth/RegisterPage'));
const FormPage = lazy(() => import('../pages/Home/FormPage'));
const FirstTimerPage = lazy(() => import('../pages/Home/FirstTimerPage'));

const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const AttendancePage = lazy(() => import('../pages/Dashboard/AttendancePage'));
const UserProfilePage = lazy(() =>
  import('../pages/Dashboard/UserProfilePage')
);
const EventsPage = lazy(() => import('../pages/Dashboard/EventsPage'));
const FirstTimerDetailsPage = lazy(() =>
  import('../pages/Dashboard/FirstTimerDetailsPage')
);
const MemberDetailsPage = lazy(() =>
  import('../pages/Dashboard/MemberDetailsPage')
);

const AdminDashboardPage = lazy(() =>
  import('../pages/Admin/AdminDashboardPage')
);
const AdminAttendancePage = lazy(() =>
  import('../pages/Admin/AdminAttendancePage')
);
const AdminFirstTimerPage = lazy(() =>
  import('../pages/Admin/AdminFirstTimerPage')
);
const AdminMembersPage = lazy(() => import('../pages/Admin/AdminMembersPage'));
const AdminFormsPage = lazy(() => import('../pages/Admin/AdminFormsPage'));
const AdminFollowupFeedbacksPage = lazy(() =>
  import('../pages/Admin/AdminFollowupFeedbacksPage')
);

const LeadersDashboardPage = lazy(() =>
  import('../pages/Leaders/LeadersDashboardPage')
);
const LeadersUnitPage = lazy(() => import('../pages/Leaders/LeadersUnitPage'));

const NotFoundPage = lazy(() => import('../pages/Error/NotfoundPage'));

// Simple Suspense Wrapper
const withSuspense = (Component) => (
  <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
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

          // Admin Routes
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

          // Leaders Routes
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

  // Fallback
  { path: '*', element: withSuspense(NotFoundPage) },
];

export default AppRoutes;

// // homepage
// import HomeLayout from '../layout/HomeLayout';
// import NotfoundPage from '../pages/Error/NotfoundPage';
// import LoginPage from '../pages/Home/Auth/LoginPage';
// import Formspage from '../pages/Home/FormPage';

// // dashboard
// import AppLayout from '../layout/AppLayout';
// import DashboardPage from '../pages/Dashboard/DashboardPage';
// import HomePage from '../pages/Home/HomePage';

// import UserProfilePage from '../pages/Dashboard/UserProfilePage';
// import AttendancePage from '../pages/Dashboard/AttendancePage';
// import FirstTimerPage from '../pages/Home/FirstTimerPage';
// import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
// import AdminFirstTimerPage from '../pages/Admin/AdminFirstTimerPage';
// import AdminMembersPage from '../pages/Admin/AdminMembersPage';
// import AdminAttendancePage from '../pages/Admin/AdminAttendancePage';
// import FirstTimerDetailsPage from '../pages/Dashboard/FirstTimerDetailsPage';
// import EventsPage from '../pages/Dashboard/EventsPage';
// import AdminFormsPage from '../pages/Admin/AdminFormsPage';
// import AdminProtectedRoute from '../layout/Protected/AdminProtectedRoute';
// import ProtectedRoute from '../layout/Protected/ProtectedRoute';
// import PublicRoute from '../layout/PublicRoute';
// import MemberDetailsPage from '@/pages/Dashboard/MemberDetailsPage';
// import AdminFollowupFeedbacksPage from '@/pages/Admin/AdminFollowupFeedbacksPage';
// import LeadersDashboardPage from '@/pages/Leaders/LeadersDashboardPage';
// import LeadersProtectedRoute from '@/layout/Protected/LeadersProtectedRoute';
// import LeadersUnitPage from '@/pages/Leaders/LeadersUnitPage';
// import RegisterPage from '@/pages/Home/Auth/RegisterPage';

// const AppRoutes = [
//   {
//     path: '/',
//     Component: HomeLayout,
//     children: [
//       {
//         Component: ProtectedRoute,
//         children: [{ index: true, Component: HomePage }],
//       },
//       {
//         Component: PublicRoute,
//         children: [
//           { path: 'login', Component: LoginPage },
//           { path: 'register', Component: RegisterPage },
//         ],
//       },
//       { path: 'forms', Component: Formspage },
//       { path: 'first-timer/welcome', Component: FirstTimerPage },
//     ],
//   },
//   {
//     path: '/dashboard',
//     Component: ProtectedRoute,
//     children: [
//       {
//         Component: AppLayout,
//         children: [
//           {
//             Component: ProtectedRoute,
//             children: [
//               { index: true, Component: DashboardPage },
//               { path: 'attendance', Component: AttendancePage },
//               { path: 'profile', Component: UserProfilePage },
//               { path: 'events', Component: EventsPage },
//               {
//                 path: 'first-timers/:firstTimerId',
//                 Component: FirstTimerDetailsPage,
//               },
//               {
//                 path: 'members/:memberId',
//                 Component: MemberDetailsPage,
//               },
//             ],
//           },
//           {
//             Component: AdminProtectedRoute,
//             children: [
//               { path: 'admin', Component: AdminDashboardPage },
//               { path: 'admin/attendance', Component: AdminAttendancePage },
//               { path: 'admin/first-timers', Component: AdminFirstTimerPage },
//               { path: 'admin/members', Component: AdminMembersPage },
//               { path: 'admin/forms', Component: AdminFormsPage },
//               {
//                 path: 'admin/followup-feedbacks',
//                 Component: AdminFollowupFeedbacksPage,
//               },
//             ],
//           },
//           {
//             Component: LeadersProtectedRoute,
//             children: [
//               { path: 'leaders', Component: LeadersDashboardPage },
//               { path: 'leaders/units', Component: LeadersUnitPage },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   { path: '*', Component: NotfoundPage },
// ];

// export default AppRoutes;
