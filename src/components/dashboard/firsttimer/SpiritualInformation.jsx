import { InfoField } from '@/components/dashboard/firsttimer/InfoField'
import { SectionCard } from '@/components/dashboard/firsttimer/SectionCard'
import { BookOpenIcon, HeartIcon, MessageSquareIcon } from '@/icons'

const SpiritualInformation = ({ firstTimerData }) => {
    return (
        <SectionCard title="Spiritual Information" icon={HeartIcon} isEdit={false}>
            <InfoField icon={HeartIcon} label="Are you Born Again?" value={firstTimerData.born_again} />
            <InfoField icon={BookOpenIcon} label="Interest in becoming a consistent member" value={firstTimerData.interest} />
            <InfoField icon={MessageSquareIcon} label="Prayer Request" value={firstTimerData.prayer_point} fullWidth />
        </SectionCard>
    )
}

export default SpiritualInformation