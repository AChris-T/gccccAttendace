import { ANNOUNCEMENTS } from "@/utils/data";
import Marquee from "react-fast-marquee";

const MegaphoneIcon = () => (
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 5H8L3 10V14L8 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AnnouncementItem = ({ icon, text }) => (
    <p className="text-white font-light text-xs whitespace-nowrap drop-shadow-sm mx-10">
        {icon} {text}
    </p>
);

const AnnouncementBanner = () => {
    return (
        <div className="relative w-full overflow-hidden bg-transparent">
            <div className="relative flex items-center gap-2 md:gap-4 pl-2 pr-5 py-2 md:py-3">
                <div className="shrink-0 flex items-center gap-2 md:gap-3">
                    <div className="animate-pulse">
                        <MegaphoneIcon />
                    </div>
                    <span className="hidden md:inline-block text-sm font-semibold text-white uppercase tracking-wider">
                        Announcements
                    </span>
                </div>

                <div className="flex-1 overflow-hidden relative min-w-0">
                    <Marquee pauseOnHover pauseOnClick>
                        {ANNOUNCEMENTS?.map((announcement, index) => (
                            <AnnouncementItem
                                key={index}
                                icon={announcement.icon}
                                text={announcement.text}
                            />
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBanner;