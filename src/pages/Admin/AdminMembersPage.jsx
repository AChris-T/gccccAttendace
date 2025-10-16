import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import MemberTable from '../../components/admin/members/MembersTable'
import { MemberIcon } from '@/icons'

const AdminMembersPage = () => {

    return (
        <>
            <PageMeta title="Admin: Members | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: Members" description={'The central place to access and manage all member profiles and data.'} icon={MemberIcon} />
            <ComponentCard>
                <MemberTable />
            </ComponentCard>
        </>
    )
}

export default AdminMembersPage