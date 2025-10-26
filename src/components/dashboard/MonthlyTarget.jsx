import { useState, useEffect, useCallback } from "react";
import Message from "@/components/common/Message";
import ConfettiShower from "@/components/dashboard/ConfettiShower";
import { SemiCircleProgress } from "@/components/dashboard/metrics/SemiCircleProgress";
import { MonthlyTargetSkeleton } from "@/components/skeleton";
import { BagdeIcon, ChevronDownIcon2 } from "@/icons";
import { Toast } from "@/lib/toastify";
import { getAttendanceMessage, getMonthName } from "@/utils/helper";
import { useAuthStore } from "@/store/auth.store";
import Badge from "@/components/ui/Badge";
import MonthYearSelector from "@/components/common/MonthYearSelector";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";

const CONFETTI_DURATION = 9000;
const GOAL_PERCENTAGE = 100;

const MonthlyTarget = ({ data, isError, isLoading, error, params, handleDateChange }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [hasShownToast, setHasShownToast] = useState(false);

    const monthAndYear = `${getMonthName(params?.month)}, ${params.year}`;
    const percentage = Number(data?.present_percentage) ?? 0;
    const { level, message, fromColor, toColor } = getAttendanceMessage(percentage);
    const isGoalMet = percentage === GOAL_PERCENTAGE;

    useEffect(() => {
        if (isGoalMet && !isLoading) {
            setShowConfetti(true);
            if (!hasShownToast) {
                Toast.success(message);
                setHasShownToast(true);
            }
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, CONFETTI_DURATION);
            return () => clearTimeout(timer);
        }
    }, [isGoalMet, isLoading, message, hasShownToast]);

    if (isLoading) return <MonthlyTargetSkeleton />;
    if (isError) return <Message variant="error" data={error?.data} />;

    return (
        <>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03] transition-all hover:shadow-md">
                {showConfetti && <ConfettiShower />}

                <Header monthAndYear={monthAndYear} isGoalMet={isGoalMet} handleDateChange={handleDateChange} />

                <ChartSection
                    percentage={percentage}
                    fromColor={fromColor}
                    toColor={toColor}
                    level={level}
                    message={message}
                />
            </div>
        </>
    );
};

const Header = ({ monthAndYear, isGoalMet, handleDateChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openDropdown = () => setIsOpen(true);
    const closeDropdown = () => setIsOpen(false);
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const { user } = useAuthStore()
    return (
        <div className="flex items-start justify-between px-4 pt-4 sm:px-6 sm:pt-6">
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                    Monthly Target
                </h3>
                <div className="relative mt-1">
                    <button role="button" onClick={toggleDropdown} className="cursor-pointer flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        Attendance Report for  <Badge endIcon={<ChevronDownIcon2 className={`transform transition-transform duration-300 h-5 w-4 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />} color="primary">{monthAndYear}</Badge>
                    </button>
                    <Dropdown
                        onClose={closeDropdown}
                        isOpen={isOpen}
                        className="w-60 p-2 mt-2"
                    >
                        <MonthYearSelector
                            onChange={(value) => {
                                handleDateChange(value);
                                closeDropdown();
                            }}
                        />
                    </Dropdown>
                </div>
            </div>

            {isGoalMet || user?.attendance_badge ? (
                <div className="animate-bounce flex gap-0.5">
                    <BagdeIcon
                        width={24}
                        height={24}
                        fill="#32d583"
                    />
                    <Badge color="success">
                        <span className="text-xs font-bold">{user?.attendance_badge}</span>
                    </Badge>
                </div>
            ) : null}
        </div>
    );
}



const ChartSection = ({ percentage, fromColor, toColor, level, message }) => (
    <div className="px-4 py-7 sm:px-6 sm:py-8">
        <SemiCircleProgress
            percentage={percentage}
            fillColor={fromColor}
            toColor={toColor}
            level={level}
        />

        <div className="mt-6 text-center sm:mt-7">
            <p className="px-4 text-sm text-gray-700 dark:text-gray-300 sm:text-base">
                {message}
            </p>
        </div>
    </div>
);

export default MonthlyTarget;