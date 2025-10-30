import { useState, useCallback, useMemo } from 'react';

import PageMeta from '@/components/common/PageMeta';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AttendanceMetrics from '@/components/dashboard/metrics/AttendanceMetrics';
import MonthlyTarget from '@/components/dashboard/MonthlyTarget';
import BibleVerseDisplay from '@/components/dashboard/BibleVerseDisplay';
import VideoCarousel from '@/components/media/VideoCarousel';
import QuickActionsSection from '@/components/dashboard/QuickActionsSection';
import { useUsersMonthlyAttendanceStats } from '@/queries/attendance.query';
import { DashboardIcon } from '@/icons';
import { useGetAssignedMembers } from '@/queries/user.query';
import { TableSkeletonLoader } from '@/components/skeleton';
import FirstTimerAssigned from '@/components/dashboard/assigned/FirstTimerAssigned';
import AssignedMembers from '@/components/dashboard/assigned/AssignedMembers';
import { Units } from '@/utils/constant';
import { useHasUnit } from '@/hooks/useUnitPermission';

// Constants
const getCurrentDateParams = () => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
});

// Custom Hooks
const useDateFilter = () => {
  const [params, setParams] = useState(getCurrentDateParams);
  const handleDateChange = useCallback((newParams) => {
    setParams(newParams);
  }, []);
  return {
    params,
    handleDateChange,
  };
};

const useDashboardData = (year, month) => {
  const attendanceQuery = useUsersMonthlyAttendanceStats(year, month);
  const assignednMembersQuery = useGetAssignedMembers();

  return {
    attendance: attendanceQuery,
    assignedMembers: assignednMembersQuery,
  };
};


const MainContentSection = ({ attendanceProps, handleDateChange }) => {
  return (
    <section className="relative col-span-12 space-y-5 xl:col-span-7">
      <AttendanceMetrics {...attendanceProps} handleDateChange={handleDateChange} />
      <BibleVerseDisplay />
    </section>
  );
}



const SidebarSection = ({ attendanceProps, handleDateChange }) => (
  <aside className="col-span-12 xl:col-span-5">
    <MonthlyTarget {...attendanceProps} handleDateChange={handleDateChange} />
  </aside>
);

const LoadingSection = () => (
  <section className="col-span-12 my-5">
    <TableSkeletonLoader />
  </section>
);


const AssignedMembersSection = ({ data, isLoading }) => {
  if (isLoading) return <LoadingSection />;
  return <AssignedMembers assignedMembers={data} />;
};

const DashboardPage = () => {
  const { params, handleDateChange } = useDateFilter();
  const hasFollowUp = useHasUnit(Units.FOLLOW_UP);

  const { attendance, assignedMembers } = useDashboardData(params.year, params.month);

  const attendanceProps = useMemo(
    () => ({
      data: attendance.data,
      isLoading: attendance.isLoading,
      isError: attendance.isError,
      error: attendance.error,
      params,
    }),
    [attendance.data, attendance.isLoading, attendance.isError, attendance.error, params]
  );

  return (
    <>
      <PageMeta title="Dashboard | GCCC Ibadan" />
      <PageBreadcrumb icon={DashboardIcon} pageTitle="Dashboard" description={'See your latest attendance summary, current giving status, and important community updates at a glance.'} />

      <main className="grid grid-cols-12 gap-4 md:gap-6">
        <MainContentSection attendanceProps={attendanceProps} />
        <SidebarSection attendanceProps={attendanceProps} handleDateChange={handleDateChange} />
        <QuickActionsSection />

        <section className="col-span-12 my-5">
          <VideoCarousel />
        </section>

        <AssignedMembersSection
          data={assignedMembers.data}
          isLoading={assignedMembers.isLoading}
        />

        {hasFollowUp && <FirstTimerAssigned />}
      </main>
    </>
  );
};

export default DashboardPage;