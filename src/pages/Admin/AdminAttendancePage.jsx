import { FilterIcon } from "@/icons"
import AdminAttendanceTable from "../../components/admin/attendance/AdminAttendanceTable"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const AdminAttendancePage = () => {
    return (
        <>
            <PageMeta title="Admin: Attendance | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: Attendance" />
            <div className="space-y-6">
                <ComponentCard title="Attendance Management" desc='Filter and manage attendance records' icon={<FilterIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />}>
                    <AdminAttendanceTable />
                </ComponentCard>
            </div>
        </>
    )
}
export default AdminAttendancePage
