import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Toast } from '@/lib/toastify';
import { useSyncUsersPermissions } from '@/queries/admin.query';
import { useAllUsers } from '@/queries/member.query';
import { syncPermissionsSchema } from '@/schema';
import { getPermissionOptions } from '@/utils/permissions';

import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import Button from '@/components/ui/Button';
import Message from '@/components/common/Message';

/**
 * Form initial values
 */
const INITIAL_VALUES = {
    user_ids: [],
    permissions: []
};

/**
 * Error messages
 */
const ERROR_MESSAGES = {
    DEFAULT: 'Failed to assign permissions to users. Please try again.',
    LOADING_USERS: 'Loading users...',
};

/**
 * SyncPermissionsForm Component
 * 
 * Allows administrators to assign multiple permissions to multiple users.
 * Includes all available permissions from the system.
 * 
 * @param {Object} props
 * @param {Function} props.onClose - Callback function to close the form
 */
const SyncPermissionsForm = ({ onClose }) => {
    // API hooks
    const { mutateAsync, isPending, isError, error } = useSyncUsersPermissions();
    const { data: users, isLoading: isLoadingUsers } = useAllUsers();

    // Form setup
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(syncPermissionsSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange'
    });

    /**
     * Transform users data to select options format
     */
    const userOptions = useMemo(() => {
        if (!users?.length) return [];

        return users.map(user => ({
            value: user.id,
            text: user.full_name || user.name || `User ${user.id}`
        }));
    }, [users]);

    /**
     * Get all available permission options
     */
    const permissionOptions = useMemo(() => {
        return getPermissionOptions();
    }, []);

    /**
     * Determine if form should be disabled
     */
    const isFormDisabled = isLoadingUsers || isSubmitting || isPending;

    /**
     * Handle form submission
     */
    const onSubmit = useCallback(async (formData) => {
        try {
            await mutateAsync(formData);

            Toast.success('Permissions assigned successfully');
            onClose?.();
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                ERROR_MESSAGES.DEFAULT;

            Toast.error(errorMessage);

            // Log error for debugging
            console.error('Permission assignment error:', err);
        }
    }, [mutateAsync, onClose]);

    /**
     * Handle cancel action
     */
    const handleCancel = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-3 bg-white dark:bg-gray-900/50 border dark:border-gray-700 rounded-lg shadow"
            noValidate
        >
            {/* Error message display */}
            {isError && (
                <Message
                    variant="error"
                    data={error?.response?.data || error?.data}
                />
            )}

            {/* User selection field */}
            <MultiSelectForm
                label="Select Members"
                name="user_ids"
                options={userOptions}
                register={register}
                setValue={setValue}
                error={errors.user_ids?.message}
                disabled={isFormDisabled}
                placeholder={
                    isLoadingUsers
                        ? ERROR_MESSAGES.LOADING_USERS
                        : 'Select members to grant permissions'
                }
                required
                expandParent
            />

            {/* Permission selection field */}
            <MultiSelectForm
                label="Select Permissions"
                name="permissions"
                options={permissionOptions}
                register={register}
                setValue={setValue}
                error={errors.permissions?.message}
                disabled={isFormDisabled}
                placeholder="Select permissions to grant"
                searchable={false}
                required
                expandParent
            />

            {/* Form actions */}
            <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancel}
                    disabled={isPending}
                    className="flex-1"
                    aria-label="Cancel permission assignment"
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    loading={isPending}
                    disabled={isFormDisabled}
                    className="flex-1"
                    aria-label="Assign permissions to selected users"
                >
                    {isPending ? 'Assigning...' : 'Assign Permissions'}
                </Button>
            </div>
        </form>
    );
};

export default SyncPermissionsForm;