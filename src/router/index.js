//homepage
import HomeLayout from '../layout/HomeLayout';
import NotfoundPage from '../pages/Error/NotfoundPage';
import AttendancePage from '../pages/Home/AttendancePage';
import LoginPage from '../pages/Home/Auth/LoginPage';
import Formspage from '../pages/Home/FormPage';
// dashboard
import AppLayout from '../layout/AppLayout';
import ProtectedRoute from '../providers/ProtectedRoute';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import HomePage from '../pages/Home/HomePage';

const AppRoutes = [
  {
    path: '/',
    Component: HomeLayout,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          { index: true, Component: HomePage },
          { path: 'attendance', Component: AttendancePage },
        ],
      },
      { path: 'login', Component: LoginPage },
      { path: 'forms', Component: Formspage },
    ],
  },
  {
    path: '/dashboard',
    Component: ProtectedRoute,
    children: [
      {
        path: '',
        Component: AppLayout,
        children: [{ index: true, Component: DashboardPage }],
      },
    ],
  },
  { path: '*', Component: NotfoundPage },
];

export default AppRoutes;
