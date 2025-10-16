import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import {
  CalendarIcon,
  ChevronDownIcon,
  MessageIcon,
  UserIcon,
  PhoneIcon,
} from '@/icons';
import { getTimeAgo, formatFullDateTime } from '@/utils/helper';

const typeColors = {
  prayer: 'purple',
  question: 'blue',
  testimony: 'success',
};

export default function FormCard({ person }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow transition-all duration-300 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 w-full p-5 sm:p-6 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-xl"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar size="md" name={''} alt={''} />
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                {person?.name || 'Anonymous User'}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600 dark:text-gray-400">
                {person?.phone_number ? (
                  <>
                    <PhoneIcon className="w-4 h-4" />
                    <span>{person.phone_number}</span>
                  </>
                ) : (
                  <span></span>
                )}
              </div>
            </div>

            <div
              className={`transform transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              } flex-shrink-0`}
            >
              <ChevronDownIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
          </div>

          {/* Type and Status */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge size="sm" color={typeColors[person.type] || 'gray'}>
              {person.type?.charAt(0).toUpperCase() + person.type?.slice(1)}
            </Badge>

            <Badge size="sm" color="light">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{formatFullDateTime(person.created_at)}</span>
            </Badge>

            {!person.is_completed && (
              <Badge size="sm" color="warning">
                Pending
              </Badge>
            )}
          </div>
        </div>
      </button>

      {/* Collapsible Content */}
      <div
        className={`absolute left-0 right-0 top-full bg-white dark:bg-gray-800 rounded-b-xl border-t border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? 'max-h-[400px] overflow-y-auto opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ zIndex: 20 }}
      >
        <div className="px-5 sm:px-6 pb-6">
          <div className="mt-5">
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-2">
              <MessageIcon className="w-4 h-4" />
              Message Content
            </h4>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {person.content || 'No message content provided.'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
              Submitted {getTimeAgo(person.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
