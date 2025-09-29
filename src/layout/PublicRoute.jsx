import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { user, isAuthenticated } = useAuthStore();

    if (isAuthenticated || user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PublicRoute