export const UserRole = Object.freeze({
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  LEADER: 'leader',
  MEMBER: 'member',
  FIRST_TIMER: 'first_timer',
});

export const Units = {
  PRAYER_WORSHIP: 'Prayer Worship',
  MEDIA: 'Media',
  FOLLOW_UP: 'Follow Up',
  WELFARE: 'Welfare',
  CHILDREN: 'Children',
  SOUND: 'Sound',
  SANITATION: 'Sanitation',
  USHERING: 'Ushering',
  FSP: 'FSP',
};

export const LoadingStates = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const Image = 'https://i.pravatar.cc/400?img=59';

export const years = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
];

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const followupCommentTypes = [
  'Pre-Service',
  'Post-Service',
  'Admin',
  'Pastor',
  'Unit-Leader',
  'Others',
];
export const textColors = [
  'text-red-500',
  'text-orange-500',
  'text-amber-500',
  'text-yellow-500',
  'text-lime-500',
  'text-green-500',
  'text-emerald-500',
  'text-teal-500',
  'text-cyan-500',
  'text-sky-500',
  'text-blue-500',
  'text-indigo-500',
  'text-violet-500',
  'text-purple-500',
  'text-fuchsia-500',
  'text-pink-500',
  'text-rose-500',
];
export const GLASSMORPHISM_THEMES = [
  {
    name: 'Sunset Orange',
    // icon: Sun,
    gradient:
      'from-orange-500 via-red-500 to-pink-500 dark:from-orange-600 dark:via-red-600 dark:to-pink-600',
    cardBg:
      'bg-gradient-to-br from-orange-100/40 via-red-100/30 to-pink-100/40 dark:from-orange-500/20 dark:via-red-500/15 dark:to-pink-500/20',
    glassOverlay:
      'bg-gradient-to-br from-orange-200/50 via-red-200/30 to-transparent dark:from-orange-400/30 dark:via-red-400/20 dark:to-transparent',
    accentLine:
      'from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400',
    leaderBg:
      'bg-orange-200/30 border-orange-300/40 hover:bg-orange-200/50 dark:bg-orange-500/10 dark:border-orange-400/20 dark:hover:bg-orange-500/20',
    assistantBg:
      'bg-red-200/30 border-red-300/40 hover:bg-red-200/50 dark:bg-red-500/10 dark:border-red-400/20 dark:hover:bg-red-500/20',
    membersBg:
      'bg-gradient-to-r from-red-200/30 to-pink-200/30 border-orange-300/40 dark:from-red-500/20 dark:to-pink-500/20 dark:border-orange-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Royal Purple',
    // icon: Crown,
    gradient:
      'from-purple-500 via-indigo-500 to-blue-500 dark:from-purple-600 dark:via-indigo-600 dark:to-blue-600',
    cardBg:
      'bg-gradient-to-br from-purple-100/40 via-indigo-100/30 to-blue-100/40 dark:from-purple-500/20 dark:via-indigo-500/15 dark:to-blue-500/20',
    glassOverlay:
      'bg-gradient-to-br from-purple-200/50 via-indigo-200/30 to-transparent dark:from-purple-400/30 dark:via-indigo-400/20 dark:to-transparent',
    accentLine:
      'from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400',
    leaderBg:
      'bg-purple-200/30 border-purple-300/40 hover:bg-purple-200/50 dark:bg-purple-500/10 dark:border-purple-400/20 dark:hover:bg-purple-500/20',
    assistantBg:
      'bg-indigo-200/30 border-indigo-300/40 hover:bg-indigo-200/50 dark:bg-indigo-500/10 dark:border-indigo-400/20 dark:hover:bg-indigo-500/20',
    membersBg:
      'bg-gradient-to-r from-indigo-200/30 to-blue-200/30 border-purple-300/40 dark:from-indigo-500/20 dark:to-blue-500/20 dark:border-purple-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Ocean Teal',
    // icon: Droplets,
    gradient:
      'from-green-500 via-teal-500 to-cyan-500 dark:from-green-600 dark:via-teal-600 dark:to-cyan-600',
    cardBg:
      'bg-gradient-to-br from-green-100/40 via-teal-100/30 to-cyan-100/40 dark:from-green-500/20 dark:via-teal-500/15 dark:to-cyan-500/20',
    glassOverlay:
      'bg-gradient-to-br from-green-200/50 via-teal-200/30 to-transparent dark:from-green-400/30 dark:via-teal-400/20 dark:to-transparent',
    accentLine:
      'from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400',
    leaderBg:
      'bg-green-200/30 border-green-300/40 hover:bg-green-200/50 dark:bg-green-500/10 dark:border-green-400/20 dark:hover:bg-green-500/20',
    assistantBg:
      'bg-teal-200/30 border-teal-300/40 hover:bg-teal-200/50 dark:bg-teal-500/10 dark:border-teal-400/20 dark:hover:bg-teal-500/20',
    membersBg:
      'bg-gradient-to-r from-teal-200/30 to-cyan-200/30 border-green-300/40 dark:from-teal-500/20 dark:to-cyan-500/20 dark:border-green-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Golden Yellow',
    // icon: Star,
    gradient:
      'from-yellow-500 via-amber-500 to-orange-500 dark:from-yellow-600 dark:via-amber-600 dark:to-orange-600',
    cardBg:
      'bg-gradient-to-br from-yellow-100/40 via-amber-100/30 to-orange-100/40 dark:from-yellow-500/20 dark:via-amber-500/15 dark:to-orange-500/20',
    glassOverlay:
      'bg-gradient-to-br from-yellow-200/50 via-amber-200/30 to-transparent dark:from-yellow-400/30 dark:via-amber-400/20 dark:to-transparent',
    accentLine:
      'from-yellow-500 to-amber-500 dark:from-yellow-400 dark:to-amber-400',
    leaderBg:
      'bg-yellow-200/30 border-yellow-300/40 hover:bg-yellow-200/50 dark:bg-yellow-500/10 dark:border-yellow-400/20 dark:hover:bg-yellow-500/20',
    assistantBg:
      'bg-amber-200/30 border-amber-300/40 hover:bg-amber-200/50 dark:bg-amber-500/10 dark:border-amber-400/20 dark:hover:bg-amber-500/20',
    membersBg:
      'bg-gradient-to-r from-amber-200/30 to-orange-200/30 border-yellow-300/40 dark:from-amber-500/20 dark:to-orange-500/20 dark:border-yellow-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Arctic Blue',
    //icon: Heart,
    gradient:
      'from-blue-500 via-sky-500 to-cyan-500 dark:from-blue-600 dark:via-sky-600 dark:to-cyan-600',
    cardBg:
      'bg-gradient-to-br from-blue-100/40 via-sky-100/30 to-cyan-100/40 dark:from-blue-500/20 dark:via-sky-500/15 dark:to-cyan-500/20',
    glassOverlay:
      'bg-gradient-to-br from-blue-200/50 via-sky-200/30 to-transparent dark:from-blue-400/30 dark:via-sky-400/20 dark:to-transparent',
    accentLine: 'from-blue-500 to-sky-500 dark:from-blue-400 dark:to-sky-400',
    leaderBg:
      'bg-blue-200/30 border-blue-300/40 hover:bg-blue-200/50 dark:bg-blue-500/10 dark:border-blue-400/20 dark:hover:bg-blue-500/20',
    assistantBg:
      'bg-sky-200/30 border-sky-300/40 hover:bg-sky-200/50 dark:bg-sky-500/10 dark:border-sky-400/20 dark:hover:bg-sky-500/20',
    membersBg:
      'bg-gradient-to-r from-sky-200/30 to-cyan-200/30 border-blue-300/40 dark:from-sky-500/20 dark:to-cyan-500/20 dark:border-blue-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Electric Pink',
    //icon: Zap,
    gradient:
      'from-pink-500 via-fuchsia-500 to-purple-500 dark:from-pink-600 dark:via-fuchsia-600 dark:to-purple-600',
    cardBg:
      'bg-gradient-to-br from-pink-100/40 via-fuchsia-100/30 to-purple-100/40 dark:from-pink-500/20 dark:via-fuchsia-500/15 dark:to-purple-500/20',
    glassOverlay:
      'bg-gradient-to-br from-pink-200/50 via-fuchsia-200/30 to-transparent dark:from-pink-400/30 dark:via-fuchsia-400/20 dark:to-transparent',
    accentLine:
      'from-pink-500 to-fuchsia-500 dark:from-pink-400 dark:to-fuchsia-400',
    leaderBg:
      'bg-pink-200/30 border-pink-300/40 hover:bg-pink-200/50 dark:bg-pink-500/10 dark:border-pink-400/20 dark:hover:bg-pink-500/20',
    assistantBg:
      'bg-fuchsia-200/30 border-fuchsia-300/40 hover:bg-fuchsia-200/50 dark:bg-fuchsia-500/10 dark:border-fuchsia-400/20 dark:hover:bg-fuchsia-500/20',
    membersBg:
      'bg-gradient-to-r from-fuchsia-200/30 to-purple-200/30 border-pink-300/40 dark:from-fuchsia-500/20 dark:to-purple-500/20 dark:border-pink-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Emerald Green',
    //icon: Leaf,
    gradient:
      'from-emerald-500 via-green-500 to-lime-500 dark:from-emerald-600 dark:via-green-600 dark:to-lime-600',
    cardBg:
      'bg-gradient-to-br from-emerald-100/40 via-green-100/30 to-lime-100/40 dark:from-emerald-500/20 dark:via-green-500/15 dark:to-lime-500/20',
    glassOverlay:
      'bg-gradient-to-br from-emerald-200/50 via-green-200/30 to-transparent dark:from-emerald-400/30 dark:via-green-400/20 dark:to-transparent',
    accentLine:
      'from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400',
    leaderBg:
      'bg-emerald-200/30 border-emerald-300/40 hover:bg-emerald-200/50 dark:bg-emerald-500/10 dark:border-emerald-400/20 dark:hover:bg-emerald-500/20',
    assistantBg:
      'bg-green-200/30 border-green-300/40 hover:bg-green-200/50 dark:bg-green-500/10 dark:border-green-400/20 dark:hover:bg-green-500/20',
    membersBg:
      'bg-gradient-to-r from-green-200/30 to-lime-200/30 border-emerald-300/40 dark:from-green-500/20 dark:to-lime-500/20 dark:border-emerald-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Crimson Red',
    //  icon: Flame,
    gradient:
      'from-red-500 via-rose-500 to-pink-500 dark:from-red-600 dark:via-rose-600 dark:to-pink-600',
    cardBg:
      'bg-gradient-to-br from-red-100/40 via-rose-100/30 to-pink-100/40 dark:from-red-500/20 dark:via-rose-500/15 dark:to-pink-500/20',
    glassOverlay:
      'bg-gradient-to-br from-red-200/50 via-rose-200/30 to-transparent dark:from-red-400/30 dark:via-rose-400/20 dark:to-transparent',
    accentLine: 'from-red-500 to-rose-500 dark:from-red-400 dark:to-rose-400',
    leaderBg:
      'bg-red-200/30 border-red-300/40 hover:bg-red-200/50 dark:bg-red-500/10 dark:border-red-400/20 dark:hover:bg-red-500/20',
    assistantBg:
      'bg-rose-200/30 border-rose-300/40 hover:bg-rose-200/50 dark:bg-rose-500/10 dark:border-rose-400/20 dark:hover:bg-rose-500/20',
    membersBg:
      'bg-gradient-to-r from-rose-200/30 to-pink-200/30 border-red-300/40 dark:from-rose-500/20 dark:to-pink-500/20 dark:border-red-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Slate Gray',
    // icon: Music,
    gradient:
      'from-slate-500 via-gray-500 to-zinc-500 dark:from-slate-600 dark:via-gray-600 dark:to-zinc-600',
    cardBg:
      'bg-gradient-to-br from-slate-100/40 via-gray-100/30 to-zinc-100/40 dark:from-slate-500/20 dark:via-gray-500/15 dark:to-zinc-500/20',
    glassOverlay:
      'bg-gradient-to-br from-slate-200/50 via-gray-200/30 to-transparent dark:from-slate-400/30 dark:via-gray-400/20 dark:to-transparent',
    accentLine:
      'from-slate-500 to-gray-500 dark:from-slate-400 dark:to-gray-400',
    leaderBg:
      'bg-slate-200/30 border-slate-300/40 hover:bg-slate-200/50 dark:bg-slate-500/10 dark:border-slate-400/20 dark:hover:bg-slate-500/20',
    assistantBg:
      'bg-gray-200/30 border-gray-300/40 hover:bg-gray-200/50 dark:bg-gray-500/10 dark:border-gray-400/20 dark:hover:bg-gray-500/20',
    membersBg:
      'bg-gradient-to-r from-gray-200/30 to-zinc-200/30 border-slate-300/40 dark:from-gray-500/20 dark:to-zinc-500/20 dark:border-slate-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Deep Violet',
    // icon: Camera,
    gradient:
      'from-violet-500 via-purple-500 to-indigo-500 dark:from-violet-600 dark:via-purple-600 dark:to-indigo-600',
    cardBg:
      'bg-gradient-to-br from-violet-100/40 via-purple-100/30 to-indigo-100/40 dark:from-violet-500/20 dark:via-purple-500/15 dark:to-indigo-500/20',
    glassOverlay:
      'bg-gradient-to-br from-violet-200/50 via-purple-200/30 to-transparent dark:from-violet-400/30 dark:via-purple-400/20 dark:to-transparent',
    accentLine:
      'from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400',
    leaderBg:
      'bg-violet-200/30 border-violet-300/40 hover:bg-violet-200/50 dark:bg-violet-500/10 dark:border-violet-400/20 dark:hover:bg-violet-500/20',
    assistantBg:
      'bg-purple-200/30 border-purple-300/40 hover:bg-purple-200/50 dark:bg-purple-500/10 dark:border-purple-400/20 dark:hover:bg-purple-500/20',
    membersBg:
      'bg-gradient-to-r from-purple-200/30 to-indigo-200/30 border-violet-300/40 dark:from-purple-500/20 dark:to-indigo-500/20 dark:border-violet-400/20',
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-700 dark:text-gray-100',
    leaderLabel: 'text-yellow-600 dark:text-yellow-300',
    assistantLabel: 'text-blue-600 dark:text-blue-300',
  },
];

