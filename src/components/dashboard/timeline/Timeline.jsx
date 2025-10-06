import React, { useState } from 'react';
import { ChevronDown, MessageSquare, CheckCircle2, AlertCircle, Clock, User } from 'lucide-react';

const FeedbackTimeline = () => {
    const [expandedItems, setExpandedItems] = useState({});

    const feedbackData = [
        {
            id: 1,
            type: 'resolved',
            title: 'Feature Request: Dark Mode Implementation',
            author: 'Sarah Chen',
            role: 'Product Manager',
            timestamp: '2 hours ago',
            status: 'Resolved',
            summary: 'Requested dark mode support for better user experience during night time usage.',
            details: 'After analyzing user feedback and usage patterns, we found that 65% of our users access the platform during evening hours. Implementing a dark mode would significantly improve user comfort and reduce eye strain. This aligns with modern design standards and user expectations.',
            responses: [
                { author: 'Alex Kim', role: 'UI Designer', time: '1 hour ago', text: 'Great suggestion! I\'ve prepared initial mockups with OLED-friendly color schemes.' },
                { author: 'Dev Team', role: 'Engineering', time: '30 min ago', text: 'Implementation completed and deployed to production. ✅' }
            ]
        },
        {
            id: 2,
            type: 'pending',
            title: 'Bug Report: Login Form Validation Issue',
            author: 'Michael Torres',
            role: 'QA Engineer',
            timestamp: '5 hours ago',
            status: 'In Progress',
            summary: 'Email validation not working correctly for certain domain extensions.',
            details: 'During regression testing, discovered that the email validation regex doesn\'t properly handle newer TLDs like .tech, .studio, and .design. This affects approximately 2% of our user base based on analytics data. Priority should be medium-high as it blocks legitimate users from signing up.',
            responses: [
                { author: 'Jamie Lee', role: 'Backend Dev', time: '3 hours ago', text: 'Confirmed the issue. Working on updating the validation pattern to support all valid TLDs.' }
            ]
        },
        {
            id: 3,
            type: 'new',
            title: 'Enhancement: Export Data as CSV',
            author: 'Emily Rodriguez',
            role: 'Customer Success',
            timestamp: '1 day ago',
            status: 'Under Review',
            summary: 'Multiple enterprise clients requesting ability to export their data in CSV format.',
            details: 'We\'ve received consistent requests from 15+ enterprise clients for a CSV export feature. This would enable them to perform custom analysis in their preferred tools like Excel or Tableau. Suggested implementation: Add export button to data tables with options for filtered/all data.',
            responses: []
        },
        {
            id: 4,
            type: 'resolved',
            title: 'Feedback: Improve Mobile Navigation',
            author: 'David Park',
            role: 'UX Researcher',
            timestamp: '2 days ago',
            status: 'Resolved',
            summary: 'User testing revealed navigation difficulties on mobile devices.',
            details: 'Conducted usability testing with 20 participants. 75% struggled to find key features in the hamburger menu. Recommendation: Implement bottom navigation bar for primary actions and reorganize menu hierarchy for better discoverability.',
            responses: [
                { author: 'Design Team', role: 'UI/UX', time: '1 day ago', text: 'Redesigned mobile navigation with bottom tab bar. Currently in beta testing.' },
                { author: 'Emily Rodriguez', role: 'Customer Success', time: '12 hours ago', text: 'Beta users report 40% improvement in task completion rates! 🎉' }
            ]
        }
    ];

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getStatusConfig = (type) => {
        switch (type) {
            case 'resolved':
                return {
                    icon: CheckCircle2,
                    color: 'text-emerald-500 dark:text-emerald-400',
                    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
                    border: 'border-emerald-200 dark:border-emerald-500/20',
                    dot: 'bg-emerald-500'
                };
            case 'pending':
                return {
                    icon: Clock,
                    color: 'text-amber-500 dark:text-amber-400',
                    bg: 'bg-amber-50 dark:bg-amber-500/10',
                    border: 'border-amber-200 dark:border-amber-500/20',
                    dot: 'bg-amber-500'
                };
            case 'new':
                return {
                    icon: AlertCircle,
                    color: 'text-blue-500 dark:text-blue-400',
                    bg: 'bg-blue-50 dark:bg-blue-500/10',
                    border: 'border-blue-200 dark:border-blue-500/20',
                    dot: 'bg-blue-500'
                };
            default:
                return {
                    icon: MessageSquare,
                    color: 'text-gray-500 dark:text-gray-400',
                    bg: 'bg-gray-50 dark:bg-gray-500/10',
                    border: 'border-gray-200 dark:border-gray-500/20',
                    dot: 'bg-gray-500'
                };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Feedback Timeline
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track and manage user feedback, bug reports, and feature requests
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-transparent dark:from-gray-700 dark:via-gray-800" />

                    {/* Timeline items */}
                    <div className="space-y-6 sm:space-y-8">
                        {feedbackData.map((item, index) => {
                            const config = getStatusConfig(item.type);
                            const Icon = config.icon;
                            const isExpanded = expandedItems[item.id];

                            return (
                                <div key={item.id} className="relative pl-12 sm:pl-16">
                                    {/* Timeline dot */}
                                    <div className={`absolute left-2.5 sm:left-4 top-2 w-4 h-4 rounded-full ${config.dot} ring-4 ring-white dark:ring-gray-900 shadow-lg`} />

                                    {/* Card */}
                                    <div
                                        className={`bg-white dark:bg-gray-800 rounded-xl border-2 ${config.border} shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group ${isExpanded ? 'scale-[1.02]' : 'scale-100'
                                            }`}
                                    >
                                        {/* Card Header */}
                                        <button
                                            onClick={() => toggleExpand(item.id)}
                                            className="w-full p-4 sm:p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-3 sm:gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                                                            <Icon className="w-3.5 h-3.5" />
                                                            {item.status}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {item.timestamp}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 pr-2">
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <User className="w-4 h-4" />
                                                        <span className="font-medium">{item.author}</span>
                                                        <span className="text-gray-400 dark:text-gray-500">•</span>
                                                        <span>{item.role}</span>
                                                    </div>
                                                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                        {item.summary}
                                                    </p>
                                                </div>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-all duration-500 ${isExpanded ? 'rotate-180 text-gray-600 dark:text-gray-300' : ''
                                                        }`}
                                                />
                                            </div>
                                        </button>

                                        {/* Expanded Content */}
                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            <div className={`px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 dark:border-gray-700 transition-all duration-500 ${isExpanded ? 'translate-y-0' : '-translate-y-4'
                                                }`}>
                                                <div className={`pt-4 sm:pt-6 transition-all duration-500 delay-100 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                                                    }`}>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                        Details
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                                        {item.details}
                                                    </p>

                                                    {item.responses.length > 0 && (
                                                        <>
                                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                                <MessageSquare className="w-4 h-4" />
                                                                Responses ({item.responses.length})
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {item.responses.map((response, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className={`bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-600 transition-all duration-500 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                                                            }`}
                                                                        style={{ transitionDelay: `${200 + idx * 100}ms` }}
                                                                    >
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <span className="font-medium text-sm text-gray-900 dark:text-white">
                                                                                {response.author}
                                                                            </span>
                                                                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                                                                •
                                                                            </span>
                                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                                {response.role}
                                                                            </span>
                                                                            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                                                                {response.time}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                                                            {response.text}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        End of timeline
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackTimeline;