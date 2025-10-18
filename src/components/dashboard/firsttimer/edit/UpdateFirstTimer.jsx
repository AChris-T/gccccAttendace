import Button from "@/components/ui/Button"
import { Toast } from "@/lib/toastify";
import { useUpdateFirstTimer } from "@/queries/firstTimer.query";
import { useCallback, useState } from "react";

const UpdateFirstTimer = ({ firstTimerData, onClose }) => {
    const { mutateAsync: updateFirstTimer, isPending: isUpdateFirstTimerPending } = useUpdateFirstTimer()

    const [isStatusActive] = useState(firstTimerData?.status == 'active');
    const handleUpdateStatus = useCallback(async () => {
        try {
            const payload = { id: firstTimerData.id, status: isStatusActive ? 'deactivated' : 'active' }
            await updateFirstTimer(payload)
            onClose?.()
        } catch (error) {
            Toast.error(error?.data?.message)
        }
    }, [updateFirstTimer, firstTimerData.id, isStatusActive]);

    return (
        <>
            <div>
                <p className="italic dark:text-gray-400">{firstTimerData?.first_name}'s record will be {isStatusActive ? 'archived' : 'un-archived'} and active followups will {isStatusActive ? 'be paused.' : 'resume.'} Are you sure you want to continue?</p>
            </div>
            <Button className="mt-6" type="button" onClick={handleUpdateStatus} loading={isUpdateFirstTimerPending} variant="success" size="sm">Update</Button>
        </>
    )
}

export default UpdateFirstTimer