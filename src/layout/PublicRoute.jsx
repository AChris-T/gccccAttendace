import { useAuthStore } from "@/store/auth.store";
import { Navigate } from "react-router-dom";

const PublicRoute = () => {
    const { user, isAuthenticated } = useAuthStore();

    if (isAuthenticated || user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute