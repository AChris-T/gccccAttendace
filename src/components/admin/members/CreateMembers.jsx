import CreateMembersForm from '@/components/admin/members/CreateMembersForm';
import ButtonCard from '@/components/ui/ButtonCard'
import ModalForm from '@/components/ui/modal/ModalForm'
import { useModal } from '@/hooks/useModal';
import { UsersIcon } from '@/icons/EventsIcons';

const CreateMembers = () => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <ButtonCard onClick={openModal} description={'Create new members - name, email, gender, and phone number.'} icon={<UsersIcon />}>
                New Members
            </ButtonCard>

            <ModalForm
                maxWidth='max-w-2xl'
                title={`Create Members`}
                isOpen={isOpen}
                description="Add one or multiple members at once. Phone number will be used as the default password."
                onClose={closeModal}
            >
                <CreateMembersForm onClose={closeModal} />
            </ModalForm>
        </>
    )
}

export default CreateMembers