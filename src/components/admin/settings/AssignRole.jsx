import ButtonCard from "@/components/ui/ButtonCard"
import { AssignIcon } from "@/icons"
import { useModal } from "@/hooks/useModal";
import ModalForm from "@/components/ui/modal/ModalForm";
import AssignRoleForm from "@/components/admin/settings/AssignRoleForm";


const AssignRole = () => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <ButtonCard onClick={openModal} description={'Assign admin, leader and member roles to users.'} icon={<AssignIcon />}>
                Assign Role
            </ButtonCard>

            <ModalForm
                title={`Assign Role to users.`}
                isOpen={isOpen}
                description="Assign admin, leader and member roles to users."
                onClose={closeModal}
            >
                <AssignRoleForm onClose={closeModal} />
            </ModalForm>
        </>
    )
}

export default AssignRole