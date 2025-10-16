import { useState, useCallback, useMemo } from 'react';

import PageMeta from '@/components/common/PageMeta';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AttendanceMetrics from '@/components/dashboard/metrics/AttendanceMetrics';
import MonthlyTarget from '@/components/dashboard/MonthlyTarget';
import BibleVerseDisplay from '@/components/dashboard/BibleVerseDisplay';
import AssignedAbsentMembers from '@/components/dashboard/assigned/AssignedAbsentMembers';
import VideoCarousel from '@/components/media/VideoCarousel';
import QuickActionsSection from '@/components/dashboard/QuickActionsSection';
import MonthYearSelector from '@/components/common/MonthYearSelector';
import Button from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { useUsersMonthlyAttendanceStats } from '@/queries/attendance.query';
import { CalenderIcon, DashboardIcon } from '@/icons';
import { useGetAssignedAbsentees } from '@/queries/user.query';
import { TableSkeletonLoader } from '@/components/skeleton';
import FirstTimerAssigned from '@/components/dashboard/assigned/FirstTimerAssigned';
import { useGetFirstTimersAssigned } from '@/queries/firstTimer.query';

// Constants
const getCurrentDateParams = () => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
});

// Custom Hooks
const useDateFilter = () => {
  const [params, setParams] = useState(getCurrentDateParams);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleDateChange = useCallback((newParams) => {
    setParams(newParams);
    setIsOpen(false);
  }, []);

  return {
    params,
    isOpen,
    toggleDropdown,
    handleDateChange,
  };
};

const useDashboardData = (year, month) => {
  const attendanceQuery = useUsersMonthlyAttendanceStats(year, month);
  const assignedMembersQuery = useGetAssignedAbsentees();
  const firstTimersQuery = useGetFirstTimersAssigned();

  return {
    attendance: attendanceQuery,
    assignedMembers: assignedMembersQuery,
    firstTimers: firstTimersQuery,
  };
};

// Presentational Components
const DateFilterDropdown = ({ isOpen, onToggle, onDateChange }) => (
  <>
    <Button
      onClick={onToggle}
      variant="ghost"
      size="sm"
      aria-label="Select date range"
      aria-expanded={isOpen}
    >
      <CalenderIcon height={17} width={17} />
    </Button>
    <Dropdown
      direction="right"
      isOpen={isOpen}
      onClose={onToggle}
      className="p-2"
    >
      <MonthYearSelector onChange={onDateChange} />
    </Dropdown>
  </>
);

const MainContentSection = ({ attendanceProps }) => (
  <section className="col-span-12 space-y-5 xl:col-span-7">
    <AttendanceMetrics {...attendanceProps} />
    <BibleVerseDisplay />
  </section>
);

const SidebarSection = ({ attendanceProps }) => (
  <aside className="col-span-12 xl:col-span-5">
    <MonthlyTarget {...attendanceProps} />
  </aside>
);

const LoadingSection = () => (
  <section className="col-span-12 my-5">
    <TableSkeletonLoader />
  </section>
);

const AssignedMembersSection = ({ data, isLoading }) => {
  if (isLoading) return <LoadingSection />;
  if (!data?.length) return null;

  return <AssignedAbsentMembers assignedMembers={data} />;
};

const FirstTimersSection = ({ data, isLoading }) => {
  if (isLoading) return <LoadingSection />;
  if (!data?.length) return null;

  return <FirstTimerAssigned firstTimers={data} />;
};

// Main Component
const DashboardPage = () => {
  const { params, isOpen, toggleDropdown, handleDateChange } = useDateFilter();

  const {
    attendance,
    assignedMembers,
    firstTimers,
  } = useDashboardData(params.year, params.month);

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
      <PageBreadcrumb icon={DashboardIcon} pageTitle="Dashboard" description={'See your latest attendance summary, current giving status, and important community updates at a glance.'}>
        {/* <DateFilterDropdown
          isOpen={isOpen}
          onToggle={toggleDropdown}
          onDateChange={handleDateChange}
        /> */}
      </PageBreadcrumb>

      <main className="grid grid-cols-12 gap-4 md:gap-6">
        <MainContentSection attendanceProps={attendanceProps} />
        <SidebarSection attendanceProps={attendanceProps} />
        <QuickActionsSection />

        <section className="col-span-12 my-5">
          <VideoCarousel />
        </section>

        <AssignedMembersSection
          data={assignedMembers.data}
          isLoading={assignedMembers.isLoading}
        />

        <FirstTimersSection
          data={firstTimers.data}
          isLoading={firstTimers.isLoading}
        />
      </main>
    </>
  );
};

export default DashboardPage;