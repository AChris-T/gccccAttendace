import SingleSelect from '@/components/form/useForm/SingleSelectForm';
import Button from '@/components/ui/Button';
import { Toast } from '@/lib/toastify';
import { useMembers, useUpdateMember } from '@/queries/member.query';
import { useMemo, useState } from 'react';

const AssignMember = ({ memberData, onClose }) => {
    const { mutateAsync: updateMember, isPending } = useUpdateMember()
    const { data: members = [], isLoading } = useMembers()

    const [assignData, setAssignData] = useState({
        id: memberData?.id,
        followup_by_id: memberData?.assignedTo?.id,
    });

    const membersOptions = useMemo(() => {
        if (!members) return [];
        return members.map(member => ({
            value: member.id,
            text: `${member.first_name} ${member.last_name}`.trim() || member.email
        }));
    }, [members]);

    const handleFieldChange = (field, value) => {
        setAssignData(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdateMember = async () => {
        try {
            await updateMember(assignData)
            onClose?.()
        } catch (error) {
            Toast.error(error?.data?.message)
        }
    }

    return (
        <div className='space-y-5'>
            <SingleSelect
                label="Assign to member"
                name="Assign to member"
                options={membersOptions}
                defaultValue={assignData.followup_by_id}
                onChange={(value) => handleFieldChange('followup_by_id', value)}
                disabled={isLoading}
                placeholder="Select a member..."
            />
            <Button onClick={handleUpdateMember} size='sm' loading={isPending}>Update</Button>
        </div>
    )
}

export default AssignMember