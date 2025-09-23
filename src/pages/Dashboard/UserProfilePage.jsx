import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import PageMeta from '../../components/common/PageMeta'
import UserAddressCard from '../../components/userProfile/UserAddressCard'
import UserInfoCard from '../../components/userProfile/UserInfoCard'
import UserMetaCard from '../../components/userProfile/UserMetaCard'

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
                </ComponentCard>
            </div>
        </>
    )
}

export default UserProfilePage