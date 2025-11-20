import { CheckIcon } from '@/icons/EventsIcons';

export default function RegistrationSummary({
  registrationData,
  //readyToPay,
  onNewRegistration,
  // onProceedToPay,
  //isProcessingPayment = false,
}) {
  const transaction = registrationData.transactions?.[0];

  const getTransactionClasses = (status) => {
    if (!status)
      return { bg: 'bg-gray-100 border-gray-300', text: 'text-gray-700' };

    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case 'pending':
        return {
          bg: 'bg-yellow-100 border-yellow-300',
          text: 'text-yellow-700',
        };
      case 'successful':
        return { bg: 'bg-green-100 border-green-300', text: 'text-green-700' };
      default:
        return { bg: 'bg-gray-100 border-gray-300', text: 'text-gray-700' };
    }
  };

  const transactionClasses = transaction
    ? getTransactionClasses(transaction.status)
    : null;

  return (
    <div className="p-6 bg-white sm:p-8 dark:bg-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
          <span className="text-green-600">
            <CheckIcon />
          </span>
          Registration Summary
        </h2>
        <button
          onClick={onNewRegistration}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          New Registration
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-700">
              <th className="px-4 py-3 text-sm font-semibold text-left text-slate-900 dark:text-white">
                Item
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-slate-900 dark:text-white">
                Details
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-right text-slate-900 dark:text-white">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                Event
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                {registrationData.event}
              </td>
              <td className="px-4 py-3 text-sm text-right text-slate-600 dark:text-slate-400">
                -
              </td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                Dates
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                {registrationData.selectedDates.join(', ')}
              </td>
              <td className="px-4 py-3 text-sm text-right text-slate-600 dark:text-slate-400">
                {registrationData.numDays} day
                {registrationData.numDays !== 1 ? 's' : ''}
              </td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                Accommodation
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                {registrationData.couples
                  ? `${registrationData.numDays} day${
                      registrationData.numDays !== 1 ? 's' : ''
                    } × ₦10,000`
                  : `${registrationData.nights} night${
                      registrationData.nights !== 1 ? 's' : ''
                    } × ₦7,000`}
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-right text-slate-900 dark:text-white">
                ₦{registrationData.accommodation.toLocaleString()}
              </td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                Feeding
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                {registrationData.feeding
                  ? `${registrationData.numDays} day${
                      registrationData.numDays !== 1 ? 's' : ''
                    } × ₦1,500`
                  : 'Not included'}
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-right text-slate-900 dark:text-white">
                ₦{registrationData.feedingCost.toLocaleString()}
              </td>
            </tr>
            {registrationData.transportCost > 0 && (
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                  Transportation
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                  {registrationData.transportation.to &&
                  registrationData.transportation.fro
                    ? 'To & From Lagos'
                    : registrationData.transportation.to
                    ? 'To Lagos'
                    : 'From Lagos'}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-right text-slate-900 dark:text-white">
                  ₦{registrationData.transportCost.toLocaleString()}
                </td>
              </tr>
            )}
            <tr className="border-t-2 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <td className="px-4 py-4 text-base font-bold text-slate-900 dark:text-white">
                Total Amount
              </td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 text-xl font-bold text-right text-blue-600 dark:text-blue-400">
                ₦{registrationData.total.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-5">
        <p className="text-sm italic text-red-500">
          Please make your payment to the account details below, using{' '}
          <strong>SOD 25</strong> as the payment description.
        </p>
        <img
          src="/images/contribution.jpg"
          className="rounded shadow"
          alt="contribution"
        />
      </div>

      {/* <>
        {transaction ? (
          <div
            className={`p-4 mt-6 rounded-xl border ${transactionClasses.bg}`}
          >
            <p className={`font-semibold ${transactionClasses.text}`}>
              Payment Status: {transaction.status}
            </p>
            <p className={`mt-1 text-sm ${transactionClasses.text}`}>
              Reference: {transaction.transaction_reference}
            </p>
          </div>
        ) : (
          readyToPay && (
            <div className="mt-6">
              <button
                onClick={onProceedToPay}
                disabled={isProcessingPayment}
                className={`w-full py-4 font-semibold text-white transition-all duration-200 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 ${
                  isProcessingPayment
                    ? 'opacity-70 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                {isProcessingPayment
                  ? 'Processing payment...'
                  : 'Proceed to Pay with Paystack'}
              </button>
            </div>
          )
        )}
      </> */}
    </div>
  );
}
