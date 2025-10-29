import React, { useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  BusIcon,
  CalendarIcon,
  CheckIcon,
  HomeIcon,
  ReceiptIcon,
  UtensilsIcon,
  CoupleIcon,
} from '@/icons/EventsIcons';
import usePayment from '@/hooks/usePayment';
import { useAuthStore } from '@/store/auth.store';
import Switch from '@/components/form/Switch';

export default function EventCalculator({
  event,
  onBack,
  enableCouples = false,
  onSuccess,
}) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [transportation, setTransportation] = useState({
    to: false,
    fro: false,
  });
  const [feeding, setFeeding] = useState(false);
  const [couples, setCouples] = useState(false);
  const [saved, setSaved] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [readyToPay, setReadyToPay] = useState(false);
  const { openPaystack, createReference } = usePayment();
  const { user } = useAuthStore();

  const dates = useMemo(() => {
    const start = new Date(2025, 11, 15);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-NG', { weekday: 'short' }),
        full: date.toLocaleDateString('en-NG', {
          month: 'short',
          day: 'numeric',
        }),
      });
    }
    return days;
  }, []);

  const toggleDay = (index) => {
    setSaved(false);
    setRegistrationData(null);
    const newSelected = [...selectedDays];
    const dayIndex = newSelected.indexOf(index);
    if (dayIndex > -1) newSelected.splice(dayIndex, 1);
    else newSelected.push(index);
    setSelectedDays(newSelected.sort((a, b) => a - b));
  };

  const isConsecutive = useMemo(() => {
    if (selectedDays.length === 0) return true;
    const sorted = [...selectedDays].sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i] - sorted[i - 1] !== 1) return false;
    return true;
  }, [selectedDays]);

  const calculations = useMemo(() => {
    const numDays = selectedDays.length;
    const nights = Math.max(0, numDays - 1);
    const isCouples = enableCouples && couples;
    const accommodation = isCouples ? nights * 10000 : nights * 7000;
    const feedingCost = feeding ? numDays * 1500 : 0;
    const transportCost =
      (transportation.to ? 5000 : 0) + (transportation.fro ? 5000 : 0);
    const couplesCost = 0;
    const total = accommodation + feedingCost + transportCost + couplesCost;
    return {
      numDays,
      nights,
      accommodation,
      feeding,
      feedingCost,
      transportCost,
      couples: isCouples,
      couplesCost,
      total,
    };
  }, [selectedDays, transportation, feeding, couples, enableCouples]);

  const handleSave = () => {
    if (selectedDays.length === 0 || !isConsecutive) return;
    setSaved(true);
    const savedData = {
      event: event.title,
      selectedDates: selectedDays.map((i) => dates[i].full),
      ...calculations,
      transportation,
      timestamp: new Date().toISOString(),
    };
    console.log('Event Registration Saved:', savedData);
    setRegistrationData(savedData);
    setReadyToPay(true);
    onSuccess?.(savedData);
  };

  const handleProceedToPay = async () => {
    if (!registrationData) return;
    const email = user?.email || user?.username || 'user@example.com';
    const reference = createReference('EVT');
    const metadata = {
      eventId: event.id,
      eventTitle: event.title,
      dates: registrationData.selectedDates,
    };
    await openPaystack({
      email,
      amount: registrationData.total,
      reference,
      metadata,
    });
  };

  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeftIcon />
        Back to Events
      </button>

      <div className="grid w-full grid-cols-1 gap-10 overflow-hidden bg-white rounded shadow md:grid-cols-2 dark:bg-slate-800">
        <div>
          <div className="relative h-48 overflow-hidden bg-linear-to-br from-red-700 via-red-600 to-amber-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative flex items-center justify-center h-full px-6 text-center">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                  {event.title}
                </h1>
                <p className="text-lg text-white/90">{event.date}</p>
              </div>
            </div>
          </div>

          {enableCouples && (
            <div className="p-6 border-b sm:p-8 border-slate-200 dark:border-slate-700">
              {' '}
              <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                <span className="text-blue-600">
                  <CoupleIcon />
                </span>
                Couples Room (Optional)
              </h2>{' '}
              <div className="flex flex-col justify-between gap-3 md:items-center md:flex-row">
                <Switch
                  label="Couples Room"
                  checked={couples}
                  onChange={(checked) => {
                    setSaved(false);
                    setRegistrationData(null);
                    setCouples(checked);
                  }}
                />
                {couples && (
                  <div className="text-sm md:ml-4 text-slate-600 dark:text-slate-400">
                    ₦10,000 per night
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between gap-3 mt-3 md:items-center md:flex-row">
                <Switch
                  label="Shared Room"
                  checked={!couples}
                  onChange={(checked) => {
                    setSaved(false);
                    setRegistrationData(null);
                    setCouples(!checked);
                  }}
                />
                {!couples && (
                  <div className="text-sm md:ml-4 text-slate-600 dark:text-slate-400">
                    ₦7,000 per night
                  </div>
                )}
              </div>
            </div>
          )}

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
                  onClick={() => toggleDay(i)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedDays.includes(i)
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                      : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div
                    className={`text-xs font-medium mb-1 ${
                      selectedDays.includes(i)
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {d.day}
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      selectedDays.includes(i)
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
                    setSaved(false);
                    setRegistrationData(null);
                    setTransportation({
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
                    setSaved(false);
                    setRegistrationData(null);
                    setTransportation({
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

          <div className="p-6 border-b sm:p-8 border-slate-200 dark:border-slate-700">
            <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-900 dark:text-white">
              <span className="text-blue-600">
                <UtensilsIcon />
              </span>
              Feeding (Optional)
            </h2>
            <label className="flex items-center p-4 transition-all border-2 cursor-pointer rounded-xl border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700">
              <input
                type="checkbox"
                checked={feeding}
                onChange={(e) => {
                  setSaved(false);
                  setRegistrationData(null);
                  setFeeding(e.target.checked);
                }}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="ml-3">
                <div className="font-medium text-slate-900 dark:text-white">
                  Include Feeding
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  ₦1,500 per day
                </div>
              </div>
            </label>
          </div>

          {/* Couples selection moved above using Switch */}
        </div>

        <div>
          {selectedDays.length > 0 && isConsecutive && (
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

              <button
                onClick={handleSave}
                disabled={saved}
                className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  saved
                    ? 'bg-green-600 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
              >
                {saved ? (
                  <>
                    <CheckIcon /> Registration Saved
                  </>
                ) : (
                  'Save Registration'
                )}
              </button>
            </div>
          )}

          {saved && registrationData && (
            <div className="p-6 bg-white sm:p-8 dark:bg-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
                  <span className="text-green-600">
                    <CheckIcon />
                  </span>
                  Registration Summary
                </h2>
                <button
                  onClick={() => {
                    setSaved(false);
                    setRegistrationData(null);
                    setSelectedDays([]);
                    setTransportation({ to: false, fro: false });
                    setFeeding(false);
                    setCouples(false);
                  }}
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

              {readyToPay && (
                <div className="mt-6">
                  <button
                    onClick={handleProceedToPay}
                    className="w-full py-4 font-semibold text-white transition-all duration-200 cursor-pointer rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95"
                  >
                    Proceed to Pay with Paystack
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
