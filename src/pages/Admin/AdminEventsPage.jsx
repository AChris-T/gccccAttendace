import PageMeta from '@/components/common/PageMeta';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';
import AdminEvent from '@/components/admin/events/AdminEvent';

const AdminFirstTimerPage = () => {
  return (
    <>
      <PageMeta title="Admin: Event Record | GCCC Ibadan" />
      <PageBreadcrumb
        pageTitle="Admin: Events Record"
        description={
          'Log, track, and manage all first timer`s records, follow-up process and assign care tasks.'
        }
      />
      <ComponentCard>
        <AdminEvent />
      </ComponentCard>
    </>
  );
};

export default AdminFirstTimerPage;
