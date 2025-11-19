import Button from '@/components/ui/Button';
import {
  CheckIcon,
  HomeIcon,
  ReceiptIcon,
  UtensilsIcon,
  BusIcon,
} from '@/icons/EventsIcons';

export default function CostBreakdown({
  calculations,
  transportation,
  saved,
  isPending,
  onSave,
}) {
  return (
    <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50">
      <h2 className="flex items-center gap-2 mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        <span className="text-blue-600">
          <ReceiptIcon />
        </span>
        Cost Breakdown
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-lg dark:bg-blue-900/30">
              <HomeIcon />
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-white">
                Accommodation
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {calculations.couples
                  ? `${calculations.nights} day${
                      calculations.nights !== 1 ? 's' : ''
                    } × ₦10,000`
                  : `${calculations.nights} night${
                      calculations.nights !== 1 ? 's' : ''
                    } × ₦7,000`}
              </div>
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            ₦{calculations.accommodation.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-green-600 bg-green-100 rounded-lg dark:bg-green-900/30">
              <UtensilsIcon />
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-white">
                Feeding
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {calculations.numDays} day
                {calculations.numDays !== 1 ? 's' : ''} × ₦1,500
              </div>
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            ₦{calculations.feedingCost.toLocaleString()}
          </div>
        </div>
        {calculations.transportCost > 0 && (
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 text-purple-600 bg-purple-100 rounded-lg dark:bg-purple-900/30">
                <BusIcon />
              </div>
              <div>
                <div className="font-medium text-slate-900 dark:text-white">
                  Transportation
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {transportation.to && transportation.fro
                    ? 'To & From'
                    : transportation.to
                    ? 'To Lagos'
                    : 'From Lagos'}
                </div>
              </div>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              ₦{calculations.transportCost.toLocaleString()}
            </div>
          </div>
        )}

        <div className="pt-4 mt-4 border-t-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              Total Amount
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ₦{calculations.total.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full mt-5 "
        onClick={onSave}
        disabled={saved || isPending}
        loading={isPending}
        size="md"
        variant="primary"
      >
        {saved
          ? 'Registration Saved'
          : isPending
          ? 'Saving...'
          : 'Save Registration'}
      </Button>
    </div>
  );
}
