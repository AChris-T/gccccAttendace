import { CoupleIcon } from '@/icons/EventsIcons';
import Switch from '@/components/form/Switch';

export default function AccommodationType({ couples, onCouplesChange }) {
  return (
    <div className="p-6 border-b sm:p-8 border-slate-200 dark:border-slate-700">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        <span className="text-blue-600">
          <CoupleIcon />
        </span>
        Accommodation Type
      </h2>

      <div className="flex flex-col justify-between gap-3 md:items-center md:flex-row">
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium ${
              !couples ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            Single
          </span>

          <Switch checked={couples} onChange={onCouplesChange} />

          <span
            className={`text-sm font-medium ${
              couples ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            Couple
          </span>
        </div>

        <div className="text-sm md:ml-4 text-slate-600 dark:text-slate-400">
          {couples ? '₦10,000 per night' : '₦7,000 per night'}
        </div>
      </div>
    </div>
  );
}

