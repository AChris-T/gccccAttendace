import FormFeedbacks from '@/components/admin/formpage/FormFeedbacks';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';

const AdminFollowupFeedbacksPage = () => {
  return (
    <>
      <PageMeta title="Admin: Followup Feedbacks | GCCC Ibadan" />
      <PageBreadcrumb pageTitle="Admin: Followup Feedbacks" />
      <div className="space-y-6">
        <ComponentCard
          title="Form Feedbacks"
          desc="Feedbacks on absent members and first timers"
        >
          <FormFeedbacks />
        </ComponentCard>
      </div>
    </>
  );
};
export default AdminFollowupFeedbacksPage;
