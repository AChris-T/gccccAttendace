import { InfoField } from '@/components/dashboard/firsttimer/InfoField'
import { SectionCard } from '@/components/dashboard/firsttimer/SectionCard'
import { BookOpenIcon, HeartIcon, MessageSquareIcon } from '@/icons'

const SpiritualInformation = ({ firstTimerData }) => {
    return (
        <SectionCard title="Spiritual Information" icon={HeartIcon} onEdit={() => console.log('Edit spiritual info')}>
            <InfoField icon={HeartIcon} label="Born Again" value={firstTimerData.born_again} />
            <InfoField icon={BookOpenIcon} label="Interest" value={firstTimerData.interest} />
            <InfoField icon={MessageSquareIcon} label="Prayer Point" value={firstTimerData.prayer_point} fullWidth />
        </SectionCard>
    )
}

export default SpiritualInformation