import { AwardIcon } from '@/icons';
import { useAuthStore } from '@/store/auth.store';
import { useMemo } from 'react';

const UserAchievement = () => {
  const { user: userData } = useAuthStore();

  const lastBadgeDate = useMemo(() => {
    if (!userData.last_badge_month || !userData.last_badge_year) {
      return null;
    }
    const date = new Date(
      userData.last_badge_year,
      userData.last_badge_month - 1
    );
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [userData.last_badge_month, userData.last_badge_year]);
  const hasBadges = userData.attendance_badge > 0;

  return (
    <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-all hover:shadow-lg">
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60 lg:px-6 lg:pt-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 shrink-0">
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

      <div className="px-5 py-5 lg:px-6 lg:py-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 mb-4">
              <span className="text-3xl font-bold text-white">
                {userData.attendance_badge || 0}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {hasBadges ? 'Attendance Badges' : 'Start Your Journey'}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {lastBadgeDate
                ? `Last earned: ${lastBadgeDate}`
                : 'No badges earned yet'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAchievement;
