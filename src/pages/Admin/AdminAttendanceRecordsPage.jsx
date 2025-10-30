import AttendanceRecords from '@/components/attendance-records/AttendanceRecords'
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import { AttendanceIcon2 } from '@/icons'
import React from 'react'

const AdminAttendanceRecordsPage = () => {
    return (
        <>
            <PageMeta title="Admin: Attendance Records | GCCC Ibadan" />
            <PageBreadcrumb icon={AttendanceIcon2} pageTitle="Admin: Attendance Records" description={''} />
            <ComponentCard>
                <AttendanceRecords />
            </ComponentCard>
        </>
    )
}

export default AdminAttendanceRecordsPage