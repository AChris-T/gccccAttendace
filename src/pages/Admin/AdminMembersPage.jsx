import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import AdminMembersTable from '../../components/admin/members/AdminMembersTable'
import { MemberIcon } from '@/icons'

const AdminMembersPage = () => {

    return (
        <>
            <PageMeta title="Admin: Members | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: Members" description={'The central place to access and manage all member profiles and data.'} icon={MemberIcon} />
            <ComponentCard>
                <AdminMembersTable />
            </ComponentCard>
        </>
    )
}

export default AdminMembersPage