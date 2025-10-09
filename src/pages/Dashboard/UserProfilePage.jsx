import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import PageMeta from '../../components/common/PageMeta'
import UserAddressCard from '../../components/userProfile/UserAddressCard'
import UserInfoCard from '../../components/userProfile/UserInfoCard'
import UserMetaCard from '../../components/userProfile/UserMetaCard'
import UserOtherInformationCard from '../../components/userProfile/UserOtherInformationCrd'
import UserProfessionalCard from '@/components/userProfile/UserProfessionalCard'
import UserUnitsCard from '@/components/userProfile/UserUnitsCard'
import UserFirstTimersCard from '@/components/userProfile/UserFirstTimersCard'
const UserProfilePage = () => {
    return (
        <>
            <PageMeta title="Profile | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Profile" />
            <div className="space-y-6">
                <ComponentCard title="Dashboard">
                    <UserMetaCard />
                    <UserInfoCard />
                    <UserAddressCard />
                    <UserOtherInformationCard />
                    <UserProfessionalCard />
                    <UserUnitsCard />
                    <UserFirstTimersCard />
                </ComponentCard>
            </div>
        </>
    )
}

export default UserProfilePage