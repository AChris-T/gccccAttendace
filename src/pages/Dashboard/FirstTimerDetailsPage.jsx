import PageMeta from '@/components/common/PageMeta';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import FirstTimerProfile from '@/components/dashboard/firsttimer/FirstTimerProfile';
import { useParams } from 'react-router-dom';
import { FirstTimerIcon } from '@/icons';

const FirstTimerDetailsPage = () => {
    const { firstTimerId } = useParams()
    return (
        <>
            <PageMeta title="First Timer | GCCC Ibadan" />
            <PageBreadcrumb icon={FirstTimerIcon} pageTitle="First Timer" description={'Review and manage all core data for this first timer, including status, member assignment, and communication logs.'} />
            <ComponentCard>
                <FirstTimerProfile firstTimerId={firstTimerId} />
            </ComponentCard>
        </>
    )
}

export default FirstTimerDetailsPage