import { BusIcon } from '@/icons/EventsIcons';

export default function TransportationSection({
  transportation,
  onTransportationChange,
}) {
  return (
    <div className="p-6 border-b sm:p-8 border-slate-200 dark:border-slate-700">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        <span className="text-blue-600">
          <BusIcon />
        </span>
        Transportation (Optional)
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center p-4 transition-all border-2 cursor-pointer rounded-xl border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700">
          <input
            type="checkbox"
            checked={transportation.to}
            onChange={(e) => {
              onTransportationChange({
                ...transportation,
                to: e.target.checked,
              });
            }}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <div className="ml-3">
            <div className="font-medium text-slate-900 dark:text-white">
              To Lagos
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              ₦5,000
            </div>
          </div>
        </label>

        <label className="flex items-center p-4 transition-all border-2 cursor-pointer rounded-xl border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700">
          <input
            type="checkbox"
            checked={transportation.fro}
            onChange={(e) => {
              onTransportationChange({
                ...transportation,
                fro: e.target.checked,
              });
            }}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <div className="ml-3">
            <div className="font-medium text-slate-900 dark:text-white">
              From Lagos
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              ₦5,000
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

