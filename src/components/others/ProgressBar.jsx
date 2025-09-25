import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

export default function ProgressBar() {
    const location = useLocation();
    useEffect(() => {
        NProgress.start();
        const timeout = setTimeout(() => {
            NProgress.done();
        }, 500);
        return () => clearTimeout(timeout);
    }, [location]);

    return null;
}
