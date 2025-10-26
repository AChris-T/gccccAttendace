import PageMeta from '@/components/common/PageMeta'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import ComponentCard from '@/components/common/ComponentCard'
import AdminFirstTimersTable from '@/components/admin/firsttimer/AdminFirstTimersTable'

const AdminFirstTimerPage = () => {
    return (
        <>
            <PageMeta title="Admin: First Timers | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: First Timers" description={'Log, track, and manage all first timer`s records, follow-up process and assign care tasks.'} />
            <ComponentCard>
                <AdminFirstTimersTable />
            </ComponentCard>
        </>
    )
}

export default AdminFirstTimerPage