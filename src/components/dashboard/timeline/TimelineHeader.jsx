import Button from "@/components/ui/Button";

const TimelineHeader = ({ openModal }) => (
    <div className="mb-10">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-1">
            Activity Timeline
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Track all first timer's interactions and follow-ups
        </p>
        <Button onClick={openModal} className="mt-2" variant="neutral" size="sm">
            + New feedback
        </Button>
    </div>
);

export default TimelineHeader;
