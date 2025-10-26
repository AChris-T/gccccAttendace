import React, { useState } from 'react';

const ProfileCompletionBanner = ({ completion_percent }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const getColorScheme = (percent) => {
        if (percent >= 80) {
            return {
                gradient: 'from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950/20 dark:to-green-950/20',
                border: 'border-emerald-100 dark:border-emerald-900/30',
                orb1: 'bg-emerald-300/20 dark:bg-emerald-500/10',
                orb2: 'bg-green-300/20 dark:bg-green-500/10',
                badge: 'bg-emerald-100 dark:bg-emerald-900/40',
                badgeText: 'text-emerald-700 dark:text-emerald-300',
                badgeDot: 'bg-emerald-500 dark:bg-emerald-400',
                title: 'text-gray-900 dark:text-white',
                link: 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300',
                closeBtn: 'border-emerald-200 dark:border-emerald-800/50',
                closeIcon: 'text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300',
                circleTrack: 'stroke-emerald-100 dark:stroke-emerald-900/40',
                circleFill: 'stroke-emerald-500 dark:stroke-emerald-400',
                percentText: 'text-emerald-600 dark:text-emerald-400',
                label: 'Almost There!'
            };
        } else if (percent >= 50) {
            return {
                gradient: 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/20',
                border: 'border-blue-100 dark:border-blue-900/30',
                orb1: 'bg-blue-300/20 dark:bg-blue-500/10',
                orb2: 'bg-indigo-300/20 dark:bg-indigo-500/10',
                badge: 'bg-blue-100 dark:bg-blue-900/40',
                badgeText: 'text-blue-700 dark:text-blue-300',
                badgeDot: 'bg-blue-500 dark:bg-blue-400',
                title: 'text-gray-900 dark:text-white',
                link: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
                closeBtn: 'border-blue-200 dark:border-blue-800/50',
                closeIcon: 'text-blue-500 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300',
                circleTrack: 'stroke-blue-100 dark:stroke-blue-900/40',
                circleFill: 'stroke-blue-500 dark:stroke-blue-400',
                percentText: 'text-blue-600 dark:text-blue-400',
                label: 'Keep Going!'
            };
        } else if (percent >= 25) {
            return {
                gradient: 'from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950/20 dark:to-orange-950/20',
                border: 'border-amber-100 dark:border-amber-900/30',
                orb1: 'bg-amber-300/20 dark:bg-amber-500/10',
                orb2: 'bg-orange-300/20 dark:bg-orange-500/10',
                badge: 'bg-amber-100 dark:bg-amber-900/40',
                badgeText: 'text-amber-700 dark:text-amber-300',
                badgeDot: 'bg-amber-500 dark:bg-amber-400',
                title: 'text-gray-900 dark:text-white',
                link: 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300',
                closeBtn: 'border-amber-200 dark:border-amber-800/50',
                closeIcon: 'text-amber-500 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300',
                circleTrack: 'stroke-amber-100 dark:stroke-amber-900/40',
                circleFill: 'stroke-amber-500 dark:stroke-amber-400',
                percentText: 'text-amber-600 dark:text-amber-400',
                label: 'Good Start!'
            };
        } else {
            return {
                gradient: 'from-red-50 via-rose-50 to-pink-50 dark:from-gray-900 dark:via-red-950/20 dark:to-rose-950/20',
                border: 'border-red-100 dark:border-red-900/30',
                orb1: 'bg-red-300/20 dark:bg-red-500/10',
                orb2: 'bg-rose-300/20 dark:bg-rose-500/10',
                badge: 'bg-red-100 dark:bg-red-900/40',
                badgeText: 'text-red-700 dark:text-red-300',
                badgeDot: 'bg-red-500 dark:bg-red-400',
                title: 'text-gray-900 dark:text-white',
                link: 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300',
                closeBtn: 'border-red-200 dark:border-red-800/50',
                closeIcon: 'text-red-500 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300',
                circleTrack: 'stroke-red-100 dark:stroke-red-900/40',
                circleFill: 'stroke-red-500 dark:stroke-red-400',
                percentText: 'text-red-600 dark:text-red-400',
                label: 'Get Started!'
            };
        }
    };

    const colors = getColorScheme(completion_percent);
    const circumference = 2 * Math.PI * 36;
    const strokeDashoffset = circumference - (completion_percent / 100) * circumference;

    return (
        <div className={`w-full mb-5 rounded-2xl bg-gradient-to-r ${colors.gradient} border-b ${colors.border} overflow-hidden relative shadow-sm`}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-24 -left-24 w-48 h-48 ${colors.orb1} rounded-full blur-3xl animate-pulse`}></div>
                <div className={`absolute -bottom-24 -right-24 w-48 h-48 ${colors.orb2} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="px-4 sm:px-6 py-4 sm:py-5 relative">
                <div className="flex md:hidden flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="relative flex-shrink-0 animate-fadeIn">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="36" className={colors.circleTrack} strokeWidth="6" fill="none" />
                                <circle cx="40" cy="40" r="36" className={`${colors.circleFill} transition-all duration-1000 ease-out`} strokeWidth="6" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-xl font-bold ${colors.percentText}`}>{completion_percent}%</span>
                            </div>
                        </div>
                        <button onClick={() => setIsVisible(false)} className={`flex-shrink-0 p-2 rounded-lg bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border ${colors.closeBtn} shadow-sm hover:shadow transition-all duration-300 hover:rotate-90 group`} aria-label="Dismiss">
                            <svg className={`w-5 h-5 ${colors.closeIcon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-2 animate-slideInLeft">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`text-lg font-bold ${colors.title}`}>Complete Your Profile</h3>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 ${colors.badge} rounded-full`}>
                                <div className={`w-1.5 h-1.5 ${colors.badgeDot} rounded-full animate-ping`}></div>
                                <div className={`absolute w-1.5 h-1.5 ${colors.badgeDot} rounded-full`}></div>
                                <span className={`text-xs font-medium ${colors.badgeText} ml-1`}>{colors.label}</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">You’ve made a wonderful start! Share a few more details so we can stay connected and serve you better as part of the GCCC family.</p>
                        <a href="/dashboard/profile" className={`inline-flex items-center gap-1 underline text-sm font-medium ${colors.link} transition-colors duration-200`}>
                            Go to Profile
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="hidden md:flex items-start justify-between gap-6">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                        <div className="relative flex-shrink-0 animate-fadeIn">
                            <svg className="w-24 h-24 lg:w-28 lg:h-28 transform -rotate-90" viewBox="0 0 112 112">
                                <circle cx="56" cy="56" r="50" className={colors.circleTrack} strokeWidth="8" fill="none" />
                                <circle cx="56" cy="56" r="50" className={`${colors.circleFill} transition-all duration-1000 ease-out`} strokeWidth="8" fill="none" strokeDasharray={2 * Math.PI * 50} strokeDashoffset={2 * Math.PI * 50 - (completion_percent / 100) * 2 * Math.PI * 50} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-2xl lg:text-3xl font-bold ${colors.percentText}`}>{completion_percent}%</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Complete</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0 animate-slideInLeft">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className={`text-xl font-bold ${colors.title}`}>Complete Your Profile</h3>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 ${colors.badge} rounded-full`}>
                                    <div className={`w-1.5 h-1.5 ${colors.badgeDot} rounded-full animate-ping`}></div>
                                    <div className={`absolute w-1.5 h-1.5 ${colors.badgeDot} rounded-full`}></div>
                                    <span className={`text-xs font-medium ${colors.badgeText} ml-1`}>{colors.label}</span>
                                </div>
                            </div>
                            <p className="text-base text-gray-600 dark:text-gray-400 mb-2">You’ve made a wonderful start! Share a few more details so we can stay connected and serve you better as part of the GCCC family.</p>
                            <a href="/dashboard/profile" className={`inline-flex items-center gap-1.5 underline text-base font-medium ${colors.link} transition-colors duration-200`}>
                                Go to Profile
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <button onClick={() => setIsVisible(false)} className={`flex-shrink-0 p-2 rounded-lg bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border ${colors.closeBtn} shadow-sm hover:shadow transition-all duration-300 hover:rotate-90 group animate-slideInRight`} aria-label="Dismiss">
                        <svg className={`w-5 h-5 ${colors.closeIcon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
      `}</style>
        </div>
    );
};

export default ProfileCompletionBanner;