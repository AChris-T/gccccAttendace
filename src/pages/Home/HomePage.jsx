import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import animationData from '../../utils/animation.json';
import { CheckedIcon, HandIcon } from '../../icons';
import { useAuthStore } from '../../store/auth.store';
import { useTodaysService } from '../../queries/service.query';
import { useMarkAttendance } from '../../queries/attendance.query';
import { Toast } from '../../lib/toastify';
import Button from '@/components/ui/Button';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

const ATTENDANCE_SOURCES = {
  ONLINE: 'online',
  ONSITE: 'onsite',
};

const EXTERNAL_LINKS = {
  YOUTUBE: 'https://youtube.com/@gccc_ibadan?si=XRe2Ev_qj9vK8nJz',
  TELEGRAM: 'https://t.me/Pastoropeyemipeter',
};

const LoadingState = ({ userName }) => (
  <div className="min-h-screen flex items-center justify-center px-3">
    <div className="flex flex-col items-center space-y-5 md:space-y-10">
      <p className="text-base text-white capitalize">
        Hello 👋, {userName ?? 'Friend'}
      </p>
      <Lottie
        animationData={animationData}
        loop
        style={{ width: 150, height: 150 }}
      />
      <p className="text-white">Loading service information...</p>
    </div>
  </div>
);

const NoServiceState = ({ userName }) => (
  <div className="min-h-screen flex items-center justify-center px-3">
    <div className="max-w-lg text-lg font-normal flex flex-col items-center space-y-5 md:space-y-10">
      <p className="text-white capitalize">
        Hello 👋, {userName ?? 'Friend'}
      </p>
      <p className="text-center text-white">
        We do not have a church service today, but you can catch up with
        previous services on YouTube and download audio messages on Telegram.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant='danger'
          href={EXTERNAL_LINKS.YOUTUBE}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </Button>
        <Button variant='primary'
          href={EXTERNAL_LINKS.TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download on Telegram
        </Button>
      </div>
    </div>
  </div>
);

const ClockInButton = ({ onClockIn, isPending }) => (
  <div className="space-y-5 md:space-y-10">
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
      <Lottie
        animationData={animationData}
        loop
        style={{ width: 150, height: 150 }}
      />
    )}
    <p className="text-sm text-center font-semibold text-white">
      {isPending ? 'Submitting...' : 'Clock In'}
    </p>
  </div>
);

const AttendanceRecordedState = () => (
  <div className='space-y-5 md:space-y-10'>
    <CheckedIcon width={150} height={150} className='mx-auto' />
    <h3 className="text-center text-white">
      Your attendance has been recorded for today.
    </h3>
  </div>
);

// Main Component
const HomePage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, error } = useTodaysService();
  const { service, canMark } = data || {};
  const { mutate, isPending } = useMarkAttendance();
  const { user } = useAuthStore();

  const sourceParam = searchParams.get('source');
  const source =
    sourceParam === ATTENDANCE_SOURCES.ONLINE
      ? ATTENDANCE_SOURCES.ONLINE
      : ATTENDANCE_SOURCES.ONSITE;

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

  if (isLoading) {
    return <LoadingState userName={user?.first_name} />;
  }

  if (isError) {
    return <NoServiceState userName={user?.first_name} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3">
      <div className="flex flex-col items-center space-y-5 md:space-y-10">
        <p className="text-base text-white capitalize">
          Hello 👋, {user?.first_name ?? 'Friend'}
        </p>
        <div className="flex flex-col items-center">
          {canMark ? (
            <ClockInButton onClockIn={handleClockIn} isPending={isPending} />
          ) : (
            <AttendanceRecordedState />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;