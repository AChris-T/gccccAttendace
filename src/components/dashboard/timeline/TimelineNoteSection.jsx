import { MessageSquareIcon, UserIcon } from "@/icons";

const TimelineNoteSection = ({ item, isExpanded }) => (
    <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-96 opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
            }`}
    >
        <div className="border-t border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/30 p-3 sm:p-4">
            {item.note && (
                <div className="transform transition-all duration-500">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <MessageSquareIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-wide">
                                Note
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                Added {item.created_at_human}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-gray-200/80 dark:border-gray-700/50">
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.note}
                        </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/30">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                            <UserIcon className="w-4 h-4" />
                            <span>
                                Regarding{" "}
                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                    {item.subject.full_name}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default TimelineNoteSection;
