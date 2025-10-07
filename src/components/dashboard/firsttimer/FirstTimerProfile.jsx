import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    UserCheck,
    ClipboardList,
    MessageSquare,
    Users,
    Heart,
    BookOpen,
    Edit,
    Send,
    Copy,
    Check,
    ChevronDown,
    UserPlus,
} from '@/icons';
import { useFirstTimerActions } from '@/queries/firstTimer.query';
import { FirstTimerProfileSkeleton } from '@/components/skeleton';

const FirstTimerProfile = ({ initialData = null }) => {
    const defaultData = {
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
        status: "active", // used for Active/Inactive dropdown
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

    const firstTimerData = initialData ?? defaultData;

    // local UI state
    const [copied, setCopied] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(''); // for change follow-up status select
    const [selectedMember, setSelectedMember] = useState('');
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const [activeState, setActiveState] = useState(firstTimerData.status === 'active' ? 'Active' : 'Inactive');

    // statuses for follow-up (same as your original)
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

    // Welcome message (preserved from your original)
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

    // TanStack Query hook for API actions (mutations). See hook code below.
    const { updateFollowUpStatus, updateActiveState, deleteFirstTimer } = useFirstTimerActions();

    // small helpers
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(welcomeMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed', err);
            alert('Failed to copy to clipboard');
        }
    };

    const sendWelcomeEmail = () => {
        window.location.href = `mailto:${firstTimerData.email}?subject=Welcome to GCCC Ibadan&body=${encodeURIComponent(welcomeMessage)}`;
    };

    // handlers which call the mutations
    const handleActiveChange = async (e) => {
        const value = e.target.value;
        setActiveState(value);
        try {
            // mutate: here we send boolean is_active (adjust the payload endpoint to match your backend)
            await updateActiveState.mutateAsync({ id: firstTimerData.id, is_active: value === 'Active' });
            alert('Active state updated');
        } catch (err) {
            console.error(err);
            alert('Failed to update active state');
            // revert (best-effort)
            setActiveState(firstTimerData.status === 'active' ? 'Active' : 'Inactive');
        }
    };

    const handleFollowUpChange = async (e) => {
        const selectedId = parseInt(e.target.value, 10);
        setSelectedStatus(e.target.value);
        try {
            await updateFollowUpStatus.mutateAsync({ id: firstTimerData.id, follow_up_status_id: selectedId });
            alert('Follow-up status updated');
        } catch (err) {
            console.error(err);
            alert('Failed to update follow-up status');
            // optional: revert by clearing selection or resetting to current
            setSelectedStatus('');
        }
    };

    const handleAssign = () => {
        if (!selectedMember) return;
        // wire this to an API call if you have one. For now just console log.
        console.log('Assigning to', selectedMember);
        alert(`Assigned to ${selectedMember} (demo)`);
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this first timer? This action cannot be undone.')) return;
        try {
            await deleteFirstTimer.mutateAsync(firstTimerData.id);
            alert('First timer deleted');
            // optionally redirect or update UI here
        } catch (err) {
            console.error(err);
            alert('Failed to delete first timer');
        }
    };

    // Small presentational subcomponents (kept from your original code)
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
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
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
                    <Edit className="w-4 h-4" />
                    Edit
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>
        </div>
    );

    const StatusBadge = ({ status }) => {
        const colors = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
            error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status.color] || colors.active}`}>
                {status.title}
            </span>
        );
    };

    // if (true) return <FirstTimerProfileSkeleton />

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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
                        <StatusBadge status={firstTimerData.follow_up_status} />
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-sm border border-indigo-200 dark:border-gray-700 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <ClipboardList className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Action Toolbox</h2>

                    <div className="ml-auto flex items-center gap-3">
                        {/* Active / Inactive dropdown in toolbox header */}
                        <select
                            value={activeState}
                            onChange={handleActiveChange}
                            disabled={updateActiveState?.isLoading}
                            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        {/* Delete button */}
                        <button
                            onClick={handleDelete}
                            disabled={deleteFirstTimer?.isLoading}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-60 hover:bg-red-700 transition-colors"
                        >
                            {deleteFirstTimer?.isLoading ? 'Deleting...' : 'Delete'}
                        </button>

                        {/* collapse toggle */}
                        <button
                            onClick={() => setIsToolboxOpen(open => !open)}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                            aria-expanded={isToolboxOpen}
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isToolboxOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Collapsible area content */}
                <div className={`overflow-hidden transition-all duration-500 ${isToolboxOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Send Welcome Email */}
                        <button
                            onClick={sendWelcomeEmail}
                            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all group"
                        >
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                                <Send className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    {/* WhatsApp path (kept inline) */}
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
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
                                    <Check className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                ) : (
                                    <Copy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
                    <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Welcome Message Preview</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                {welcomeMessage}
                            </p>
                        </div>
                    </div>

                    {/* Status & Assignment Controls (kept where you had them) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {/* Change Follow-up Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Change Follow-up Status
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={handleFollowUpChange}
                                    disabled={updateFollowUpStatus?.isLoading}
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer"
                                >
                                    <option value="">Select Status</option>
                                    {statuses.map(status => (
                                        <option key={status.id} value={status.id}>{status.title}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                <button
                                    onClick={handleAssign}
                                    disabled={!selectedMember}
                                    className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Assign
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end collapsible area */}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='space-y-6'>
                    {/* Personal Information */}
                    <SectionCard title="Personal Information" icon={User} onEdit={() => console.log('Edit personal info')}>
                        <InfoField icon={User} label="Full Name" value={firstTimerData.name} fullWidth />
                        <InfoField icon={Mail} label="Email Address" value={firstTimerData.email} isEmail />
                        <InfoField icon={Phone} label="Phone Number" value={firstTimerData.phone_number} isPhone />
                        <InfoField icon={User} label="Gender" value={firstTimerData.gender} />
                        <InfoField icon={Calendar} label="Date of Birth" value={firstTimerData.date_of_birth} />
                        <InfoField icon={Briefcase} label="Occupation" value={firstTimerData.occupation} />
                        <InfoField icon={BookOpen} label="Student Status" value={firstTimerData.is_student ? 'Yes' : 'No'} />
                    </SectionCard>

                    {/* Location & Contact */}
                    <SectionCard title="Location & Contact" icon={MapPin} onEdit={() => console.log('Edit location')}>
                        <InfoField icon={MapPin} label="Address" value={firstTimerData.address} fullWidth />
                        <InfoField icon={MapPin} label="Located in Ibadan" value={firstTimerData.located_in_ibadan ? 'Yes' : 'No'} />
                        <InfoField icon={MessageSquare} label="WhatsApp Interest" value={firstTimerData.whatsapp_interest ? 'Yes' : 'No'} />
                    </SectionCard>

                    {/* Visit Information */}
                    <SectionCard title="Visit Information" icon={Calendar} onEdit={() => console.log('Edit visit info')}>
                        <InfoField icon={Calendar} label="Date of Visit" value={new Date(firstTimerData.date_of_visit).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                        <InfoField icon={Users} label="Invited By" value={firstTimerData.invited_by} />
                        <InfoField icon={Users} label="Friend/Family" value={firstTimerData.friend_family} />
                        <InfoField icon={BookOpen} label="How Did You Learn" value={firstTimerData.how_did_you_learn} />
                        <InfoField icon={Heart} label="Service Experience" value={firstTimerData.service_experience} fullWidth />
                    </SectionCard>

                    {/* Spiritual Information */}
                    <SectionCard title="Spiritual Information" icon={Heart} onEdit={() => console.log('Edit spiritual info')}>
                        <InfoField icon={Heart} label="Born Again" value={firstTimerData.born_again} />
                        <InfoField icon={BookOpen} label="Interest" value={firstTimerData.interest} />
                        <InfoField icon={MessageSquare} label="Prayer Point" value={firstTimerData.prayer_point} fullWidth />
                    </SectionCard>

                    {/* Follow-up Details */}
                    <SectionCard title="Follow-up Details" icon={UserCheck} onEdit={() => console.log('Edit follow-up')}>
                        <InfoField icon={Calendar} label="Assigned At" value={new Date(firstTimerData.assigned_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                        <InfoField icon={UserCheck} label="Assigned To" value={firstTimerData.assigned_to_member} />
                        <InfoField icon={ClipboardList} label="Week Ending" value={new Date(firstTimerData.week_ending).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                        <InfoField icon={Phone} label="Pastorate Call" value={firstTimerData.pastorate_call} />
                        <InfoField icon={ClipboardList} label="Visitation Report" value={firstTimerData.visitation_report} fullWidth />
                    </SectionCard>

                    {/* Notes & Additional Information */}
                    <SectionCard title="Notes & Additional Information" icon={ClipboardList} onEdit={() => console.log('Edit notes')}>
                        <div className="col-span-2">
                            <div className="flex items-start gap-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Notes
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                {firstTimerData.notes}
                            </p>
                        </div>
                        <InfoField icon={Calendar} label="Created At" value={new Date(firstTimerData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                        <InfoField icon={Calendar} label="Updated At" value={new Date(firstTimerData.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                    </SectionCard>
                </div>
                <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae accusamus laborum error culpa vel repellat tempora harum velit quasi esse.</div>
            </div>

        </div>
    );
};
export default FirstTimerProfile;
