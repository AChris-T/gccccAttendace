import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { CalendarIcon, ChevronDownIcon, ClockIcon, MessageIcon, UserIcon } from "@/icons";
import { formatFullDateTime, getTimeAgo, getTypeConfig } from "@/utils/helper";
import { useState } from "react";

export const FollowupCard = ({ person }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow transition-all duration-300 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-10 w-full p-5 sm:p-6 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-xl"
            >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <Avatar size="md" src={person.avatar} name={person.initials}
                        alt={person.full_name} />
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                                {person.full_name}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="truncate">{person.email}</span>
                                <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
                                <span className="truncate">{person.phone_number}</span>
                            </div>
                        </div>

                        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} flex-shrink-0`}>
                            <ChevronDownIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>

                    {/* Status and Assigned Info */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge size="sm" color={person.follow_up_status.color}>{person.follow_up_status.title}</Badge>
                        <Badge size="sm" color='light'>
                            <UserIcon className="w-3.5 h-3.5" />
                            <span className="font-medium">{person.assigned_to_member.full_name}</span>
                        </Badge>
                        <Badge size="sm" color='purple'>
                            <MessageIcon className="w-3.5 h-3.5" />
                            <span>{person.followupFeedbacks.length} Feedback{person.followupFeedbacks.length !== 1 ? 's' : ''}</span>
                        </Badge>
                        {person.followupFeedbacks.length > 0 && <Badge size="sm" color='success'>
                            <ClockIcon className="w-3.5 h-3.5" />
                            {getTimeAgo(person.followupFeedbacks?.[0]?.created_at)}
                        </Badge>}
                    </div>
                </div>
            </button>

            {/* Collapsible Content */}
            <div
                className={`absolute left-0 right-0 top-full bg-white dark:bg-gray-800 rounded-b-xl border-t border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] overflow-y-auto opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
                    }`}
                style={{ zIndex: 20 }}
            >
                <div className="px-5 sm:px-6 pb-6">
                    {person.followupFeedbacks.length > 0 ? (
                        <div className="space-y-3 mt-5">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
                                <MessageIcon className="w-4 h-4" />
                                Follow-up Feedbacks
                            </h4>
                            {person?.followupFeedbacks?.map((feedback) => {
                                const typeConfig = getTypeConfig(feedback.type);
                                return (
                                    <div
                                        key={feedback.id}
                                        className="bg-gradient-to-br from-gray-50 to-gray-50 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex flex-row sm:items-start justify-between gap-2 mb-3">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center dark:text-gray-400 gap-1">
                                                    <UserIcon height={13} width={13} className="mt-0" /> <p className="text-sm">{feedback.user.first_name} {feedback.user.last_name}</p>
                                                </div>
                                                <Badge color={typeConfig.color} size="sm">
                                                    {feedback.type}
                                                </Badge>
                                                {feedback.service_date && (
                                                    <Badge size="sm" color='warning'>
                                                        <CalendarIcon /> {formatFullDateTime(feedback.service_date)}
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                                {getTimeAgo(feedback.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {feedback.note}
                                        </p>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    ) : (
                        <div className="mt-5 text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
                                <MessageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">No feedback available yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};