import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import UserInfoCard from '@/components/userProfile/UserInfoCard'
import UserMetaCard from '@/components/userProfile/UserMetaCard'
import UserProfessionalCard from '@/components/userProfile/UserProfessionalCard'
import UserChurchCard from '@/components/userProfile/UserChurchCard'
import UserAchievement from '@/components/userProfile/UserAchievement'
import { UserIcon } from '@/icons'
const UserProfilePage = () => {
    return (
        <>
            <PageMeta title="Profile | GCCC Ibadan" />
            <PageBreadcrumb icon={UserIcon} pageTitle="Profile" description={'View and update your personal information and contact details.'} />
            <ComponentCard>
                <UserMetaCard />
                <UserInfoCard />
                <UserProfessionalCard />
                <UserChurchCard />
                <UserAchievement />
            </ComponentCard>
        </>
    )
}

export default UserProfilePage