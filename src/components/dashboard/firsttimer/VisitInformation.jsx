import { InfoField } from '@/components/dashboard/firsttimer/InfoField'
import { SectionCard } from '@/components/dashboard/firsttimer/SectionCard'
import { BookOpenIcon, CalendarIcon, HeartIcon, UsersIcon } from '@/icons'

const VisitInformation = ({ firstTimerData }) => {
    return (
        <SectionCard title="Visit Information" icon={CalendarIcon} isEdit={false}>
            <InfoField icon={CalendarIcon} label="Date of Visit" value={new Date(firstTimerData.date_of_visit).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
            <InfoField icon={UsersIcon} label="Invited By" value={firstTimerData.invited_by} />
            <InfoField icon={BookOpenIcon} label="How Did You Learn About Us" value={firstTimerData.how_did_you_learn} fullWidth />
            <InfoField icon={HeartIcon} label="Service Experience" value={firstTimerData.service_experience} fullWidth />
        </SectionCard>
    )
}

export default VisitInformation