import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import UserInfoCard from '@/components/userProfile/UserInfoCard'
import UserMetaCard from '@/components/userProfile/UserMetaCard'
import UserProfessionalCard from '@/components/userProfile/UserProfessionalCard'
import UserChurchCard from '@/components/userProfile/UserChurchCard'
import UserAchievement from '@/components/userProfile/UserAchievement'
const UserProfilePage = () => {
    return (
        <>
            <PageMeta title="Profile | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Profile" />
            <div className="space-y-6">
                <ComponentCard title="Dashboard">
                    <UserMetaCard />
                    <UserInfoCard />
                    <UserProfessionalCard />
                    <UserChurchCard />
                    <UserAchievement />
                </ComponentCard>
            </div>
        </>
    )
}

export default UserProfilePage