import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const AdminProtectedRoute = () => {
    const { user, isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />
    if (user.role != 'admin') return <Navigate to={`/dashboard`} replace />

    return <Outlet />;
}

export default AdminProtectedRoute