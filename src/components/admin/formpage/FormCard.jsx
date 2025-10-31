import Badge from '@/components/ui/Badge';
import {
  CalendarIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  DocumentIcon,
  PendingIcon,
  PhoneIcon,
  ShareIcon,
  UserIcon,
} from '@/icons';
import { formatFullDateTime, getTimeAgo } from '@/utils/helper';
import { useState } from 'react';

const typeColors = {
  prayer: 'purple',
  question: 'primary',
  testimony: 'success',
};

export default function FormCard({ person, selected = false, onToggleSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest('[data-expand-button]')) return;
    onToggleSelect?.(!selected);
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all duration-200 cursor-pointer hover:shadow-md ${
          selected
            ? 'border-gray-300 dark:border-gray-600 shadow-md'
            : 'border-gray-200 dark:border-gray-700'
        }`}
      >
        <div className="p-4 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Left Section */}
            <div className="flex items-start min-w-0 gap-3 sm:items-center sm:flex-1">
              {/* Checkbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect?.(!selected);
                }}
                className="transition-transform shrink-0 hover:scale-110"
              >
                {selected ? (
                  <CheckCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                ) : (
                  <CircleIcon className="w-6 h-6 text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500" />
                )}
              </button>

              {/* Name + Meta */}
              <div className="flex-1 min-w-0">
                {person?.name && (
                  <div className="flex items-center gap-2 mb-1">
                    <UserIcon className="w-4 h-4 text-gray-400 shrink-0 dark:text-gray-500" />
                    <span className="text-sm font-semibold text-gray-800 truncate sm:text-base dark:text-gray-200">
                      {person.name}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-3 gap-y-1 dark:text-gray-400">
                  {person?.phone_number && (
                    <div className="flex items-center gap-1.5">
                      <PhoneIcon className="w-3.5 h-3.5" />
                      <span>{person.phone_number}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{getTimeAgo(person?.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:justify-end sm:gap-3">
              {person?.is_completed ? (
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckBadgeIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    Treated
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/30">
                  <PendingIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                    Pending
                  </span>
                </div>
              )}

              {person?.type && (
                <Badge color={typeColors[person.type] || 'gray'} size="sm">
                  {person.type}
                </Badge>
              )}

              {person?.wants_to_share_testimony && (
                <div className="flex items-center gap-1.5">
                  <ShareIcon className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-semibold text-purple-900 dark:text-purple-300">
                    Wants to share
                  </span>
                </div>
              )}

              <button
                data-expand-button
                onClick={handleExpandClick}
                className="absolute top-1 right-1 bg-gray-50 dark:bg-gray-700 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-700 dark:text-gray-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className={`absolute left-0 right-0 top-full z-[10] animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            <div className="overflow-hidden bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700">
              <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <DocumentIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                      Details
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFullDateTime(person.created_at)}
                  </p>
                </div>
              </div>

              <div className="p-4">
                {person?.content && (
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700">
                    <p className="text-sm leading-relaxed text-gray-900 whitespace-pre-wrap dark:text-gray-100">
                      {person.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
