import { useParams } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import FirstTimerProfile from '@/components/dashboard/firsttimer/FirstTimerProfile';

const FirstTimerDetailsPage = () => {
    const { firstTimerId } = useParams();
    return (
        <>
            <PageMeta title="First Timer | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="First Timer" />
            <div className="space-y-6">
                <ComponentCard title="First timer's details">
                    <FirstTimerProfile />
                </ComponentCard>
            </div>
        </>
    )
}

export default FirstTimerDetailsPage