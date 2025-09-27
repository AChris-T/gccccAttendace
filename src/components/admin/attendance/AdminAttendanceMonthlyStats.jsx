import { useMonthlyAttendanceStats } from '../../../queries/attendance.query'

const AdminAttendanceMonthlyStats = () => {
    const { data } = useMonthlyAttendanceStats(2025, 'avg')
    return (
        <div>AdminAttendanceMonthlyStats</div>
    )
}

export default AdminAttendanceMonthlyStats