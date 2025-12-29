import { Toast } from '@/lib/toastify';
import { useSyncUsersPermissions } from '@/queries/admin.query';
import { useAllUsers } from '@/queries/member.query';
import { syncPermissionsSchema } from '@/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import Button from '@/components/ui/Button';
import Message from '@/components/common/Message';
import { PERMISSIONS } from '@/utils/data';

const INITIAL_VALUES = {
    user_ids: [],
    permissions: []
};

const SyncPermissionsForm = ({ onClose }) => {
    const { mutateAsync, isPending, isError, error } = useSyncUsersPermissions();
    const { data: users, isLoading: isLoadingUsers } = useAllUsers();

    const userOptions = useMemo(() => {
        if (!users) return [];
        return users.map(user => ({
            value: user.id,
            text: user.full_name
        }));
    }, [users]);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(syncPermissionsSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange'
    });

    const isFormDisabled = isLoadingUsers || isSubmitting || isPending;

    const onSubmit = useCallback(async (formData) => {

        try {
            await mutateAsync(formData);
            onClose?.();
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                'Failed to assign permissions to users. Please try again.';
            Toast.error(errorMessage);
        }
    }, [setError, onClose]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-3 bg-white dark:bg-gray-900/50 border dark:border-gray-700 rounded-lg shadow">
            {isError && <Message variant='error' data={error?.data} />}

            <MultiSelectForm
                label="Select Members"
                required
                expandParent
                name="user_ids"
                options={userOptions}
                register={register}
                setValue={setValue}
                error={errors.user_ids?.message}
                disabled={isFormDisabled}
                placeholder={isLoadingUsers ? 'Loading users...' : 'Select specific users'}
            />

            <MultiSelectForm
                label="Select Permissions"
                required
                expandParent
                searchable={false}
                name="permissions"
                options={[{ text: "Permissions to view prayer request", value: PERMISSIONS.PRAYER_REQUEST_VIEW }]}
                register={register}
                setValue={setValue}
                error={errors.permissions?.message}
                disabled={isFormDisabled}
                placeholder={'Select all the permissions you want to grant the selected users.'}
            />

            <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    disabled={isPending}
                    className="flex-1"
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    loading={isPending}
                    disabled={isPending}
                    className="flex-1"
                >
                    Assign
                </Button>
            </div>
        </form>
    )
}

export default SyncPermissionsForm