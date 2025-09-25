import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useEffect } from 'react';

function ProtectedRoute() {
    const { isAuthenticated, resetAuthenticatedUser } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate()
    const url = `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`

    const handleUnauthorized = () => {
        resetAuthenticatedUser()
        navigate(url, { replace: true })
    }

    useEffect(() => {
        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    })

    if (!isAuthenticated) return <Navigate to={url} replace />

    return <Outlet />;
}

export default ProtectedRoute;