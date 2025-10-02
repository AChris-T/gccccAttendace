import AttendanceMetrics from '@/components/dashboard/metrics/AttendanceMetrics'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import PageMeta from '../../components/common/PageMeta'
import MonthlyTarget from '@/components/dashboard/MonthlyTarget'
import AssignedMembers from '@/components/dashboard/AssignedMembers'
import { useAuthStore } from '@/store/auth.store'
import VideoCarousel from '@/components/media/VideoCarousel'
import { useUsersMonthlyAttendanceStats } from '@/queries/attendance.query'
import { useState } from 'react'
import BibleVerseDisplay from '@/components/dashboard/BibleVerseDisplay'

const DashboardPage = () => {
  const { user } = useAuthStore()
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(10)
  const { data, isLoading, isError, error } = useUsersMonthlyAttendanceStats(year, month)

  return (
    <>
      <PageMeta title="Dashboard | GCCC Ibadan" />
      <PageBreadcrumb pageTitle="Dashboard" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-5 xl:col-span-7">
          <AttendanceMetrics data={data} isError={isError} isLoading={isLoading} error={error} />
          <BibleVerseDisplay />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget data={data} isError={isError} isLoading={isLoading} error={error} />
        </div>

        <div className="col-span-12 my-10">
          <VideoCarousel />
        </div>


        {/* 
        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>
 */}
        {user?.assignedAbsentees?.length > 0 && <div className="col-span-12">
          <AssignedMembers assignedMembers={user?.assignedAbsentees} />
        </div>}

      </div>
    </>
  )
}

export default DashboardPage