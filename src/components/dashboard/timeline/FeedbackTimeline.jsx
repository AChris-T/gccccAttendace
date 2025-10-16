import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { EmptyState } from "@/components/common/EmptyState";
import { TimelineSkeletonLoader } from "@/components/skeleton";
import { ClockIcon } from "@/icons";
import TimelineHeader from "@/components/dashboard/timeline/TimelineHeader";
import CreateTimeline from "@/components/dashboard/timeline/CreateTimeline";
import Modal from "@/components/ui/Modal";
import TimelineContainer from "@/components/dashboard/timeline/TimelineContainer";
import { useGetFollowUpsByFirstTimer } from "@/queries/followupFeedback.query";

const FeedbackTimeline = ({ firstTimerId }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const { data: timelineData = [], isLoading } =
        useGetFollowUpsByFirstTimer(firstTimerId);
    const { isOpen, openModal, closeModal } = useModal();

    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (isLoading) return <TimelineSkeletonLoader />;

    return (
        <>
            <div className="w-full mx-auto py-5 transition-colors duration-300">
                <TimelineHeader openModal={openModal} />
                {timelineData.length > 0 ? (
                    <TimelineContainer
                        data={timelineData}
                        expandedItems={expandedItems}
                        toggleExpand={toggleExpand}
                    />
                ) : (
                    <EmptyState
                        icon={<ClockIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />}
                        title="No timeline entries yet"
                        description="Timeline entries will appear here as they are created. Start by adding your first activity."
                    />
                )}
            </div>
            <Modal
                title='New Feedback'
                isOpen={isOpen}
                onClose={closeModal}
            >
                <CreateTimeline firstTimerId={firstTimerId} onClose={closeModal} />
            </Modal>
        </>
    );
};

export default FeedbackTimeline;