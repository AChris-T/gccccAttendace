import { FollowupCard } from "@/components/admin/followups/FollowupCard";
import { FollowupFeedbacksSkeletonLoader } from "@/components/skeleton";
import { Tabs } from "@/components/ui/tab/Tabs";
import useQueryParam from "@/hooks/useQueryParam";
import { StarIcon, UsersIcon } from "@/icons";
import { useFirstTimersWithFollowups } from "@/queries/firstTimer.query";
import { useMemo } from "react";

const FollowupFeedbacks = () => {
    const [activeTab, setActiveTab] = useQueryParam('tab', 'firsttimers');
    const { data = [], isLoading } = activeTab == 'firsttimers' ? useFirstTimersWithFollowups() : {}

    const tabs = useMemo(() => [
        { key: 'firsttimers', label: 'First Timers', icon: StarIcon },
        { key: 'members', label: 'Members', icon: UsersIcon },
    ], []);

    return (
        <>
            <div className="max-w-5xl mx-auto shadow bg-white dark:bg-gray-800 p-2 sm:p-5 rounded-xl">
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    className="justify-center"
                />

                {isLoading ? <FollowupFeedbacksSkeletonLoader /> : <div className="space-y-5">
                    {data?.map((person) => (
                        <FollowupCard key={person.id} person={person} />
                    ))}
                </div>}
            </div>
        </>
    );

}

export default FollowupFeedbacks