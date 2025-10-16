import EditPersonalInformation from '@/components/dashboard/firsttimer/edit/EditPersonalInformation'
import { InfoField } from '@/components/dashboard/firsttimer/InfoField'
import { SectionCard } from '@/components/dashboard/firsttimer/SectionCard'
import Modal from '@/components/ui/Modal'
import { useModal } from '@/hooks/useModal'
import { BookOpenIcon, BriefcaseIcon, CalendarIcon, MailIcon, PhoneIcon, UserIcon } from '@/icons'

const PersonalInformation = ({ firstTimerData }) => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <>
            <SectionCard title="Personal Information" icon={UserIcon} onEdit={openModal}>
                <InfoField icon={UserIcon} label="Full Name" value={firstTimerData.full_name} />
                <InfoField icon={BookOpenIcon} label="Student" value={firstTimerData.is_student ? 'Yes' : 'No'} />
                <InfoField fullWidth icon={MailIcon} label="Email Address" value={firstTimerData.email} isEmail />
                <InfoField icon={PhoneIcon} label="Phone Number" value={firstTimerData.phone_number} isPhone />
                <InfoField icon={UserIcon} label="Gender" value={firstTimerData.gender} />
                <InfoField icon={CalendarIcon} label="Date of Birth" value={firstTimerData.date_of_birth} />
                <InfoField icon={BriefcaseIcon} label="Occupation" value={firstTimerData.occupation} />
            </SectionCard>
            <Modal
                title={`Edit ${firstTimerData?.full_name}`}
                isOpen={isOpen}
                onClose={closeModal}
            >
                <EditPersonalInformation firstTimerData={firstTimerData} onClose={closeModal} />
            </Modal>
        </>
    )
}

export default PersonalInformation