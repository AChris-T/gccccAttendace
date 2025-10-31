import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  MessageIcon,
  UserIcon,
} from '@/icons';
import { formatFullDateTime, getTimeAgo, getTypeConfig } from '@/utils/helper';

const ACTIVE_TAB_TYPES = {
  ALL_MEMBERS: 'all_members',
  FIRST_TIMER: 'first_timer',
  ABSENT_MEMBERS: 'absent_members',
};

const FeedbackItem = ({ feedback }) => {
  const typeConfig = getTypeConfig(feedback.type);
  const creatorName =
    feedback.created_by.full_name ||
    `${feedback.created_by.first_name} ${feedback.created_by.last_name}`;

  return (
    <div className="p-4 transition-shadow duration-200 border border-gray-200 rounded-lg bg-linear-to-br from-gray-50 to-gray-50 dark:from-gray-700/50 dark:to-gray-800/50 dark:border-gray-600 hover:shadow-md">
      <div className="flex flex-row justify-between gap-2 mb-3 sm:items-start">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 dark:text-gray-400">
            <UserIcon height={13} width={13} className="mt-0" />
            <p className="text-sm">{creatorName}</p>
          </div>
          <Badge color={typeConfig.color} size="sm">
            {feedback.type}
          </Badge>
          {feedback.service_date && (
            <Badge size="sm" color="warning">
              <CalendarIcon /> {formatFullDateTime(feedback.service_date)}
            </Badge>
          )}
        </div>
        <span className="flex items-center text-xs italic text-gray-500 dark:text-gray-400">
          {getTimeAgo(feedback.created_at)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {feedback.note}
      </p>
    </div>
  );
};

const EmptyFeedback = () => (
  <div className="py-8 mt-5 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 mb-3 bg-gray-100 rounded-full dark:bg-gray-700">
      <MessageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      No feedback available yet
    </p>
  </div>
);

const FeedbackList = ({ feedbacks }) => {
  if (!feedbacks?.length) {
    return <EmptyFeedback />;
  }

  return (
    <div className="mt-5 space-y-3">
      <h4 className="flex items-center gap-2 text-sm font-bold tracking-wide text-gray-700 uppercase dark:text-gray-300">
        <MessageIcon className="w-4 h-4" />
        Follow-up Feedbacks
      </h4>
      {feedbacks.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
};

const StatusBadges = ({ person }) => {
  const hasFeedbacks = person.followupFeedbacks?.length > 0;
  const feedbackCount = person.followupFeedbacks?.length || 0;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {person.follow_up_status && (
        <Badge size="sm" color={person.follow_up_status.color}>
          {person.follow_up_status.title}
        </Badge>
      )}

      {person.assigned_to_member ? (
        <Badge size="sm" color="light">
          <UserIcon className="w-3.5 h-3.5" />
          <span className="font-medium">
            {person.assigned_to_member.full_name}
          </span>
        </Badge>
      ) : (
        <span className="text-xs italic text-red-500">Not Assigned</span>
      )}

      <Badge size="sm" color="purple">
        <MessageIcon className="w-3.5 h-3.5" />
        <span>
          {feedbackCount} Feedback{feedbackCount !== 1 ? 's' : ''}
        </span>
      </Badge>

      {hasFeedbacks && (
        <Badge size="sm" color="success">
          <ClockIcon className="w-3.5 h-3.5" />
          {getTimeAgo(person.followupFeedbacks[0].created_at)}
        </Badge>
      )}
    </div>
  );
};

const ContactInfo = ({ person }) => (
  <div className="flex flex-col gap-1 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-3 dark:text-gray-400">
    <Link to={`mailto:${person.email}`}>{person.email}</Link>
    <span className="hidden text-gray-400 sm:inline dark:text-gray-600">•</span>
    <Link to={`tel:${person.phone_number}`}>{person.phone_number}</Link>
  </div>
);

const AbsentBadge = ({ person }) => (
  <div>
    <Badge size="sm" color="error">
      <span className="capitalize">
        {person?.attendance?.status}:{' '}
        {formatFullDateTime(person?.attendance_date)}
      </span>
    </Badge>
  </div>
);

export const FollowupCard = ({ person, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const memberId = useMemo(() => {
    return activeTab === ACTIVE_TAB_TYPES.ALL_MEMBERS
      ? person?.id
      : person?.user_id;
  }, [activeTab, person?.id, person?.user_id]);

  const profileLink = useMemo(() => {
    return activeTab === ACTIVE_TAB_TYPES.FIRST_TIMER
      ? `/dashboard/first-timers/${person?.id}`
      : `/dashboard/members/${memberId}`;
  }, [activeTab, person?.id, memberId]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const isAbsentTab = activeTab === ACTIVE_TAB_TYPES.ABSENT_MEMBERS;

  return (
    <div className="relative transition-all duration-300 bg-white border border-gray-200 shadow dark:bg-gray-800 rounded-xl dark:border-gray-700">
      {/* Header */}
      <div className="relative z-10 flex items-start w-full gap-4 p-5 transition-colors duration-200 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl">
        {/* Avatar */}
        <div className="relative shrink-0">
          <Avatar
            size="sm"
            src={person.avatar}
            name={person.initials}
            alt={person.full_name}
          />
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0 truncate">
              <Link
                to={profileLink}
                target="_blank"
                className="flex gap-3 mb-1 text-lg font-bold text-gray-900 hover:underline sm:text-xl dark:text-white"
              >
                {person.full_name}
              </Link>
              <ContactInfo person={person} />
            </div>

            <button
              className="px-1 bg-gray-100 rounded shadow-2xl shrink-0"
              aria-label={isOpen ? 'Collapse details' : 'Expand details'}
              aria-expanded={isOpen}
              onClick={toggleOpen}
            >
              <ChevronDownIcon
                className={`transform transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                } w-5 h-6 text-gray-600 dark:text-gray-500`}
              />
            </button>
          </div>

          {isAbsentTab && <AbsentBadge person={person} />}

          <StatusBadges person={person} />
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        className={`absolute left-0 right-0 top-full bg-white dark:bg-gray-800 rounded-b-xl border-t border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? 'max-h-[500px] overflow-y-auto opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ zIndex: 20 }}
      >
        <div className="px-5 pb-6 sm:px-6">
          <FeedbackList feedbacks={person.followupFeedbacks} />
        </div>
      </div>
    </div>
  );
};
