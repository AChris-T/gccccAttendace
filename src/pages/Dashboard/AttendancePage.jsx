import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import AttendanceTable from '@/components/attendance/AttendanceTable';
import { AttendanceIcon2 } from '@/icons';


export default function AttendancePage() {

    return (
        <>
            <PageMeta title="Attendance | GCCC Ibadan" />
            <PageBreadcrumb icon={AttendanceIcon2} pageTitle="Attendance" description={'View your personal attendance history for all church services and events, and track your overall participation.'} />
            <ComponentCard >
                <AttendanceTable />
            </ComponentCard>
        </>
    );
}
