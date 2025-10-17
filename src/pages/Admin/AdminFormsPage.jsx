import FormFeedbacks from '@/components/admin/formpage/FormFeedbacks';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import PageMeta from '@/components/common/PageMeta';
import { FormIcon } from '@/icons';

const AdminFormsPage = () => {
  return (
    <>
      <PageMeta title="Admin: Forms | GCCC Ibadan" />
      <PageBreadcrumb icon={FormIcon} pageTitle="Admin: Forms"
        description={'Manage all the questions, prayer request and testomines.'} />
      <ComponentCard>
        <FormFeedbacks />
      </ComponentCard>
    </>
  );
};
export default AdminFormsPage;
