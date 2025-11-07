import { useState, useCallback, useMemo } from "react";
import MonthYearSelector from "@/components/common/MonthYearSelector";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { ChevronDownIcon2 } from "@/icons";
import { EmptyState } from "@/components/common/EmptyState";

// Constants
const PODIUM_CONFIG = {
    // Base heights for each position (ensures content always fits)
    BASE_HEIGHTS: {
        1: 175,  // Champion - tallest base
        2: 155,  // Runner-up
        3: 135,  // Third place
        4: 115   // Fourth place
    },
    MIN_SAFE_HEIGHT: 100  // Absolute minimum to prevent content overflow
};

const SCRIPTURE = {
    text: "I was glad when they said to me, `Let us go into the house of the LORD`",
    reference: "Psalm 122:1"
};

/**
 * Calculate dynamic podium height - Position-based with performance bonus
 * This ensures proper visual hierarchy where 1st is always tallest, 
 * with small height variations based on attendance percentage
 * 
 * @param {number} present - Number of services attended
 * @param {number} total - Total number of services
 * @param {number} position - Leaderboard position (1-4)
 * @returns {number} Calculated height in pixels
 */
const calculatePodiumHeight = (present, total, position = 1) => {
    // Get base height for this position (ensures proper hierarchy)
    const baseHeight = PODIUM_CONFIG.BASE_HEIGHTS[position] || PODIUM_CONFIG.BASE_HEIGHTS[4];

    // Final height = base height + small performance bonus
    const finalHeight = Math.round(baseHeight);

    // Ensure minimum safe height
    return Math.max(PODIUM_CONFIG.MIN_SAFE_HEIGHT, finalHeight);
};

/**
 * Position styling configuration with theme support
 */
const getPositionStyling = (position) => {
    const baseStyles = {
        avatarRing: '',
        badgeBg: '',
        badgeSize: 'w-5 h-5 text-xs',
        podiumBg: '',
        podiumBorder: '',
        podiumShadow: '',
        textColor: '',
        percentColor: '',
        showCrown: false,
        maxWidth: 'max-w-[120px]',
        hoverEffect: 'hover:scale-105 hover:shadow-xl'
    };

    const positionStyles = {
        1: {
            ...baseStyles,
            avatarRing: 'ring-4 ring-yellow-400 dark:ring-yellow-500',
            badgeBg: 'bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500 text-white',
            podiumBg: 'bg-gradient-to-b from-[#119bd6] to-[#0d7dad] dark:from-[#119bd6] dark:to-[#0a5f87]',
            podiumBorder: 'border-2 border-[#119bd6] dark:border-[#4ab8e8]',
            podiumShadow: 'shadow-xl shadow-[#119bd6]/20 dark:shadow-[#119bd6]/40',
            textColor: 'text-white',
            percentColor: 'text-yellow-300 dark:text-yellow-200',
            showCrown: true
        },
        2: {
            ...baseStyles,
            avatarRing: 'ring-4 ring-[#119bd6]/40 dark:ring-[#119bd6]/60',
            badgeBg: 'bg-gradient-to-br from-[#119bd6] to-[#0d7dad] text-white',
            podiumBg: 'bg-gradient-to-b from-[#119bd6]/25 to-[#119bd6]/35 dark:from-[#119bd6]/35 dark:to-[#119bd6]/45',
            podiumBorder: 'border-2 border-[#119bd6]/50 dark:border-[#119bd6]/70',
            podiumShadow: 'shadow-lg shadow-[#119bd6]/10 dark:shadow-[#119bd6]/30',
            textColor: 'text-gray-800 dark:text-gray-100',
            percentColor: 'text-[#119bd6] dark:text-[#4ab8e8]'
        },
        3: {
            ...baseStyles,
            avatarRing: 'ring-4 ring-[#119bd6]/30 dark:ring-[#119bd6]/50',
            badgeBg: 'bg-gradient-to-br from-[#119bd6]/90 to-[#0d7dad] text-white',
            podiumBg: 'bg-gradient-to-b from-[#119bd6]/15 to-[#119bd6]/25 dark:from-[#119bd6]/25 dark:to-[#119bd6]/35',
            podiumBorder: 'border-2 border-[#119bd6]/40 dark:border-[#119bd6]/60',
            podiumShadow: 'shadow-lg shadow-[#119bd6]/5 dark:shadow-[#119bd6]/20',
            textColor: 'text-gray-800 dark:text-gray-100',
            percentColor: 'text-[#119bd6] dark:text-[#4ab8e8]'
        },
        4: {
            ...baseStyles,
            avatarRing: 'ring-4 ring-gray-300 dark:ring-gray-600',
            badgeBg: 'bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600 text-white',
            podiumBg: 'bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
            podiumBorder: 'border-2 border-gray-300 dark:border-gray-600',
            podiumShadow: 'shadow-md shadow-gray-200 dark:shadow-gray-900/50',
            textColor: 'text-gray-800 dark:text-gray-100',
            percentColor: 'text-gray-600 dark:text-gray-300'
        }
    };

    return positionStyles[position] || positionStyles[4];
};

