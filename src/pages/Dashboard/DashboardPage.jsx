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
import { CalenderIcon } from '@/icons';
import { useGetAssignedAbsentees } from '@/queries/user.query';
import { TableSkeletonLoader } from '@/components/skeleton';

const getCurrentDateParams = () => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
});

const AssignedMembersSection = ({ assignedMembers }) => {
  if (!assignedMembers?.length) return null;
  return (
    <div className="col-span-12">
      <AssignedAbsentMembers assignedMembers={assignedMembers} />
    </div>
  );
};

const DateFilterDropdown = ({ isOpen, onToggle, onDateChange }) => (
  <>
    <Button
      onClick={onToggle}
      variant="ghost"
      size="sm"
      aria-label="Select date range"
      aria-expanded={isOpen}
    >
      <CalenderIcon height={20} width={20} />
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

// Main Component
const DashboardPage = () => {
  const { params, isOpen, toggleDropdown, handleDateChange } = useDateFilter();
  const { data: assignedMembers, isLoading: isLoadingAssignedMembers } = useGetAssignedAbsentees();

  const { data, isLoading, isError, error } = useUsersMonthlyAttendanceStats(
    params.year,
    params.month
  );

  const attendanceProps = useMemo(
    () => ({ data, isLoading, isError, error, params }),
    [data, isLoading, isError, error, params]
  );

  return (
    <>
      <PageMeta title="Dashboard | GCCC Ibadan" />

      <PageBreadcrumb pageTitle="Dashboard">
        <DateFilterDropdown
          isOpen={isOpen}
          onToggle={toggleDropdown}
          onDateChange={handleDateChange}
        />
      </PageBreadcrumb>

      <main className="grid grid-cols-12 gap-4 md:gap-6">
        <MainContentSection attendanceProps={attendanceProps} />
        <SidebarSection attendanceProps={attendanceProps} />
        <QuickActionsSection />

        <section className="col-span-12 my-5">
          <VideoCarousel />
        </section>

        {isLoadingAssignedMembers ? <section className="col-span-12 my-5">
          <TableSkeletonLoader />
        </section> : <AssignedMembersSection assignedMembers={assignedMembers} />}
      </main>
    </>
  );
};

export default DashboardPage;