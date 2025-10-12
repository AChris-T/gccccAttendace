import SingleSelect from '@/components/form/SingleSelect';
import Button from '@/components/ui/Button';
import { useUpdateFirstTimer } from '@/queries/firstTimer.query';
import { useFollowUpStatuses } from '@/queries/followupstatus.query'
import { useMembers } from '@/queries/member.query';
import { useAuthStore } from '@/store/auth.store';
import { useMemo, useState } from 'react';

const EditFirstTimer = ({ firstTimerData, onClose }) => {
    const { mutateAsync: updateFirstTimer, isPending: isUpdateFirstTimerPending } = useUpdateFirstTimer()
    const { data: followupStatuses = [] } = useFollowUpStatuses()
    const { data: members = [], isLoading } = useMembers()
    const { isAdmin } = useAuthStore();

    const [assignData, setAssignData] = useState({
        id: firstTimerData?.id,
        assigned_to_member_id: firstTimerData?.assigned_to_member?.id || '',
        follow_up_status_id: firstTimerData?.follow_up_status?.id || '',
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
    console.log(firstTimerData?.assigned_to_member?.id, firstTimerData?.follow_up_status?.id)
    const handleFieldChange = (field, value) => {
        setAssignData(prev => ({ ...prev, [field]: value }));
    };

    const handleEditFirstTimer = async () => {
        try {
            await updateFirstTimer(assignData)
            onClose?.()
        } catch (error) {
            Toast.error(error?.data?.message)
        }
    }

    return (
        <div className='mt-5'>
            {isAdmin && <div>
                <SingleSelect
                    label="Member"
                    name="Assign to member"
                    options={membersOptions}
                    defaultValue={assignData.assigned_to_member_id}
                    onChange={(value) => handleFieldChange('assigned_to_member_id', value)}
                    disabled={isLoading}
                    placeholder="Select a member..."
                />
            </div>}
            <div>
                <SingleSelect
                    label="Followup Status"
                    name="followup status"
                    options={followupStatusesOption}
                    defaultValue={assignData.follow_up_status_id}
                    onChange={(value) => handleFieldChange('follow_up_status_id', value)}
                    disabled={isLoading}
                    placeholder="Select new status..."
                />
            </div>
            <Button onClick={handleEditFirstTimer} size='sm' loading={isUpdateFirstTimerPending}>Update</Button>
        </div>
    )
}

export default EditFirstTimer