/**
 * Trophy Icon Component
 */
const TrophyIcon = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <path d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 19H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.8 3H16.2C16.48 3 16.62 3 16.727 3.0545C16.8211 3.10243 16.8976 3.17892 16.9455 3.273C17 3.38 17 3.52 17 3.8V8.2C17 8.48 17 8.62 16.9455 8.727C16.8976 8.82108 16.8211 8.89757 16.727 8.9455C16.62 9 16.48 9 16.2 9H7.8C7.52 9 7.38 9 7.273 8.9455C7.17892 8.89757 7.10243 8.82108 7.0545 8.727C7 8.62 7 8.48 7 8.2V3.8C7 3.52 7 3.38 7.0545 3.273C7.10243 3.17892 7.17892 3.10243 7.273 3.0545C7.38 3 7.52 3 7.8 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 5H4C3.46957 5 2.96086 5.21071 2.58579 5.58579C2.21071 5.96086 2 6.46957 2 7C2 7.53043 2.21071 8.03914 2.58579 8.41421C2.96086 8.78929 3.46957 9 4 9H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7C22 7.53043 21.7893 8.03914 21.4142 8.41421C21.0391 8.78929 20.5304 9 20 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/**
 * Crown Icon Component
 */
const CrownIcon = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <path d="M2 19H22L20 8L15 12L12 4L9 12L4 8L2 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 4L9 12L4 8L2 19H22L20 8L15 12L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/**
 * Leaderboard Header Component
 */
