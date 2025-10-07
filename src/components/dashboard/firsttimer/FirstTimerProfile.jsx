import Badge from '@/components/ui/Badge';
import React, { useState } from 'react';

// SVG Icons
const UserIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const MailIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const PhoneIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const MapPinIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalendarIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const BriefcaseIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const UserCheckIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ClipboardListIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const MessageSquareIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const UsersIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const HeartIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const BookOpenIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const EditIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const SendIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const CopyIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ChevronDownIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const ChevronUpIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

const UserPlusIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const TrashIcon = ({ width = 24, height = 24, className = "w-4 h-4", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ToolboxIcon = ({ width = 24, height = 24, className = "w-6 h-6", fill = "currentColor" }) => (
    <svg className={className} width={width} height={height} fill="none" stroke={fill} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
);

const WhatsAppIcon = ({ width = 24, height = 24, className = "w-5 h-5" }) => (
    <svg className={className} width={width} height={height} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const FirstTimerProfile = () => {
    const [copied, setCopied] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [accountStatus, setAccountStatus] = useState('active');
    const [toolboxOpen, setToolboxOpen] = useState(true);

    const firstTimerData = {
        id: 138,
        name: "Samuel Olaniyan",
        phone_number: "8179642225",
        email: "Samuelolaniyan8@gmail.com",
        gender: "Male",
        located_in_ibadan: false,
        interest: "Bible Study & Fellowship",
        born_again: "Yes",
        whatsapp_interest: true,
        address: "123 Independence Avenue, Bodija, Ibadan",
        status: "active",
        date_of_visit: "2025-08-17",
        date_of_birth: "1995-03-15",
        occupation: "Software Developer",
        invited_by: "Jeremiah Online",
        service_experience: "Welcoming and spirit-filled service",
        prayer_point: "Career guidance and spiritual growth",
        friend_family: "Attended with a friend from work",
        how_did_you_learn: "Social media advertisement",
        is_student: false,
        notes: "He already has a church he attends (Elevation Church), that's why he said he isn't interested in becoming a member of our church",
        week_ending: "2025-08-17",
        visitation_report: "Called and had a warm conversation. He appreciated the follow-up.",
        pastorate_call: "Scheduled for next week",
        assigned_at: "2025-08-17 00:00:00",
        follow_up_status: {
            id: 9,
            title: "Opt-out",
            color: "error"
        },
        assigned_to_member: "Pastor David Williams",
        created_at: "2025-10-06 14:04:58",
        updated_at: "2025-10-06 14:04:58"
    };

    const statuses = [
        { id: 1, title: "Pending", color: "warning" },
        { id: 2, title: "Contacted", color: "info" },
        { id: 3, title: "Active Member", color: "success" },
        { id: 9, title: "Opt-out", color: "error" }
    ];

    const members = [
        "Pastor David Williams",
        "Pastor Sarah Johnson",
        "Elder Michael Brown",
        "Deacon Grace Adeyemi"
    ];

    const welcomeMessage = `Dear ${firstTimerData.name.split(' ')[0]},
We are glad you attended our service at GCCC Ibadan. Family is the core of what we stand for in GCCC, and we'd genuinely love for you to become a part of our community. 
We look forward to having you around again. 
Here's a little detail about our meeting days:
At Glory Centre Community Church Ibadan, we meet by 5:30 pm on Tuesdays and Fridays, and 8:00 am on Sundays. 
You can also be a part of our online community.
Connect with us on; 
Instagram: https://instagram.com/gcccibadan 
Facebook: https://m.facebook.com/GCCCIBADAN
Mixlr: https://gcccibadan.mixlr.com/ 
YouTube: https://www.youtube.com/@Gccc_Ibadan
Telegram: https://t.me/Pastoropeyemipeter to access life transforming messages. 
We will keep sharing content that we hope will bless and encourage you. Hope to see you again soon! 
Have a wonderful day. Cheers!🥂
Regards,
GCCC IBADAN`;

    const whatsappMessage = encodeURIComponent(welcomeMessage);
    const whatsappLink = `https://wa.me/${firstTimerData.phone_number}?text=${whatsappMessage}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(welcomeMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sendWelcomeEmail = () => {
        window.location.href = `mailto:${firstTimerData.email}?subject=Welcome to GCCC Ibadan&body=${encodeURIComponent(welcomeMessage)}`;
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this first timer record?')) {
            console.log('Delete record:', firstTimerData.id);
        }
    };

    const InfoField = ({ icon: Icon, label, value, fullWidth = false, isEmail = false, isPhone = false }) => (
        <div className={`${fullWidth ? 'col-span-2' : ''}`}>
            <div className="flex items-start gap-2 mb-1">
                <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {label}
                </span>
            </div>
            {isEmail ? (
                <a href={`mailto:${value}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 ml-6 hover:underline">
                    {value || 'N/A'}
                </a>
            ) : isPhone ? (
                <a href={`tel:${value}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 ml-6 hover:underline">
                    {value || 'N/A'}
                </a>
            ) : (
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 ml-6">
                    {value || 'N/A'}
                </p>
            )}
        </div>
    );

    const SectionCard = ({ title, icon: Icon, children, onEdit }) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                    <EditIcon className="w-4 h-4" />
                    Edit
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {firstTimerData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {firstTimerData.name}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {firstTimerData.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge color={firstTimerData.follow_up_status.color} >{firstTimerData.follow_up_status.title}</Badge>
                    </div>
                </div>
            </div>

            {/* Action Toolbox - Collapsible */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-sm border border-indigo-200 dark:border-gray-700 overflow-hidden">
                {/* Toolbox Header */}
                <button
                    onClick={() => setToolboxOpen(!toolboxOpen)}
                    className="w-full p-6 flex items-center justify-between hover:bg-indigo-100/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                            <ToolboxIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Action Toolbox</h2>
                    </div>
                    {toolboxOpen ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                </button>

                {/* Toolbox Content */}
                {toolboxOpen && (
                    <div className="p-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {/* Send Welcome Email */}
                            <button
                                onClick={sendWelcomeEmail}
                                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all group"
                            >
                                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                                    <SendIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Send Welcome Email</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Compose welcome message</p>
                                </div>
                            </button>

                            {/* WhatsApp Message */}
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all group"
                            >
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                                    <WhatsAppIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">WhatsApp Message</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Send via WhatsApp</p>
                                </div>
                            </a>

                            {/* Copy Message */}
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all group"
                            >
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                                    {copied ? (
                                        <CheckIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    ) : (
                                        <CopyIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {copied ? 'Copied!' : 'Copy Message'}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Copy welcome text</p>
                                </div>
                            </button>
                        </div>

                        {/* Welcome Message Preview */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <MessageSquareIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Welcome Message Preview</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                    {welcomeMessage}
                                </p>
                            </div>
                        </div>

                        {/* Status & Management Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Change Follow-up Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Change Follow-up Status
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Status</option>
                                        {statuses.map(status => (
                                            <option key={status.id} value={status.id}>{status.title}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Account Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Account Status
                                </label>
                                <div className="relative">
                                    <select
                                        value={accountStatus}
                                        onChange={(e) => setAccountStatus(e.target.value)}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Reassign Member */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Reassign to Member
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <select
                                            value={selectedMember}
                                            onChange={(e) => setSelectedMember(e.target.value)}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Member</option>
                                            {members.map(member => (
                                                <option key={member} value={member}>{member}</option>
                                            ))}
                                        </select>
                                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                    <button
                                        onClick={() => console.log('Reassign to:', selectedMember)}
                                        disabled={!selectedMember}
                                        className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
                                    >
                                        <UserPlusIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Delete Button */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
                            >
                                <TrashIcon className="w-5 h-5" />
                                Delete First Timer Record
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 space-y-6'>
                {/* Main Content Grid */}
                <div className="mx-auto space-y-6">
                    {/* Personal Information */}
                    <SectionCard title="Personal Information" icon={UserIcon} onEdit={() => console.log('Edit personal info')}>
                        <InfoField icon={UserIcon} label="Full Name" value={firstTimerData.name} fullWidth />
                        <InfoField icon={MailIcon} label="Email Address" value={firstTimerData.email} isEmail />
                        <InfoField icon={PhoneIcon} label="Phone Number" value={firstTimerData.phone_number} isPhone />
                        <InfoField icon={UserIcon} label="Gender" value={firstTimerData.gender} />
                        <InfoField icon={CalendarIcon} label="Date of Birth" value={firstTimerData.date_of_birth} />
                        <InfoField icon={BriefcaseIcon} label="Occupation" value={firstTimerData.occupation} />
                        <InfoField icon={BookOpenIcon} label="Student Status" value={firstTimerData.is_student ? 'Yes' : 'No'} />
                    </SectionCard>

                    {/* Location & Contact */}
                    <SectionCard title="Location & Contact" icon={MapPinIcon} onEdit={() => console.log('Edit location')}>
                        <InfoField icon={MapPinIcon} label="Address" value={firstTimerData.address} fullWidth />
                        <InfoField icon={MapPinIcon} label="Located in Ibadan" value={firstTimerData.located_in_ibadan ? 'Yes' : 'No'} />
                        <InfoField icon={MessageSquareIcon} label="WhatsApp Interest" value={firstTimerData.whatsapp_interest ? 'Yes' : 'No'} />
                    </SectionCard>

                    {/* Visit Information */}
                    <SectionCard title="Visit Information" icon={CalendarIcon} onEdit={() => console.log('Edit visit info')}>
                        <InfoField icon={CalendarIcon} label="Date of Visit" value={new Date(firstTimerData.date_of_visit).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                        <InfoField icon={UsersIcon} label="Invited By" value={firstTimerData.invited_by} />
                        <InfoField icon={UsersIcon} label="Friend/Family" value={firstTimerData.friend_family} />
                        <InfoField icon={BookOpenIcon} label="How Did You Learn" value={firstTimerData.how_did_you_learn} />
                        <InfoField icon={HeartIcon} label="Service Experience" value={firstTimerData.service_experience} fullWidth />
                    </SectionCard>

                    {/* Spiritual Information */}
                    <SectionCard title="Spiritual Information" icon={HeartIcon} onEdit={() => console.log('Edit spiritual info')}>
                        <InfoField icon={HeartIcon} label="Born Again" value={firstTimerData.born_again} />
                        <InfoField icon={BookOpenIcon} label="Interest" value={firstTimerData.interest} />
                        <InfoField icon={MessageSquareIcon} label="Prayer Point" value={firstTimerData.prayer_point} fullWidth />
                    </SectionCard>

                    {/* Follow-up Details */}
                    <SectionCard title="Follow-up Details" icon={UserCheckIcon} onEdit={() => console.log('Edit follow-up')}>
                        <InfoField icon={CalendarIcon} label="Assigned At" value={new Date(firstTimerData.assigned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                        <InfoField icon={UserCheckIcon} label="Assigned To" value={firstTimerData.assigned_to_member} />
                        <InfoField icon={ClipboardListIcon} label="Week Ending" value={new Date(firstTimerData.week_ending).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                        <InfoField icon={PhoneIcon} label="Pastorate Call" value={firstTimerData.pastorate_call} />
                        <InfoField icon={ClipboardListIcon} label="Visitation Report" value={firstTimerData.visitation_report} fullWidth />
                    </SectionCard>

                    {/* Notes & Additional Information */}
                    <SectionCard title="Notes & Additional Information" icon={ClipboardListIcon} onEdit={() => console.log('Edit notes')}>
                        <div className="col-span-2">
                            <div className="flex items-start gap-2 mb-2">
                                <MessageSquareIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Notes
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                {firstTimerData.notes}
                            </p>
                        </div>
                        <InfoField icon={CalendarIcon} label="Created At" value={new Date(firstTimerData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                        <InfoField icon={CalendarIcon} label="Updated At" value={new Date(firstTimerData.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                    </SectionCard>
                </div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, architecto minima! Saepe cum reiciendis aspernatur rem in, qui facere quas.</div>
            </div>
        </div>
    );
};

export default FirstTimerProfile;