import { AdminIcon } from "@/icons"
import AdminAttendanceMonthlyStats from "../../components/admin/attendance/AdminAttendanceMonthlyStats"
import AdminMetrics from "../../components/admin/dashboard/AdminMetrics"
import FirstTimersCharts from "../../components/admin/firsttimer/FirstTimersCharts"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const AdminDashboardPage = () => {
    return (
        <>
            <PageMeta title="Admin: Dashboard | GCCC Ibadan" />
            <PageBreadcrumb icon={AdminIcon} pageTitle="Admin: Dashboard" description={'View real-time statistics on attendance, new members, follow-up progress, and recent system activity.'} />

            <ComponentCard title="First Timers Analytics" >
                <AdminMetrics />
                <FirstTimersCharts />
                <AdminAttendanceMonthlyStats />
            </ComponentCard>
        </>
    )
}

export default AdminDashboardPage