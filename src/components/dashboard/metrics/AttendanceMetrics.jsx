import Message from '@/components/common/Message';
import AttendanceMetric from '@/components/dashboard/metrics/AttendanceMetric';
import { AttendanceStatsSkeleton } from '@/components/skeleton';

const AttendanceMetrics = ({ data, isError, isLoading, error }) => {

    if (isLoading) return <AttendanceStatsSkeleton />
    if (isError) return <Message data={error?.data} />

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <AttendanceMetric data={data?.metrics} type='Present' />
            <AttendanceMetric data={data?.metrics} type='Absent' />
        </div>
    )
}

export default AttendanceMetrics