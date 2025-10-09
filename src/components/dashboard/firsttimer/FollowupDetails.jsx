import { InfoField } from '@/components/dashboard/firsttimer/InfoField'
import { SectionCard } from '@/components/dashboard/firsttimer/SectionCard'
import { CalendarIcon, ClipboardListIcon, PhoneIcon, UserCheckIcon } from '@/icons'

const FollowupDetails = ({ firstTimerData }) => {
    return (
        <SectionCard title="Follow-up Details" icon={UserCheckIcon} onEdit={() => console.log('Edit follow-up')}>
            <InfoField icon={CalendarIcon} label="Assigned At" value={new Date(firstTimerData.assigned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
            <InfoField icon={UserCheckIcon} label="Assigned To" value={firstTimerData.assigned_to_member?.name} />
            <InfoField icon={ClipboardListIcon} label="Week Ending" value={new Date(firstTimerData.week_ending).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
            <InfoField icon={PhoneIcon} label="Pastorate Call" value={firstTimerData.pastorate_call} />
            <InfoField icon={ClipboardListIcon} label="Visitation Report" value={firstTimerData.visitation_report} fullWidth />
        </SectionCard>
    )
}

export default FollowupDetails