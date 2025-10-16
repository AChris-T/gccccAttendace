import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import FollowupFeedbacks from "@/components/admin/followups/FollowupFeedbacks"

const AdminFollowupFeedbacksPage = () => {
    return (
        <>
            <PageMeta title="Admin: Followup Feedbacks | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: Followup Feedbacks" />
            <div className="space-y-6">
                <ComponentCard title="Followup Feedbacks" desc="Feedbacks on absent members and first timers">
                    <FollowupFeedbacks />
                </ComponentCard>
            </div>
        </>
    )
}
export default AdminFollowupFeedbacksPage