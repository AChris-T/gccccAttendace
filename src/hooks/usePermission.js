import { useAuthStore } from '@/store/auth.store';
import { useMemo } from 'react';

export const usePermission = () => {
    const { user } = useAuthStore();

    const permissions = useMemo(() => {
        return user?.permissions || [];
    }, [user?.permissions]);

    const can = (permission) => {
        return permissions.includes(permission);
    };

    return { can, permissions };
};