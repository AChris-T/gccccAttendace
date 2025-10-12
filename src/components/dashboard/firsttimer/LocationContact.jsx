import { InfoField } from '@/components/dashboard/firsttimer/InfoField'
import { SectionCard } from '@/components/dashboard/firsttimer/SectionCard'
import { MapPinIcon, MessageSquareIcon } from '@/icons'

const LocationContact = ({ firstTimerData }) => {
    return (
        <> {/* Location & Contact */}
            <SectionCard title="Location & Contact" icon={MapPinIcon} onEdit={() => console.log('Edit location')}>
                <InfoField icon={MapPinIcon} label="Address" value={firstTimerData.address} fullWidth />
                <InfoField icon={MapPinIcon} label="Located in Ibadan" value={firstTimerData.located_in_ibadan ? 'Yes' : 'No'} />
                <InfoField icon={MessageSquareIcon} label="Interest in joining our community" value={firstTimerData.whatsapp_interest ? 'Yes' : 'No'} />
            </SectionCard></>
    )
}

export default LocationContact