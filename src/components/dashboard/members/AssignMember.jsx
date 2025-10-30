import SingleSelectForm from '@/components/form/useForm/SingleSelectForm';
import Button from '@/components/ui/Button';
import { Toast } from '@/lib/toastify';
import { useMembers, useUpdateMember } from '@/queries/member.query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { UsersIcon } from '@/icons';
import { assignMemberSchema } from '@/schema';

const AssignMember = ({ memberData, onClose }) => {
    const { mutateAsync: updateMember, isPending } = useUpdateMember();
    const { data: members = [], isLoading } = useMembers();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(assignMemberSchema),
        defaultValues: {
            followup_by_id: memberData?.assignedTo?.id || ''
        }
    });

    const membersOptions = useMemo(() => {
        if (!members || members.length === 0) return [];
        return members.map(member => ({
            value: member.id,
            text: `${member.first_name} ${member.last_name}`.trim() || member.email
        }));
    }, [members]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                id: memberData?.id,
                followup_by_id: data.followup_by_id
            };
            await updateMember(payload);
            onClose?.();
        } catch (error) {
            Toast.error(error?.data?.message || 'Failed to assign member');
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                    <UsersIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Assign Member
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Assign a team member to follow up with this person
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <SingleSelectForm
                    label="Assign to member"
                    name="followup_by_id"
                    options={membersOptions}
                    placeholder="Select a member..."
                    register={register}
                    expandParent
                    setValue={setValue}
                    searchable
                    disabled={isLoading}
                    error={errors.followup_by_id?.message}
                />

                {/* Action Buttons */}
                <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                    <Button
                        type="button"
                        variant='ghost'
                        onClick={onClose}
                        disabled={isPending}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className='flex-1'
                        loading={isPending}
                        variant="success"
                    >
                        <UsersIcon className="w-4 h-4" />
                        <span>Assign Member</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AssignMember;