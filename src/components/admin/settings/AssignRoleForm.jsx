import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import RadioForm from '@/components/form/useForm/RadioForm';
import Button from '@/components/ui/Button';
import { Toast } from '@/lib/toastify';
import { useAssignRoleToUsers } from '@/queries/admin.query';
import { useMembers } from '@/queries/member.query';
import { assignUsersRoleSchema } from '@/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

const INITIAL_VALUES = {
    role: null,
    user_ids: []
};

const AssignRoleForm = ({ onClose }) => {
    const { data: members, isLoading: isLoadingMembers } = useMembers();
    const { mutateAsync, isPending } = useAssignRoleToUsers();

    const memberOptions = useMemo(() => {
        if (!members) return [];
        return members.map(member => ({
            value: member.id,
            text: member.full_name
        }));
    }, [members]);

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
        resolver: yupResolver(assignUsersRoleSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange'
    });

    const isFormDisabled = isLoadingMembers || isSubmitting || isPending;

    const onSubmit = useCallback(async (formData) => {
        try {
            await mutateAsync(formData);
            onClose?.();
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                'Failed to assign role to users. Please try again.';
            Toast.error(errorMessage);
        }
    }, [setError, onClose]);



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-3 bg-white dark:bg-gray-900/50 border dark:border-gray-700 rounded-lg shadow">
            <MultiSelectForm
                label="Select Members"
                required
                expandParent
                name="user_ids"
                options={memberOptions}
                register={register}
                setValue={setValue}
                error={errors.user_ids?.message}
                disabled={isFormDisabled}
                placeholder={
                    isLoadingMembers
                        ? 'Loading members...'
                        : 'Select specific members or leave empty to mark all absent'
                }
            />
            <RadioForm
                label="Select role"
                name="role"
                type="radio"
                register={register}
                error={errors.role?.message}
                required
                options={[
                    { label: "Admin", value: "admin" },
                    { label: "Leader", value: "leader" },
                    { label: "Member", value: "member" },
                ]}
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

export default AssignRoleForm