import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
// import { useAttendanceHistory } from '../queries/attendance.query';
import AttendanceReport from '../../components/attendance/AttendanceReport';


export default function AttendancePage() {
    // const { data: filteredResults = [], isLoading } = useAttendanceHistory()

    return (
        <>
            <PageMeta title="Attendance | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Attendance" />
            <div className="space-y-6">
                <ComponentCard title="Attendance">
                    <AttendanceReport />
                </ComponentCard>
            </div>
        </>
    );
}
