import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import animationData from '../../utils/animation.json';
import { CalendarCheckIcon, CheckedIcon, ClockIcon2, HandIcon, SendIcon, SparklesIcon, YoutubeIcon } from '../../icons';
import { useAuthStore } from '../../store/auth.store';
import { useTodaysService } from '../../queries/service.query';
import { useMarkAttendance } from '../../queries/attendance.query';
import { Toast } from '../../lib/toastify';
import Button from '@/components/ui/Button';
import Animated from '@/components/common/Animated';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

const ATTENDANCE_SOURCES = {
  ONLINE: 'online',
  ONSITE: 'onsite',
};

const baseClasses = 'px-4 sm:px-6 py-10 rounded-3xl bg-white/5 dark:bg-white/2 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-2xl shadow-black/20 dark:shadow-black/40'

const EXTERNAL_LINKS = {
  YOUTUBE: 'https://youtube.com/@gccc_ibadan?si=XRe2Ev_qj9vK8nJz',
  TELEGRAM: 'https://t.me/Pastoropeyemipeter',
};

const Greeting = ({ userName }) => (
  <Animated
    animation="slideDown"
    duration={0.6}
    delay={0.1}
    className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg"
  >
    <SparklesIcon className="w-5 h-5 text-yellow-300 dark:text-yellow-400 animate-pulse" />
    <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
      Hello 👋, {userName ?? 'Friend'}
    </h1>
  </Animated>
);

const LoadingState = ({ userName }) => (
  <div className="min-h-screen flex items-center justify-center px-4 py-8">
    <Animated
      animation={'fade-up'}
      className={`flex flex-col items-center space-y-6 md:space-y-8 max-w-2xl w-full ${baseClasses}`}
    >
      <div className="flex justify-center">
        <div className="h-1 w-32 bg-linear-to-r from-transparent via-green-400/50 dark:via-green-500/40 to-transparent rounded-full"></div>
      </div>
      <Greeting userName={userName} />

      <Animated
        animation="zoom-in"
        duration={0.5}
        delay={0.2}
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-3xl rounded-full"></div>
        <Lottie
          animationData={animationData}
          loop
          style={{ width: 200, height: 200 }}
          className="relative z-10"
        />
      </Animated>

      <Animated
        animation="fade"
        duration={0.5}
        delay={0.3}
        className="text-center space-y-2"
      >
        <p className="text-lg font-medium text-white">Loading service information...</p>
        <p className="text-sm text-white/70 dark:text-white/60">Please wait while we fetch today's service details</p>
      </Animated>
      <div className="flex justify-center">
        <div className="h-1 w-32 bg-linear-to-r from-transparent via-green-400/50 dark:via-green-500/40 to-transparent rounded-full"></div>
      </div>
    </Animated>
  </div>
);

const NoServiceState = ({ userName }) => (
  <div className="min-h-screen flex items-center justify-center px-4 py-8">
    <Animated
      animation={'fade-up'}
      className={`max-w-2xl w-full text-center space-y-6 md:space-y-8 ${baseClasses}`}
    >
      <div className="flex justify-center">
        <div className="h-1 w-32 bg-linear-to-r from-transparent via-green-400/50 dark:via-green-500/40 to-transparent rounded-full"></div>
      </div>
      <Greeting userName={userName} />

      <Animated
        animation="fade-up"
        duration={0.6}
        delay={0.2}
        className="space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          No Service Scheduled Today
        </h2>
        <p className="text-base sm:text-lg text-white/90 dark:text-white/80 leading-relaxed max-w-xl mx-auto">
          We do not have a church service today, but you can catch up with previous services on YouTube and download audio messages on Telegram.
        </p>
      </Animated>

      <Animated
        animation="fade-up"
        duration={0.6}
        delay={0.4}
        className="inline-flex flex-col justify-center gap-4 sm:flex-row"
      >
        <Button variant='danger'
          href={EXTERNAL_LINKS.YOUTUBE}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<YoutubeIcon />}
        >
          Watch on YouTube
        </Button>
        <Button variant='primary'
          href={EXTERNAL_LINKS.TELEGRAM}
          target="_blank"
          startIcon={<SendIcon />}
          rel="noopener noreferrer"
        >
          Download on Telegram
        </Button>
      </Animated>

      <Animated
        animation="fade-up"
        duration={0.5}
        delay={0.6}
      >
        <div className="flex justify-center">
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-green-400/50 dark:via-green-500/40 to-transparent rounded-full"></div>
        </div>
      </Animated>
    </Animated>
  </div>
);

