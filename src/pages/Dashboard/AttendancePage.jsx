import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import AttendanceTable from '@/components/attendance/AttendanceTable';
import { AttendanceIcon2 } from '@/icons';


export default function AttendancePage() {

    return (
        <>
            <PageMeta title="Attendance | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Attendance" />
            <div className="space-y-6">
                <ComponentCard title="Attendance" icon={<AttendanceIcon2 className='text-white' />}>
                    <AttendanceTable />
                </ComponentCard>
            </div>
        </>
    );
}
