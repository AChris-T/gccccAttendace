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
            <PageBreadcrumb pageTitle="Admin: Dashboard" />
            <div className="space-y-6">
                <AdminMetrics />
                <ComponentCard title="First Timers Analytics" >
                    <FirstTimersCharts />
                </ComponentCard>
                <ComponentCard title="Attendance Analytics" >
                    <AdminAttendanceMonthlyStats />
                </ComponentCard>
            </div>
        </>
    )
}

export default AdminDashboardPage