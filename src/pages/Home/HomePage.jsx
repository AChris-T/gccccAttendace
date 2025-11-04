import Animated from "@/components/common/Animated";
import Button from "@/components/ui/Button";
import { useMarkAttendance } from "@/queries/attendance.query";
import { useTodaysService } from "@/queries/service.query";
import { useAuthStore } from "@/store/auth.store";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import { BookIcon, CalendarIcon, CheckIcon, ClockIcon, HandIcon, SparklesIcon, TelegramIcon, YoutubeIcon } from "@/icons";
import animationData from '../../utils/animation.json';
import { bibleVerses } from "@/utils/data";
import HomepageComponentCard from "@/components/common/HomepageComponentCard";

// ============= CONSTANTS =============
const ATTENDANCE_SOURCES = {
  ONLINE: 'online',
  ONSITE: 'onsite',
};

// ============= GREETING CONTAINER =============
const GreetingContainer = ({ userName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div className="relative group">
        {/* Animated background glow */}
        <motion.div
          className="absolute -inset-1 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main greeting card */}
        <div className="relative px-6 py-4 rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Animated sparkle icon */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="shrink-0"
              >
                <div className="p-2.5 rounded-xl bg-linear-to-br from-yellow-400/20 to-amber-400/20 border border-yellow-400/30">
                  <SparklesIcon className="w-5 h-5 text-yellow-300" />
                </div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-lg sm:text-xl font-bold text-white tracking-tight truncate"
                >
                  Hello 👋, {userName ?? 'Friend'}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-sm text-white/60 mt-0.5"
                >
                  Welcome to GCCC Ibadan.
                </motion.p>
              </div>
            </div>

            {/* Pulsing indicator */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="shrink-0"
            >
              <div className="w-3 h-3 rounded-full bg-linear-to-br from-green-400 to-emerald-400 shadow-lg shadow-green-400/50" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============= BIBLE VERSE CARD =============
const BibleVerseCard = () => {
  const [currentVerse] = useState(() =>
    bibleVerses[Math.floor(Math.random() * bibleVerses.length)]
  );

  return (
    <Animated
      animation="fade-up"
      duration={0.6}
      delay={0.5}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div className="px-6 py-5 rounded-2xl bg-linear-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-sm border border-amber-400/20 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="p-2 rounded-lg bg-amber-400/20">
              <BookIcon className="w-5 h-5 text-amber-300" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
              {currentVerse.verse}
            </p>
            <p className="text-sm text-white/80 leading-relaxed italic">
              "{currentVerse.text}"
            </p>
          </div>
        </div>
      </div>
    </Animated>
  );
};

// ============= MAIN CONTAINER WRAPPER =============
const MainContainer = ({ children }) => {
  return (
    <Animated
      animation="fade-up"
      duration={0.6}
      delay={0.2}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div className="px-4 relative sm:px-6 py-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/20">
        <div className="flex justify-center">
          <img className="h-10" src='/images/logo/gccc.png' alt="logo" />
        </div>
        {children}
      </div>
    </Animated>
  );
};

// ============= SEO TEXT =============
const SEOText = ({ scenario, serviceName }) => {
  const seoContent = {
    none: {
      description: "There is no church service scheduled today, but the Lord is always near. Stay connected with us through our online platforms."
    },
    upcoming: {
      description: `Get ready! ${serviceName} begins very soon. Prepare your heart for worship and fellowship.`
    },
    ongoing: {
      description: `${serviceName} is currently in progress. Join us in worship and receive the Word of God.`
    },
    marked: {
      description: "Thank you for marking your presence! Your faithfulness in fellowshipping with fellow believers honors God."
    },
    ended: {
      description: `${serviceName} has ended. We hope you were blessed by today's service. Stay connected for upcoming services.`
    }
  };

  const content = seoContent[scenario] || seoContent.none;

  return (
    <p className="text-sm sm:text-base text-white/70 leading-relaxed text-center px-4 max-w-xl mx-auto">
      {content.description}
    </p>
  );
};

// ============= COUNTDOWN TIMER =============
const CountdownTimer = ({ secondsUntilStart, onRefresh }) => {
  const [timeLeft, setTimeLeft] = useState(secondsUntilStart || 0);
  const hasRefetchedRef = useRef(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!hasRefetchedRef.current) {
        hasRefetchedRef.current = true;
        onRefresh();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onRefresh]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/10 blur-lg rounded-2xl" />
        <div className="relative bg-linear-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-xl px-4 py-3 sm:px-6 sm:py-4 border border-white/10 shadow-lg">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-xs text-white/50 mt-1.5 font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <ClockIcon className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Service Starts In
          </h3>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 sm:gap-4">
        <TimeUnit value={hours} label="Hours" />
        <span className="text-2xl sm:text-3xl font-bold text-white/30 pb-6">:</span>
        <TimeUnit value={minutes} label="Minutes" />
        <span className="text-2xl sm:text-3xl font-bold text-white/30 pb-6">:</span>
        <TimeUnit value={seconds} label="Seconds" />
      </div>

      {timeLeft <= 0 && (
        <div className="text-center pt-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-sm text-blue-300 font-medium">
              Checking service status...
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// ============= CLOCK IN BUTTON =============
const ClockInButton = ({ onClockIn, isPending }) => (
  <div className="space-y-6 w-full">
    <div className="flex flex-col items-center space-y-5">
      {!isPending ? (
        <div className="bg-[#3A4D70] rounded-full">
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

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <ClockIcon className="w-5 h-5 text-blue-400" />
          <p className="text-lg font-bold text-white">
            {isPending ? 'Submitting...' : 'Tap to Clock In'}
          </p>
        </div>
        <p className="text-sm text-white/70 max-w-md mx-auto px-4">
          {isPending ? 'Recording your attendance...' : "Mark your attendance for today's service"}
        </p>
      </div>
    </div>
  </div>
);

// ============= ATTENDANCE RECORDED STATE =============
const AttendanceRecordedState = ({ attendance }) => (
  <div className="space-y-6 w-full">
    <div className="flex flex-col items-center space-y-5">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative z-10 bg-linear-to-br from-green-500/15 to-emerald-500/15 backdrop-blur-sm rounded-full p-6 border-4 border-green-400/25"
        >
          <CheckIcon className="w-16 h-16 sm:w-20 sm:h-20 text-green-400" />
        </motion.div>
      </div>

      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <CalendarIcon className="w-5 h-5 text-green-400" />
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Attendance Recorded!
          </h3>
        </div>
        <p className="text-sm text-white/70 max-w-md mx-auto px-4">
          Your attendance has been successfully recorded. Thank you!
        </p>

        {attendance && (
          <div className="inline-flex flex-col gap-1.5 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="font-semibold text-green-400">Mode:</span>
              <span className="capitalize">{attendance.mode}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="font-semibold text-green-400">Time:</span>
              <span>{attendance.marked_at}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ============= SERVICE ENDED STATE =============
const ServiceEndedState = ({ serviceName, attendance }) => (
  <div className="space-y-6 w-full">
    <div className="flex flex-col items-center space-y-5">
      <div className="relative">
        <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-full" />
        <div className="relative z-10 bg-gradient-to-br from-orange-500/15 to-amber-500/15 backdrop-blur-sm rounded-full p-6 border-4 border-orange-400/25">
          <ClockIcon className="w-16 h-16 sm:w-20 sm:h-20 text-orange-400" />
        </div>
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Service Has Ended
        </h3>
        <p className="text-sm text-white/70 max-w-md mx-auto px-4">
          {serviceName} has ended. The attendance window is now closed.
        </p>

        {attendance ? (
          <div className="inline-flex flex-col gap-1.5 px-5 py-2.5 rounded-lg bg-white/5 border border-green-400/25">
            <p className="text-sm text-green-400 font-semibold">✓ You marked your attendance</p>
            <div className="text-xs text-white/50">
              {attendance.marked_at}
            </div>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-orange-400/25">
            <span className="text-sm text-orange-300">Attendance was not recorded</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ============= CONTENT COMPONENTS =============
const LoadingContent = () => (
  <MainContainer>
    <div className="flex flex-col items-center space-y-6">
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
      <div className="text-center space-y-1">
        <p className="text-base font-medium text-white">Loading service information...</p>
        <p className="text-sm text-white/60">Please wait</p>
      </div>
    </div>
  </MainContainer>
);

const NoServiceContent = () => (
  <MainContainer>
    <div className="flex flex-col space-y-8">
      <Animated animation="fade-up" duration={0.6} delay={0.2} className="space-y-6 w-full">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-500/10 blur-xl rounded-full" />
            <div className="relative z-10 bg-linear-to-br from-gray-500/15 to-slate-500/15 backdrop-blur-sm rounded-full p-6 border-4 border-gray-400/25 mx-auto w-fit">
              <CalendarIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" />
            </div>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              No Service Scheduled Today
            </h2>
            <SEOText scenario="none" />
          </div>
        </div>
      </Animated>

      <Animated animation="fade-up" duration={0.6} delay={0.3} className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
        <Button
          variant="danger"
          href="https://youtube.com/@gccc_ibadan"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<YoutubeIcon className="w-4 h-4" />}
        >
          Watch on YouTube
        </Button>
        <Button
          variant="primary"
          href="https://t.me/Pastoropeyemipeter"
          target="_blank"
          startIcon={<TelegramIcon className="w-4 h-4" />}
          rel="noopener noreferrer"
        >
          Download on Telegram
        </Button>
      </Animated>
    </div>
  </MainContainer>
);

const UpcomingServiceContent = ({ service, secondsUntilStart, onRefresh }) => (
  <MainContainer>
    <div className="flex flex-col space-y-8">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          {service?.name || 'Service'}
        </h2>
        {service?.description && (
          <p className="text-sm text-white/60">{service.description}</p>
        )}
      </div>
      <CountdownTimer secondsUntilStart={secondsUntilStart || 0} onRefresh={onRefresh} />
      <SEOText scenario="upcoming" serviceName={service?.name} />
    </div>
  </MainContainer>
);

const EndedServiceContent = ({ service, attendance }) => (
  <MainContainer>
    <div className="flex flex-col space-y-8">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          {service?.name || 'Service'}
        </h2>
        {service?.description && (
          <p className="text-sm text-white/60">{service.description}</p>
        )}
      </div>
      <ServiceEndedState serviceName={service?.name} attendance={attendance} />
      <SEOText scenario="ended" serviceName={service?.name} />
      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
        <Button
          variant="danger"
          href="https://youtube.com/@gccc_ibadan"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<YoutubeIcon className="w-4 h-4" />}
        >
          Watch Recap
        </Button>
        <Button
          variant="primary"
          href="https://t.me/Pastoropeyemipeter"
          target="_blank"
          startIcon={<TelegramIcon className="w-4 h-4" />}
          rel="noopener noreferrer"
        >
          Get Audio Message
        </Button>
      </div>
    </div>
  </MainContainer>
);

const OngoingServiceContent = ({ service, showMarkedAttendance, attendance, onClockIn, isPending }) => (
  <MainContainer>
    <div className="flex flex-col space-y-8">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          {service?.name || 'Service'} is Live
        </h2>
        {service?.description && (
          <p className="text-sm text-white/60">{service.description}</p>
        )}
      </div>
      <AnimatePresence mode="wait">
        {showMarkedAttendance ? (
          <AttendanceRecordedState key="recorded" attendance={attendance} />
        ) : (
          <ClockInButton key="clock-in" onClockIn={onClockIn} isPending={isPending} />
        )}
      </AnimatePresence>
      <SEOText scenario={showMarkedAttendance ? 'marked' : 'ongoing'} serviceName={service?.name} />
    </div>
  </MainContainer>
);

// ============= MAIN PAGE COMPONENT =============
const HomePage = () => {
  const { data, isLoading, isError, isFetching, refetch } = useTodaysService();
  const { service, service_status, seconds_until_start, can_mark, attendance } = data || {};
  const { mutate, isPending, isSuccess } = useMarkAttendance();
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();

  const sourceParam = searchParams.get('source');
  const source = sourceParam === ATTENDANCE_SOURCES.ONLINE ? ATTENDANCE_SOURCES.ONLINE : ATTENDANCE_SOURCES.ONSITE;

  const showMarkedAttendance = isSuccess || (data && !can_mark && attendance);
  const isLoadingState = isLoading || isPending || isFetching;

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleClockIn = useCallback((e) => {
    e.preventDefault();
    if (!service?.id) return;

    const payload = {
      service_id: service.id,
      mode: source,
      status: 'present',
    };

    mutate(payload);
  }, [service?.id, source, mutate]);

  const renderContent = () => {
    if (isLoadingState) {
      return <LoadingContent />;
    }

    if (isError) {
      return <NoServiceContent />;
    }

    switch (service_status) {
      case 'upcoming':
        return (
          <UpcomingServiceContent
            service={service}
            secondsUntilStart={seconds_until_start}
            onRefresh={handleRefresh}
          />
        );

      case 'ended':
        return (
          <EndedServiceContent
            service={service}
            attendance={attendance}
          />
        );

      case 'ongoing':
        return (
          <OngoingServiceContent
            service={service}
            showMarkedAttendance={showMarkedAttendance}
            attendance={attendance}
            onClockIn={handleClockIn}
            isPending={isPending}
          />
        );

      default:
        return <NoServiceContent />;
    }
  };

  return (
    <HomepageComponentCard>
      <GreetingContainer userName={user?.first_name} />
      {renderContent()}
      <BibleVerseCard />
    </HomepageComponentCard>
  );
};

export default HomePage;