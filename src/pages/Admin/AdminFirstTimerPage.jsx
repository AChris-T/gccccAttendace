import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import FirstTimersTable from '../../components/admin/firsttimer/FirstTimersTable'

const AdminFirstTimerPage = () => {
    return (
        <>
            <PageMeta title="Admin: First Timers | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: First Timers" />
            <div className="space-y-6">
                <ComponentCard title="First Timers Table">
                    <FirstTimersTable />
                </ComponentCard>
            </div>
        </>
    )
}

export default AdminFirstTimerPage