export const attendanceLevels = [
  {
    level: "The Sower's Seed", // Biblical title for foundation/start (0-25%)
    min: 0,
    max: 25,
    fromColor: '#f04438', // Cool Shade of Red (Starting phase/initial effort)
    toColor: '#f97066', // Lighter Red for gradient
    messages: [
      "Welcome back! Every journey starts with a single step. **Take it one service at a time**—we're excited to see you here!",
      "Ready to start strong? Making it to that **first service is the biggest win**. We're looking forward to worshipping with you.",
    ],
  },
  {
    level: "Faith's Foundation", // Biblical title for building/momentum (26-50%)
    min: 26,
    max: 50,
    fromColor: '#dc6803', // Warm Yellow/Orange (Building momentum)
    toColor: '#f79009', // Very Light Yellow for gradient
    messages: [
      "Great progress so far! You've found your rhythm. **Keep your momentum going, one service at a time.** Your consistency matters!",
      "Halfway to the point! You've shown great dedication this month. **Keep building that good habit** and prioritize the next service.",
    ],
  },
  {
    level: 'The Shining Lamp', // Biblical title for witness/consistency (51-75%)
    min: 51,
    max: 75,
    fromColor: '#3641f5',
    toColor: '#7592ff',
    messages: [
      "Fantastic! You've crushed more than half your goal. Don't slow down now—**finish strong, one service at a time!**",
      "You're in the home stretch! **This is where commitment pays off.** Keep showing up; your community is stronger because of your presence.",
    ],
  },
  {
    level: 'Finishing the Race',
    min: 76,
    max: 99,
    fromColor: '#039855',
    toColor: '#32d583',
    messages: [
      "You've almost hit your personal attendance goal for the month. **Take it one service at a time** — you've got this!",
      'Incredible dedication! You are just **one step away from meeting your monthly goal.** We celebrate your commitment to growing your faith!',
    ],
  },
  {
    level: 'The Good Steward', // Biblical title for 100% completion/mastery
    min: 100,
    max: 100,
    fromColor: '#6A0DAD', // Deep Purple/Violet (Celebratory, distinction)
    toColor: '#C3A6EE', // Lighter Purple for gradient
    messages: [
      "Mission accomplished! You've faithfully attended every service this month and met your goal. **Your dedication is a testament to your faith!**",
      "Congratulations! **100% attendance!** You've completed your goal. May the foundation you built this month carry you into the next.",
    ],
  },
];