// Clock In Button Component
const ClockInButton = ({ onClockIn, isPending }) => (
  <Animated
    animation="scale"
    duration={0.6}
    delay={0.3}
    className="space-y-6 md:space-y-8 w-full flex flex-col items-center"
  >
    {!isPending ? (
      <div className="bg-[#3A4D70] rounded-full animate-pulse delay-150">
        <motion.button
          onClick={onClockIn}
          disabled={isPending}
          className="rounded-full bg-[#4C8EFF] p-9 cursor-pointer relative disabled:opacity-50 disabled:cursor-not-allowed"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1.5,
            ease: 'easeInOut',
          }}
          aria-label="Clock in for attendance"
        >
          <span className="absolute inset-1 rounded-full border-4 border-[#202a46] opacity-90 animate-ping delay-1000" />
          <span className="absolute inset-1 rounded-full border-4 border-[#172346] opacity-90 animate-ping delay-10000" />
          <HandIcon height={150} width={150} />
        </motion.button>
      </div>
    ) : (
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-3xl rounded-full"></div>
        <Lottie
          animationData={animationData}
          loop
          style={{ width: 180, height: 180 }}
          className="relative z-10"
        />
      </div>
    )}

    <Animated
      className="text-center space-y-2"
      animation={'fade-up'}
    >
      <div className="flex items-center justify-center gap-2">
        <ClockIcon2 className="w-5 h-5 text-white" />
        <p className="text-lg font-bold text-white">
          {isPending ? 'Submitting...' : 'Tap to Clock In'}
        </p>
      </div>
      <p className="text-sm text-white/70 dark:text-white/60">
        {isPending ? 'Recording your attendance...' : 'Mark your attendance for today\'s service'}
      </p>
    </Animated>
  </Animated>
);

const AttendanceRecordedState = () => (
  <Animated
    key="attendance-recorded"
    animation="fade-up"
    duration={0.7}
    easing="spring"
    className="space-y-6 md:space-y-8 w-full flex flex-col items-center"
  >
    <Animated
      animation="fade-up"
      className="relative"
    >
      <div className="absolute inset-0 bg-green-500/20 dark:bg-green-400/20 blur-2xl rounded-full"></div>
      <div className="relative z-10 bg-linear-to-br from-green-500/20 to-emerald-500/20 dark:from-green-600/20 dark:to-emerald-600/20 backdrop-blur-sm rounded-full p-6 border-4 border-green-400/30 dark:border-green-500/30">
        <CheckedIcon width={100} height={100} className="mx-auto" />
      </div>
    </Animated>

    <div className="text-center space-y-3">
      <div className="flex items-center justify-center gap-2">
        <CalendarCheckIcon className="w-6 h-6 text-green-400 dark:text-green-300" />
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Attendance Recorded!
        </h3>
      </div>
      <p className="text-base text-white/80 dark:text-white/70 max-w-md mx-auto px-4">
        Your attendance has been successfully recorded for today's service. Thank you for being present!
      </p>
    </div>
  </Animated>
);

// Main Component
const HomePage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, error, isFetching } = useTodaysService();
  const { service, canMark } = data || {};
  const { mutate, isPending, isSuccess } = useMarkAttendance();
  const { user } = useAuthStore();

  const sourceParam = searchParams.get('source');
  const source =
    sourceParam === ATTENDANCE_SOURCES.ONLINE
      ? ATTENDANCE_SOURCES.ONLINE
      : ATTENDANCE_SOURCES.ONSITE;

  const showMarkedAttendance = isSuccess || (data && !canMark);

  const isLoadingState = isLoading || isPending || isFetching;

  useEffect(() => {
    if (isError && error?.data?.message) {
      Toast.error(error.data.message);
    }
  }, [isError, error]);

  const handleClockIn = useCallback(
    (e) => {
      e.preventDefault();

      if (!service?.id) {
        Toast.error('Service Day not found, please try again later.');
        return;
      }

      const payload = {
        service_id: service.id,
        mode: source,
        status: 'present',
      };

      mutate(payload);
    },
    [service?.id, source, mutate]
  );

  if (isLoadingState) {
    return <LoadingState userName={user?.first_name} />;
  }

  if (isError) {
    return <NoServiceState userName={user?.first_name} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      <Animated
        animation="fade-up"
        className={`flex flex-col items-center space-y-6 md:space-y-10 max-w-2xl w-full ${baseClasses}`}
      >
        <div className="flex justify-center">
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-green-400/50 dark:via-green-500/40 to-transparent rounded-full"></div>
        </div>

        <Greeting userName={user?.first_name} />

        <Animated
          animation="slideUp"
          duration={0.6}
          delay={0.2}
          className="text-center space-y-2 max-w-lg"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Welcome to Today's Service
          </h2>
          <p className="text-sm sm:text-base text-white/80 dark:text-white/70">
            {showMarkedAttendance
              ? 'Thank you for joining us today'
              : 'Please mark your attendance to confirm your presence at today\'s church service'}
          </p>
        </Animated>

        <div className="flex flex-col items-center w-full">
          <AnimatePresence mode="wait">
            {showMarkedAttendance ? (
              <AttendanceRecordedState key="recorded" />
            ) : (
              <ClockInButton key="clock-in" onClockIn={handleClockIn} isPending={isPending} />
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-center">
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-green-400/50 dark:via-green-500/40 to-transparent rounded-full"></div>
        </div>
      </Animated>
    </div>
  );
};

export default HomePage;