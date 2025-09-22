import { useParams } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';
import ComponentCard from '../../components/common/ComponentCard';
import UserMetaCard from '../../components/userProfile/UserMetaCard';
import UserInfoCard from '../../components/userProfile/UserInfoCard';
import UserAddressCard from '../../components/userProfile/UserAddressCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

const FirstTimerDetailsPage = () => {
    const { firstTimerId } = useParams();
    return (
        <>
            <PageMeta title="First Timer | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="First Timer" />
            <div className="space-y-6">
                <ComponentCard title="First timer's details">
                    {firstTimerId}
                    <UserMetaCard />
                    <div className='grid grid-cols-2 gap-6'>
                        <UserInfoCard />
                        <UserAddressCard />
                    </div>
                </ComponentCard>
            </div>
        </>
    )
}

export default FirstTimerDetailsPage