import { InfoField } from '@/components/dashboard/firsttimer/InfoField'
import { SectionCard } from '@/components/dashboard/firsttimer/SectionCard'
import { BookOpenIcon, BriefcaseIcon, CalendarIcon, MailIcon, PhoneIcon, UserIcon } from '@/icons'

const PersonalInformation = ({ firstTimerData }) => {
    return (
        <>
            <SectionCard title="Personal Information" icon={UserIcon} onEdit={() => console.log('Edit personal info')}>
                <InfoField icon={UserIcon} label="Full Name" value={firstTimerData.name} fullWidth />
                <InfoField fullWidth icon={MailIcon} label="Email Address" value={firstTimerData.email} isEmail />
                <InfoField icon={PhoneIcon} label="Phone Number" value={firstTimerData.phone_number} isPhone />
                <InfoField icon={UserIcon} label="Gender" value={firstTimerData.gender} />
                <InfoField icon={CalendarIcon} label="Date of Birth" value={firstTimerData.date_of_birth} />
                <InfoField icon={BriefcaseIcon} label="Occupation" value={firstTimerData.occupation} />
                <InfoField icon={BookOpenIcon} label="Student" value={firstTimerData.is_student ? 'Yes' : 'No'} />
            </SectionCard>
        </>
    )
}

export default PersonalInformation