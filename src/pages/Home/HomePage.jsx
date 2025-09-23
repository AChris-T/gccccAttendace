import { useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import animationData from '../../utils/animation.json'
import { CheckedIcon, HandIcon } from '../../icons';
import useToastify from '../../hooks/useToastify';
import { useAuthStore } from '../../store/auth.store';
import { useServiceStore } from '../../store/service.store';
import { useAttendanceStore } from '../../store/attendance.store';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

const HomePage = () => {
  const { showToast } = useToastify()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { service, canMark, loading, error, fetchTodaysService, message } = useServiceStore();
  const { loading: isSubmitting, markAttendance } = useAttendanceStore();
  const { user } = useAuthStore();

  let source = searchParams.get('source');
  source = source == 'online' ? source : 'onsite'

  useEffect(() => {
    fetchTodaysService();
  }, [fetchTodaysService]);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (!service.id) return showToast('Service Day not found, please try again later.', 'error');
    try {
      const payload = {
        service_id: service.id,
        mode: source,
        status: 'present',
      };
      const { message } = await markAttendance(payload);
      showToast(message || 'Attendance submitted successfully', 'success')
      navigate(`/attendance`);
    } catch (error) {
      showToast(error.message || 'Attendance submission failed', 'error')
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen px-2">
        <div className="flex flex-col items-center gap-3 mb-5">
          <p className="my-4 text-base text-white capitalize">
            Hello 👋, {user?.first_name ?? 'Friend'}
          </p>
          <Lottie
            animationData={animationData}
            loop
            style={{ width: 150, height: 150 }}
          />
          <div className="flex flex-col items-center gap-4 mx-4">
            <p className="text-white">Loading service information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen px-2">
        <div className="flex flex-col items-center gap-3 mb-5">
          <p className="my-4 text-base text-white capitalize">
            Hello 👋, {user?.first_name ?? 'Friend'}
          </p>
          <div className="flex flex-col items-center justify-center gap-16">
            <p className="max-w-md text-center text-white">
              We do not have a church service today, but you can catch up with
              previous services on YouTube and download audio messages on
              Telegram.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://youtube.com/@gccc_ibadan?si=XRe2Ev_qj9vK8nJz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Watch on YouTube
              </a>
              <a
                href="https://t.me/Pastoropeyemipeter"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Download on Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-2">
      <div className="flex flex-col items-center gap-3 mb-5">
        <p className="my-4 text-base text-white capitalize">
          Hello 👋, {user?.first_name ?? 'Friend'}
        </p>
        <div className="flex flex-col items-center gap-4 mx-4">
          {canMark ? (
            <div className="flex flex-col items-center justify-center gap-4">
              {!isSubmitting ? (
                <div className="bg-[#3A4D70] rounded-full animate-pulse delay-150">
                  <motion.div
                    onClick={handleButtonClick}
                    disabled={isSubmitting}
                    className={`rounded-full bg-[#4C8EFF] p-9 cursor-pointer relative ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 1.5,
                      type: 'spring',
                    }}
                  >
                    <span className="absolute inset-1 rounded-full border-4 border-[#202a46] opacity-90 animate-ping delay-1000"></span>
                    <span className="absolute inset-1 rounded-full border-4 border-[#172346] opacity-90 animate-ping delay-10000"></span>
                    <HandIcon />
                  </motion.div>
                </div>
              ) : (
                <Lottie
                  animationData={animationData}
                  loop
                  style={{ width: 150, height: 150 }}
                />
              )}
              <div className="my-3 text-center">
                <p className="my-3 text-sm font-semibold text-white">
                  {isSubmitting ? 'Submitting...' : 'Clock In'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <CheckedIcon width={150} height={150} />
              <h3 className="text-center text-white">
                Your attendance has been recorded for today.
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
