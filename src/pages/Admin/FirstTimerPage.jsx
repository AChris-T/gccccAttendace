import PageMeta from '../../components/common/PageMeta'
import FirstTimersData from '../../components/admin/first_timer/FirstTimersData'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'

const AdminFirstTimerPage = () => {
    return (
        <>  <PageMeta title="First Timers | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="First Timers" />
            <div className="space-y-6">
                <ComponentCard title="All First Timers">
                    <FirstTimersData />
                </ComponentCard>
            </div></>
    )
}

export default AdminFirstTimerPage