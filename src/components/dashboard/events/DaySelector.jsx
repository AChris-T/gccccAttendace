import { CalendarIcon } from '@/icons/EventsIcons';

export default function DaySelector({
  dates,
  selectedDays,
  isConsecutive,
  onToggleDay,
}) {
  return (
    <div className="p-6 border-b sm:p-8 border-slate-200 dark:border-slate-700">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        <span className="text-blue-600">
          <CalendarIcon />
        </span>
        Select Your Days
      </h2>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        Choose consecutive days you'll attend
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => onToggleDay(i)}
            className={`py-1 rounded-xl border-2 transition-all duration-200 ${selectedDays.includes(i)
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-md'
              : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
          >
            <div
              className={`text-xs font-medium mb-1 ${selectedDays.includes(i)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-500 dark:text-slate-400'
                }`}
            >
              {d.day}
            </div>
            <div
              className={`text-lg font-bold ${selectedDays.includes(i)
                ? 'text-blue-700 dark:text-blue-300'
                : 'text-slate-900 dark:text-white'
                }`}
            >
              {d.date}
            </div>
          </button>
        ))}
      </div>

      {!isConsecutive && selectedDays.length > 0 && (
        <div className="p-3 mt-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">
            ⚠️ Please select consecutive days only
          </p>
        </div>
      )}
    </div>
  );
}

