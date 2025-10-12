import { EmptyState } from '@/components/common/EmptyState';
import CreateTimeline from '@/components/dashboard/timeline/CreateTimeline';
import Button from '@/components/ui/Button';
import { useModal } from '@/hooks/useModal';
import { useGetFirstTimersFollowups } from '@/queries/firstTimer.query';
import { useState } from 'react';
import Modal from "@/components/ui/Modal";
import Badge from '@/components/ui/Badge';

// SVG Icons
const ChevronDownIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const ChevronUpIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

const ClockIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CalendarIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const MessageSquareIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const UserIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const MailIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const FeedbackTimeline = ({ firstTimerId }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const { data: timelineData = [], isLoading } = useGetFirstTimersFollowups(firstTimerId)

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeConfig = (type) => {
        const configs = {
            'Pre-Service': { color: 'primary', variant: 'light' },
            'Post-Service': { color: 'success', variant: 'light' },
            'Admin': { color: 'error', variant: 'light' },
            'Pastor': { color: 'warning', variant: 'light' },
            'Unit-Leader': { color: 'info', variant: 'light' },
            'Others': { color: 'light', variant: 'light' },
        };
        return configs[type] || { color: 'light', variant: 'light' };
    };

    const getGradientColor = (index) => {
        const gradients = [
            'from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500',
            'from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500',
            'from-green-500 to-teal-600 dark:from-green-400 dark:to-teal-500',
            'from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500',
            'from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500',
            'from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500',
        ];
        return gradients[index % gradients.length];
    };

    const { isOpen, openModal, closeModal } = useModal();
    if (isLoading) return <TimelineSkeletonLoader />


    return (
        <>
            <div className="w-full mx-auto">
                <div className="py-8 transition-colors duration-300">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-1">
                            Activity Timeline
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                            Track all first timer's interactions and follow-ups
                        </p>
                        <Button onClick={openModal} className='mt-2' variant='neutral' size='sm'>+ New feeback</Button>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative rounded shadow py-5 pr-5">
                        {/* Vertical Line */}
                        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 dark:from-blue-500 dark:via-purple-500 dark:to-green-500 opacity-30 dark:opacity-50" />

                        {/* Timeline Items */}
                        <div className="space-y-6 sm:space-y-8">
                            {timelineData.map((item, index) => {
                                const typeConfig = getTypeConfig(item.type);
                                return (
                                    <div key={item.id} className="relative pl-12 sm:pl-20">
                                        {/* Timeline Dot */}
                                        <div className="absolute left-2.5 sm:left-6 top-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white dark:bg-gray-900 ring-4 ring-blue-500 dark:ring-blue-400 shadow-lg shadow-blue-500/50 dark:shadow-blue-400/50 animate-pulse" />

                                        {/* Card */}
                                        <div className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300 overflow-hidden border border-gray-200/80 dark:border-gray-700/80">
                                            {/* Card Header */}
                                            <div className="p-5 sm:p-6 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                                        {/* Avatar */}
                                                        <div className="flex-shrink-0">
                                                            <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg ring-4 ring-white dark:ring-gray-800 transition-transform duration-300 group-hover:scale-105`}>
                                                                {item.user.avatar ? (
                                                                    <img src={item.user.avatar} alt={item.user.full_name} className="w-full h-full rounded-full object-cover" />
                                                                ) : (
                                                                    item.user.initials
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                                                                    {item.user.full_name}
                                                                </h3>
                                                                <Badge
                                                                    variant={typeConfig.variant}
                                                                    color={typeConfig.color}
                                                                    size="md"
                                                                >
                                                                    {item.type}
                                                                </Badge>
                                                            </div>

                                                            <div className="flex items-center gap-2 mb-3">
                                                                <MailIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                                    {item.user.email}
                                                                </p>
                                                            </div>

                                                            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                                                                <div className="flex items-center gap-1.5">
                                                                    <ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                                    <span className="font-medium">{item.created_at_human}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                                    <span className="hidden sm:inline">{formatDate(item.created_at)}</span>
                                                                    <span className="sm:hidden">{new Date(item.created_at).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Expand Button */}
                                                    <button

                                                        className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 active:scale-95"
                                                        aria-label="Toggle details"
                                                    >
                                                        <div className="transform transition-transform duration-300">
                                                            {expandedItems[item.id] ? (
                                                                <ChevronUpIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                            ) : (
                                                                <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                            )}
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Collapsible Note Section with Animation */}
                                            <div
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedItems[item.id]
                                                    ? 'max-h-96 opacity-100'
                                                    : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <div className="border-t border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/30 p-5 sm:p-6">
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
                                                            <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm">
                                                                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                                                    {item.note}
                                                                </p>
                                                            </div>

                                                            {/* Additional Info */}
                                                            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/30">
                                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                                                    <UserIcon className="w-4 h-4" />
                                                                    <span>
                                                                        Regarding <span className="font-semibold text-gray-700 dark:text-gray-300">{item.first_timer.name}</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>

                    {/* Empty State */}
                    {timelineData.length === 0 && (
                        <EmptyState icon={<ClockIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />} title='No timeline entries yet' description=' Timeline entries will appear here as they are created. Start by adding your first activity.' />
                    )}
                </div>
                <Modal
                    title='New Feedback'
                    isOpen={isOpen}
                    onClose={closeModal}
                >
                    {/* create feedbacks  */}
                    <CreateTimeline firstTimerId={firstTimerId} onClose={closeModal} />
                </Modal>

            </div>
        </>
    );
};

export default FeedbackTimeline;