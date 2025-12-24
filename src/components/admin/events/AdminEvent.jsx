import AdminEventsTable from '@/components/admin/events/AdminEventsTable';
import PicnicAdminDashboard from '@/components/admin/events/PicnicAdminDashboard';
import { useGetRegistrations } from '@/queries/picnic.query';
import React from 'react';

export default function AdminEvent() {
  const { data: registrationData, isLoading } = useGetRegistrations();

  return (
    <div>
      <PicnicAdminDashboard data={registrationData} isLoading={isLoading} />
      {/* <AdminEventsTable /> */}
    </div>
  );
}
