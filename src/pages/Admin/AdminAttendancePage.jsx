import AdminAttendanceTable from "../../components/admin/attendance/AdminAttendanceTable"
import AttendanceFilter from "../../components/admin/attendance/AttendanceFilter"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const AdminAttendancePage = () => {
    return (
        <>
            <PageMeta title="Admin | Attendance | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin | Attendance" />
            <div className="space-y-6">
                <ComponentCard title="Attendance">
                    <AttendanceFilter />
                    <AdminAttendanceTable />
                </ComponentCard>
            </div>
        </>
    )
}
export default AdminAttendancePage
