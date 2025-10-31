import Message from "@/components/common/Message";
import Button from "@/components/ui/Button"
import { DeleteConfirmation } from "@/components/ui/DeleteConfirmation";
import Modal from "@/components/ui/modal/Modal";
import { useModal } from "@/hooks/useModal";
import { TrashIcon } from "@/icons"
import { useDeleteMember } from "@/queries/member.query"

const DeleteMembers = ({ selectedIds, onClearSelection }) => {
    const { isOpen, openModal, closeModal } = useModal();
    const { mutate, isPending, isError, error } = useDeleteMember({
        onSuccess: () => {
            closeModal()
        },
    })

    const handleDelete = () => {
        mutate({ memberIds: selectedIds })
    }

    return (
        <>
            <Button
                variant='danger'
                onClick={openModal}
                loading={isPending}
            >
                <TrashIcon />
            </Button>
            <Button
                variant="dark"
                onClick={onClearSelection}
            >
                Clear
            </Button>

            <Modal
                description="Delete all selected members"
                title={'Delete'}
                isOpen={isOpen}
                onClose={closeModal}
            >
                <div className="space-y-5">
                    {isError && <Message variant="error" data={error?.data} />}
                    <DeleteConfirmation />
                    <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={closeModal}
                            disabled={isPending}
                            className="flex-1"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={handleDelete}
                            loading={isPending}
                            disabled={isPending}
                            className="flex-1"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteMembers