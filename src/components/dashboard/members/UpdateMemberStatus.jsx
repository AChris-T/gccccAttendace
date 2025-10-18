import Button from "@/components/ui/Button"
import { Toast } from "@/lib/toastify";
import { useUpdateMember } from "@/queries/member.query";
import { useCallback, useState } from "react";

const UpdateMemberStatus = ({ memberData, onClose }) => {
    const { mutateAsync: updateMember, isPending: isUpdateMemberPending } = useUpdateMember()

    const [isStatusActive] = useState(memberData?.status == 'active');
    const handleUpdateStatus = useCallback(async () => {
        try {
            const payload = { id: memberData.id, status: isStatusActive ? 'deactivated' : 'active' }
            await updateMember(payload)
            onClose?.()
        } catch (error) {
            Toast.error(error?.data?.message)
        }
    }, [updateMember, memberData.id, isStatusActive]);

    return (
        <>
            <div>
                <p className="italic dark:text-gray-400">{memberData?.first_name}'s record will be {isStatusActive ? 'archived' : 'un-archived'} and active followups will {isStatusActive ? 'be paused.' : 'resume.'} Are you sure you want to continue?</p>
            </div>
            <Button type="button" className="mt-5" onClick={handleUpdateStatus} loading={isUpdateMemberPending} variant="success" size="sm">Update</Button>
        </>
    )
}

export default UpdateMemberStatus