const LeaderboardHeader = ({ monthAndYear, handleDateChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeDropdown = useCallback(() => setIsOpen(false), []);
    const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);

    const handleDateChangeWrapper = useCallback((value) => {
        handleDateChange(value);
        closeDropdown();
    }, [handleDateChange, closeDropdown]);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2">
                    <TrophyIcon size={24} className="text-[#119bd6] shrink-0" />
                    <span>Top Attendees</span>
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    {SCRIPTURE.text} - <span className="text-[#119bd6] dark:text-[#4ab8e8] font-semibold">{SCRIPTURE.reference}</span>
                </p>
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    aria-label="Select month and year"
                    aria-expanded={isOpen}
                >
                    <Badge
                        endIcon={
                            <ChevronDownIcon2
                                className={`h-5 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            />
                        }
                        color="primary"
                    >
                        {monthAndYear}
                    </Badge>
                </button>

                <Dropdown
                    onClose={closeDropdown}
                    isOpen={isOpen}
                    className="w-60 p-2 mt-2 shadow-xl"
                >
                    <MonthYearSelector onChange={handleDateChangeWrapper} />
                </Dropdown>
            </div>
        </div>
    );
};

/**
 * Podium Member Component
 */
const PodiumMember = ({ member }) => {
    const styling = useMemo(() => getPositionStyling(member.position), [member.position]);
    const podiumHeight = useMemo(
        () => calculatePodiumHeight(member.present, member.total_services, member.position),
        [member.present, member.total_services, member.position]
    );

    return (
        <div className={`flex flex-col items-center flex-1 ${styling.maxWidth}`}>
            {/* Crown for champion */}
            {styling.showCrown && (
                <div className="mb-1 animate-bounce" style={{ animationDuration: '2s' }}>
                    <CrownIcon size={32} className="text-yellow-500 dark:text-yellow-400 drop-shadow-lg" />
                </div>
            )}

            {/* Avatar */}
            <div className="mb-3 relative">
                <Avatar
                    src={member?.avatar}
                    name={member?.initials}
                    size='md'
                    shape="circle"
                    className={`${styling.avatarRing} transition-all duration-300 ${styling.hoverEffect}`}
                />
                {member.position === 1 && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                        <span className="text-xs">🏆</span>
                    </div>
                )}
            </div>

            {/* Podium */}
            <div
                className={`
          ${styling.podiumBg} 
          ${styling.podiumBorder} 
          ${styling.podiumShadow}
          rounded-t-xl sm:rounded-t-2xl 
          p-3 sm:p-4
          w-full 
          flex flex-col items-center justify-end
          transition-all duration-300 
          ${styling.hoverEffect}
          relative
        `}
                style={{ height: `${podiumHeight}px` }}
            >
                {/* Position Badge */}
                <div
                    className={`
            absolute -top-3 left-1/2 -translate-x-1/2 
            ${styling.badgeBg} 
            ${styling.badgeSize}
            rounded-full 
            flex items-center justify-center 
            font-bold 
            shadow-lg
            ring-2 ring-white dark:ring-gray-800
            transition-transform duration-300 hover:scale-110
            z-20
          `}
                >
                    {member.position}
                </div>

                {/* Shine effect for first place */}
                {member.position === 1 && (
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
                )}

                {/* Content - Always at bottom with proper spacing */}
                <div className="text-center w-full space-y-1 relative z-10">
                    <p className={`text-[10px] sm:text-xs font-semibold ${styling.textColor} leading-tight line-clamp-2 wrap-break-word px-1`}>
                        {member.full_name}
                    </p>
                    <p className={`text-xl sm:text-2xl font-bold ${styling.percentColor} tabular-nums`}>
                        {member?.attendance_percentage ?? 0}%
                    </p>
                    <p className={`text-[10px] sm:text-xs ${member.position === 1 ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'} tabular-nums`}>
                        {member.present}/{member.total_services}
                    </p>
                </div>
            </div>
        </div>
    );
};

/**
 * Main Attendance Leaderboard Component
 */
const AttendanceLeaderboard = ({ topAttendees = [], monthAndYear, handleDateChange }) => {
    // Reorder for podium display (2nd, 1st, 3rd, 4th) for visual hierarchy
    const podiumOrder = useMemo(() => {
        if (!topAttendees || topAttendees.length === 0) return [];
        return [
            topAttendees[1], // 2nd place (left)
            topAttendees[0], // 1st place (center)
            topAttendees[2], // 3rd place (right)
            topAttendees[3]  // 4th place (far right)
        ].filter(Boolean); // Remove undefined entries
    }, [topAttendees]);

    if (!podiumOrder.length) {
        return (
            <div className="w-full space-y-5 pt-5 pb-10 px-4 sm:px-6">
                <LeaderboardHeader monthAndYear={monthAndYear} handleDateChange={handleDateChange} />
                <EmptyState description="No attendance data available for this period." />
            </div>
        );
    }

    return (
        <div className="w-full space-y-5 pt-5 pb-10 px-4 sm:px-6">
            <LeaderboardHeader monthAndYear={monthAndYear} handleDateChange={handleDateChange} />

            {/* Podium Section */}
            <div className="flex items-end justify-center gap-2 sm:gap-3">
                {podiumOrder.map((member) => (
                    <PodiumMember key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};

export default AttendanceLeaderboard;