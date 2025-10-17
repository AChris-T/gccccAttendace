import FormFeedbacks from '@/components/admin/formpage/FormFeedbacks';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import { FormIcon } from '@/icons';

const AdminFormsPage = () => {
  return (
    <>
      <PageMeta title="Admin: Followup Feedbacks | GCCC Ibadan" />
      <PageBreadcrumb icon={FormIcon} pageTitle="Admin: Forms" description={'Feedbacks on absent members and first timers'} />
      <ComponentCard>
        <FormFeedbacks />
      </ComponentCard>
    </>
  );
};
export default AdminFormsPage;
