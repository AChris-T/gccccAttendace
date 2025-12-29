import ButtonCard from "@/components/ui/ButtonCard"
import { AssignIcon } from "@/icons"
import { useModal } from "@/hooks/useModal";
import ModalForm from "@/components/ui/modal/ModalForm";
import SyncPermissionsForm from "@/components/admin/settings/SyncPermissionsForm";

const SyncPermissions = () => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <ButtonCard color="green" onClick={openModal} description={'Assign permissions to users.'} icon={<AssignIcon />}>
                Assign Permissions
            </ButtonCard>

            <ModalForm
                title={`Assign Permissions to users.`}
                isOpen={isOpen}
                description="Assign permissions to users."
                onClose={closeModal}
            >
                <SyncPermissionsForm onClose={closeModal} />
            </ModalForm>
        </>
    )
}

export default SyncPermissions