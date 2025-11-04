import React, { useState, useEffect, useRef } from 'react';

const AnnouncementBanner = () => {
    const scrollerRef = useRef(null);
    const [animationDuration, setAnimationDuration] = useState(60);

    const announcements = [
        "📋 Please mark your attendance during service",
        "⛪ Sunday Service: 8:00 AM | Tuesday Service: 5:15 PM | Daily Prayer Online: 12:00 PM",
        "🌟 Global Glory Team Meeting - Saturday, October 18th at 10:00 AM",
        "⚡ Divine Demand - Daily on YouTube at 5:30 AM",
        "🎤 Share your testimonies at www.gcccibadan.org/forms",
        "🙏 Submit prayer requests anonymously at www.gcccibadan.org/forms",
        "❓ Jesus Perspective Q&A - Second Tuesday of every month",
        "📱 Follow us: Instagram, Facebook, YouTube & Telegram @GCCC Ibadan",
        "🔋 Phone charging available before service",
        "🔇 Please silence phones before entering church",
        "🏪 Storehouse Open - Donate items (See Comfort)",
        "📅 SOD 2025: The Call - Registration now open!",
        "🎓 Volunteer for Secondary School Outreach",
        "👨‍🎓 Student Fellowship - Wednesdays 6:00 PM, Alumni Hall UI",
        "🌍 Global Fasting & Prayer - YouTube 6AM | Physical 6PM daily"
    ];

    useEffect(() => {
        const calculateDuration = () => {
            if (scrollerRef.current) {
                const contentWidth = scrollerRef.current.scrollWidth / 3;
                // Adjust speed: pixels per second (lower = slower, higher = faster)
                const pixelsPerSecond = 50;
                const duration = contentWidth / pixelsPerSecond;
                setAnimationDuration(duration);
            }
        };

        calculateDuration();
        window.addEventListener('resize', calculateDuration);
        return () => window.removeEventListener('resize', calculateDuration);
    }, []);

    const MegaphoneIcon = () => (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 5H8L3 10V14L8 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="relative w-full overflow-hidden bg-transparent">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    animation: 'drift 20s linear infinite'
                }}></div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent"></div>

            <div className="relative flex items-center gap-2 md:gap-4 pl-2 pr-5 py-2 md:py-3">
                {/* Icon with label */}
                <div className="shrink-0 flex items-center gap-2 md:gap-3">
                    <div className="animate-pulse">
                        <MegaphoneIcon />
                    </div>
                    <span className="hidden md:inline-block text-sm font-semibold text-white uppercase tracking-wider">
                        Announcements
                    </span>
                </div>

                {/* Vertical divider */}
                <div className="hidden md:block w-px h-6 bg-white/30"></div>

                {/* Scrolling Text Container */}
                <div className="flex-1 overflow-hidden relative min-w-0">
                    <div
                        ref={scrollerRef}
                        className="flex gap-12"
                        style={{
                            animation: `scroll-continuous ${animationDuration}s linear infinite`
                        }}
                    >
                        {/* Triple the announcements for seamless loop */}
                        {[...announcements, ...announcements, ...announcements].map((text, index) => (
                            <div
                                key={index}
                                className="shrink-0 text-white font-light text-xs whitespace-nowrap drop-shadow-sm"
                            >
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scroll-continuous {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-100% / 3));
                    }
                }

                @keyframes drift {
                    0% {
                        transform: translateX(0) translateY(0);
                    }
                    100% {
                        transform: translateX(40px) translateY(40px);
                    }
                }
            `}</style>
        </div>
    );
};

export default AnnouncementBanner;