import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const PublicRoute = () => {
    const { user, isAuthenticated } = useAuthStore();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    if (isAuthenticated || user) {
        return <Navigate to={redirect} replace />;
    }

  return <Outlet />;
};

export default PublicRoute;
