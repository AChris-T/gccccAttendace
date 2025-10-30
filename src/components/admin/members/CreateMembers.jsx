import ButtonCard from '@/components/ui/ButtonCard'
import ModalForm from '@/components/ui/modal/ModalForm'
import { useModal } from '@/hooks/useModal';
import { UserIcon3 } from '@/icons'

const CreateMembers = () => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <ButtonCard onClick={openModal} description={'Assign admin, leader and member roles to users.'} icon={<UserIcon3 />}>
                Assign Role
            </ButtonCard>

            <ModalForm
                title={`Assign Role to users.`}
                isOpen={isOpen}
                description="Assign admin, leader and member roles to users."
                onClose={closeModal}
            >
                {/* <AssignRoleForm onClose={closeModal} /> */}
            </ModalForm>
        </>
    )
}

export default CreateMembers