import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import MemberTable from '../../components/admin/members/MembersTable'

const AdminMembersPage = () => {

    return (
        <>
            <PageMeta title="Admin: Members | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: Members" />
            <div className="space-y-6">
                <ComponentCard title="All Members">
                    <MemberTable />
                </ComponentCard>
            </div>
        </>
    )
}

export default AdminMembersPage