import TimelineItem from "@/components/dashboard/timeline/TimelineItem";

const TimelineContainer = ({ data, expandedItems, toggleExpand }) => (
    <div className="relative">
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 dark:from-blue-500 dark:via-purple-500 dark:to-green-500 opacity-30 dark:opacity-50" />
        <div className="space-y-6 sm:space-y-8 rounded shadow py-5 pr-5">
            {data.map((item) => (
                <TimelineItem
                    key={item.id}
                    item={item}
                    isExpanded={expandedItems[item.id]}
                    onToggle={() => toggleExpand(item.id)}
                />
            ))}
        </div>
    </div>
);

export default TimelineContainer;
