"use client";

import { AwardIcon, BadgeIcon, ShareBadgeIcon } from "@/icons";
import { useAuthStore } from "@/store/auth.store";
import { useMemo, useState } from "react";
import Modal from "../ui/modal/Modal";
import Button from "@/components/ui/Button";

const UserAchievement = () => {
  const { user: userData } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const badges = [
    { id: 1, month: "December 2025", title: "Faithfulness", color: "from-yellow-400 to-yellow-500" },
    { id: 2, month: "November 2025", title: "Faithfulness", color: "from-yellow-400 to-yellow-500" },
    { id: 3, month: "October 2025", title: "Faithfulness", color: "from-yellow-400 to-yellow-500" },
    { id: 4, month: "September 2025", title: "Faithfulness", color: "from-yellow-400 to-yellow-500" },
    { id: 5, month: "August 2025", title: "Faithfulness", color: "from-yellow-400 to-yellow-500" },
    { id: 6, month: "August 2025", title: "Faithfulness", color: "from-yellow-400 to-yellow-500" },
  ];

  const lastBadgeDate = useMemo(() => {
    if (!userData.last_badge_month || !userData.last_badge_year) return null;
    const date = new Date(userData.last_badge_year, userData.last_badge_month - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [userData.last_badge_month, userData.last_badge_year]);

  const hasBadges = userData.attendance_badge > 0;

  const handleViewAll = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-all hover:shadow-lg">
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60">
        <div className="flex items-start gap-4 flex-1">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 shrink-0">
            <AwardIcon className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Attendance Recognition
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your attendance achievements and badges
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 mt-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 mb-4">
            <span className="text-3xl font-bold text-white">{userData.attendance_badge || 0}</span>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 mb-1">
            {hasBadges ? "Attendance Badges" : "Start Your Journey"}
          </h4>
          <p className="text-sm text-gray-500 mb-6">
            {lastBadgeDate ? `Last earned: ${lastBadgeDate}` : "No badges earned yet"}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {badges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="bg-linear-to-b from-[#111827] to-[#0b1220] text-white rounded-2xl p-8 text-center shadow-2xl w-[320px]"
              >
                <p className="text-xs tracking-wide font-semibold opacity-80 mb-3">
                  {badge.month.toUpperCase()}
                </p>
                <div
                  className={`mx-auto w-28 h-28 rounded-full bg-linear-to-b ${badge.color} flex items-center justify-center shadow-[0_20px_30px_rgba(0,0,0,0.6)]`}
                >
                  <BadgeIcon />
                </div>
                <div className="mt-3 inline-block bg-white/10 px-3 py-1 rounded-full text-[11px] tracking-wide font-semibold">
                  PERFECT
                </div>
                <h3 className="mt-6 text-lg font-semibold uppercase">{badge.title} </h3>
                <p className="mt-2 text-sm text-gray-300 px-3">
                  Congratulations! You've attended all services for this month.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3">
                  <Button className=" px-4 py-2 rounded-md bg-[#0B84FF] text-white font-medium shadow hover:bg-[#0b6fd6] transition text[-14px]">
                    <ShareBadgeIcon />
                    Share Achievement
                  </Button>
                </div>
              </div>
            ))}
          </div>


          <button
            onClick={handleViewAll}
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            View all badges
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="All Attendance Badges"
        maxWidth="max-w-6xl"
      >
        <div className="flex flex-wrap justify-center gap-8 p-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-[#0B1220] text-white rounded-2xl p-8 text-center shadow-2xl w-[300px]"
            >
              <p className="text-xs tracking-wide font-semibold opacity-80 mb-3">
                {badge.month.toUpperCase()}
              </p>
              <div
                className={`mx-auto w-24 h-24 rounded-full bg-linear-to-b ${badge.color} flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.4)]`}
              >
                <BadgeIcon />
              </div>
              <h3 className="mt-6 text-lg font-semibold uppercase">{badge.title}</h3>
              <p className="mt-2 text-sm text-gray-300 px-3">
                Keep up the great work maintaining your attendance record.
              </p>
              <div className="mt-6 flex justify-center">
                <Button className=" px-4 py-4 rounded-md bg-[#0B84FF] text-white font-medium shadow hover:bg-[#0b6fd6] transition text-[4px]">
                  <ShareBadgeIcon />
                  Share Achievement
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserAchievement;
