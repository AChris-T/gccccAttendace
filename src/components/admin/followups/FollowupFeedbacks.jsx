import { FollowupCard } from "@/components/admin/followups/FollowupCard";
import { EmptyState } from "@/components/common/EmptyState";
import { FollowupFeedbacksSkeletonLoader } from "@/components/skeleton";
import { Tabs } from "@/components/ui/tab/Tabs";
import useQueryParam from "@/hooks/useQueryParam";
import { StarIcon, UserIcon3, UsersIcon } from "@/icons";
import {
    useFirstTimersWithFollowups,
    useMembersWithFollowups,
    useAbsentMembersWithFollowups,
} from "@/queries/followupFeedback.query";
import { useMemo } from "react";

const TAB_CONFIGS = [
    { key: "first_timer", label: "First Timers", icon: StarIcon },
    { key: "absent_members", label: "Members (Absent)", icon: UsersIcon },
    { key: "all_members", label: "All Members", icon: UserIcon3 },
];

const FollowupFeedbacks = () => {
    const [activeTab, setActiveTab] = useQueryParam("tab", "first_timer");

    const queryHooks = {
        all_members: useMembersWithFollowups,
        first_timer: useFirstTimersWithFollowups,
        absent_members: useAbsentMembersWithFollowups,
    };

    const useActiveQuery = queryHooks[activeTab] || useFirstTimersWithFollowups;
    const { data = [], isLoading } = useActiveQuery();

    const tabs = useMemo(() => TAB_CONFIGS, []);

    return (
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-2 shadow dark:bg-gray-800 sm:p-5">
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                className="justify-center mb-5"
            />

            {isLoading ? (
                <FollowupFeedbacksSkeletonLoader />
            ) :
                data.length == 0 ? <EmptyState /> :
                    (
                        <div className="space-y-5">
                            {data.map((person) => (
                                <FollowupCard
                                    key={person.id}
                                    activeTab={activeTab}
                                    person={person}
                                />
                            ))}
                        </div>
                    )}
        </div>
    );
};

export default FollowupFeedbacks;