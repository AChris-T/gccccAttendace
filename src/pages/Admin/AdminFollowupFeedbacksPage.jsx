import { MessageSquareIcon } from "@/icons"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import FollowupFeedbacks from "@/components/admin/followups/FollowupFeedbacks"

const AdminFollowupFeedbacksPage = () => {
    return (
        <>
            <PageMeta title="Admin: Followup Feedbacks | GCCC Ibadan" />
            <PageBreadcrumb icon={MessageSquareIcon} pageTitle="Admin: Followup Feedbacks" description={'Feedbacks on absent members and first timers'} />
            <ComponentCard >
                <FollowupFeedbacks />
            </ComponentCard>
        </>
    )
}
export default AdminFollowupFeedbacksPage