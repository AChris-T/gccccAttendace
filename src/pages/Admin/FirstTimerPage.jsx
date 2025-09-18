import PageMeta from '../../components/common/PageMeta'
import FirstTimersData from '../../components/admin/first_timer/FirstTimersData'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import FirstTimersTable from '../../components/admin/first_timer/FirstTimersTable'

const AdminFirstTimerPage = () => {
    return (
        <>  <PageMeta title="First Timers | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="First Timers" />
            <div className="space-y-6">
                <ComponentCard title="First Timers Analytics">
                    <FirstTimersData />
                </ComponentCard>
                <ComponentCard title="First Timers Table">
                    <FirstTimersTable />
                </ComponentCard>
            </div></>
    )
}

export default AdminFirstTimerPage