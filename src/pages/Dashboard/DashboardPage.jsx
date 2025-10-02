import AttendanceMetrics from '@/components/dashboard/AttendanceMetrics'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import PageMeta from '../../components/common/PageMeta'
import MonthlyTarget from '@/components/dashboard/MonthlyTarget'
import RandomBibleVerse from '@/components/dashboard/RandomBibleVerse'
import AssignedMembers from '@/components/dashboard/AssignedMembers'
import { useAuthStore } from '@/store/auth.store'
import VideoDisplay from '@/components/events/VideoDisplay'

const DashboardPage = () => {
  const { user } = useAuthStore()
  return (
    <>
      <PageMeta title="Dashboard | GCCC Ibadan" />
      <PageBreadcrumb pageTitle="Dashboard" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <AttendanceMetrics />

          <RandomBibleVerse />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <VideoDisplay />
        {/* 

        <div className="col-span-12">
          <StatisticsChart />
        </div>

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