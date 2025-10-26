import Button from '@/components/ui/Button';
import { useUpdateFirstTimer } from '@/queries/firstTimer.query';
import { useFollowUpStatuses } from '@/queries/followupstatus.query'
import { useMembers } from '@/queries/member.query';
import { useAuthStore } from '@/store/auth.store';
import { useMemo } from 'react';
import { updateFirstTimerStatusSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SingleSelectForm from '@/components/form/useForm/SingleSelectForm';
import { Toast } from '@/lib/toastify';

const EditFirstTimer = ({ firstTimerData, onClose }) => {
    const { mutateAsync: updateFirstTimer, isPending: isUpdateFirstTimerPending } = useUpdateFirstTimer()
    const { data: followupStatuses = [] } = useFollowUpStatuses()
    const { data: members = [], isLoading } = useMembers()
    const { isAdmin } = useAuthStore();


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateFirstTimerStatusSchema),
        defaultValues: {
            followup_by_id: firstTimerData?.assigned_to_member?.id || '',
            follow_up_status_id: firstTimerData?.follow_up_status?.id || '',
            id: firstTimerData?.id,
        }
    });


    const membersOptions = useMemo(() => {
        if (!members) return [];
        return members.map(member => ({
            value: member.id,
            text: `${member.first_name} ${member.last_name}`.trim() || member.email
        }));
    }, [members]);

    const followupStatusesOption = useMemo(() => {
        if (!followupStatuses) return [];
        return followupStatuses.map(status => ({
            value: status.id,
            text: status.title
        }));
    }, [members]);


    const handleEditFirstTimer = async (data) => {
        try {
            await updateFirstTimer(data)
            onClose?.()
        } catch (error) {
            Toast.error(error?.data?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleEditFirstTimer)} className='w-full space-y-5'>
            {isAdmin && <div>
                <SingleSelectForm
                    label="Assign to member"
                    name="followup_by_id"
                    register={register}
                    setValue={setValue}
                    error={errors.followup_by_id?.message}
                    searchable={true}
                    expandParent={true}
                    options={membersOptions}
                    disabled={isLoading}
                    placeholder="Select a member..."
                    defaultValue={firstTimerData?.assigned_to_member?.id}
                />
            </div>}
            <div>
                <SingleSelectForm
                    label="Followup Status"
                    name="follow_up_status_id"
                    options={followupStatusesOption}
                    register={register}
                    setValue={setValue}
                    error={errors.follow_up_status_id?.message}
                    searchable={true}
                    expandParent={true}
                    disabled={isLoading}
                    placeholder="Select new status..."
                    defaultValue={firstTimerData?.follow_up_status?.id}
                />
            </div>
            <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                <Button
                    variant='ghost'
                    onClick={onClose}
                    disabled={isUpdateFirstTimerPending}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button type='submit' className="flex-1" loading={isUpdateFirstTimerPending}>Update</Button>
            </div>
        </form>
    )
}

export default EditFirstTimer