import React, { useMemo, useState } from 'react';
import { ArrowLeftIcon, BusIcon, CalendarIcon, CheckIcon, HomeIcon, ReceiptIcon, UtensilsIcon, CoupleIcon } from '@/icons/EventsIcons';

export default function EventCalculator({ event, onBack, enableCouples = false, onSuccess }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [transportation, setTransportation] = useState({ to: false, fro: false });
  const [feeding, setFeeding] = useState(false);
  const [couples, setCouples] = useState(false);
  const [saved, setSaved] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const dates = useMemo(() => {
    const start = new Date(2025, 11, 15);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-NG', { weekday: 'short' }),
        full: date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }),
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
    for (let i = 1; i < sorted.length; i++) if (sorted[i] - sorted[i - 1] !== 1) return false;
    return true;
  }, [selectedDays]);

  const calculations = useMemo(() => {
    const numDays = selectedDays.length;
    const nights = Math.max(0, numDays - 1);
    const isCouples = enableCouples && couples;
    const accommodation = isCouples ? numDays * 10000 : nights * 7000;
    const feedingCost = feeding ? numDays * 1500 : 0;
    const transportCost = (transportation.to ? 5000 : 0) + (transportation.fro ? 5000 : 0);
    const couplesCost = 0; // couples pricing baked into accommodation when selected
    const total = accommodation + feedingCost + transportCost + couplesCost;
    return { numDays, nights, accommodation, feeding, feedingCost, transportCost, couples: isCouples, couplesCost, total };
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
    setRegistrationData(savedData);
    onSuccess?.(savedData);
  };

  return (
    <>
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeftIcon />
        Back to Events
      </button>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-slate-800 rounded shadow overflow-hidden">
        <div>
          <div className="relative h-48 bg-linear-to-br from-red-700 via-red-600 to-amber-600 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative h-full flex items-center justify-center text-center px-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
                <p className="text-white/90 text-lg">{event.date}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-blue-600"><CalendarIcon /></span>
              Select Your Days
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Choose consecutive days you'll attend</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {dates.map((d, i) => (
                <button key={i} onClick={() => toggleDay(i)} className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedDays.includes(i)
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}>
                  <div className={`text-xs font-medium mb-1 ${selectedDays.includes(i) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>{d.day}</div>
                  <div className={`text-lg font-bold ${selectedDays.includes(i) ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>{d.date}</div>
                </button>
              ))}
            </div>

            {!isConsecutive && selectedDays.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400">⚠️ Please select consecutive days only</p>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-blue-600"><BusIcon /></span>
              Transportation (Optional)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                <input type="checkbox" checked={transportation.to} onChange={(e) => { setSaved(false); setRegistrationData(null); setTransportation({ ...transportation, to: e.target.checked }); }} className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                <div className="ml-3">
                  <div className="font-medium text-slate-900 dark:text-white">To Lagos</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">₦5,000</div>
                </div>
              </label>

              <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                <input type="checkbox" checked={transportation.fro} onChange={(e) => { setSaved(false); setRegistrationData(null); setTransportation({ ...transportation, fro: e.target.checked }); }} className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                <div className="ml-3">
                  <div className="font-medium text-slate-900 dark:text-white">From Lagos</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">₦5,000</div>
                </div>
              </label>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-blue-600"><UtensilsIcon /></span>
              Feeding (Optional)
            </h2>
            <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <input type="checkbox" checked={feeding} onChange={(e) => { setSaved(false); setRegistrationData(null); setFeeding(e.target.checked); }} className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
              <div className="ml-3">
                <div className="font-medium text-slate-900 dark:text-white">Include Feeding</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">₦1,500 per day</div>
              </div>
            </label>
          </div>

          {enableCouples && (
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-blue-600"><CoupleIcon /></span>
                Couples Selection (Optional)
              </h2>
              <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                <input type="checkbox" checked={couples} onChange={(e) => { setSaved(false); setRegistrationData(null); setCouples(e.target.checked); }} className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                <div className="ml-3">
                  <div className="font-medium text-slate-900 dark:text-white">Couples</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">₦10,000 per day</div>
                </div>
              </label>
            </div>
          )}
        </div>

        <div>
          {selectedDays.length > 0 && isConsecutive && (
            <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-blue-600"><ReceiptIcon /></span>
                Cost Breakdown
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600"><HomeIcon /></div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Accommodation</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {calculations.couples
                          ? `${calculations.numDays} day${calculations.numDays !== 1 ? 's' : ''} × ₦10,000`
                          : `${calculations.nights} night${calculations.nights !== 1 ? 's' : ''} × ₦7,000`}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">₦{calculations.accommodation.toLocaleString()}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600"><UtensilsIcon /></div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Feeding</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{calculations.numDays} day{calculations.numDays !== 1 ? 's' : ''} × ₦1,500</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">₦{calculations.feedingCost.toLocaleString()}</div>
                </div>

                {/* Couples is reflected in accommodation; no separate line */}

                {calculations.transportCost > 0 && (
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600"><BusIcon /></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Transportation</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{transportation.to && transportation.fro ? 'To & From' : transportation.to ? 'To Lagos' : 'From Lagos'}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">₦{calculations.transportCost.toLocaleString()}</div>
                  </div>
                )}

                <div className="pt-4 mt-4 border-t-2 border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-slate-900 dark:text-white">Total Amount</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">₦{calculations.total.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <button onClick={handleSave} disabled={saved} className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${saved ? 'bg-green-600 cursor-default' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}>
                {saved ? (<><CheckIcon /> Registration Saved</>) : 'Save Registration'}
              </button>
            </div>
          )}

          {saved && registrationData && (
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2"><span className="text-green-600"><CheckIcon /></span>Registration Summary</h2>
                <button onClick={() => { setSaved(false); setRegistrationData(null); setSelectedDays([]); setTransportation({ to: false, fro: false }); setFeeding(false); setCouples(false); }} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">New Registration</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">Item</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">Details</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">Event</td><td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{registrationData.event}</td><td className="py-3 px-4 text-sm text-right text-slate-600 dark:text-slate-400">-</td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">Dates</td><td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{registrationData.selectedDates.join(', ')}</td><td className="py-3 px-4 text-sm text-right text-slate-600 dark:text-slate-400">{registrationData.numDays} day{registrationData.numDays !== 1 ? 's' : ''}</td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">Accommodation</td><td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{registrationData.couples ? `${registrationData.numDays} day${registrationData.numDays !== 1 ? 's' : ''} × ₦10,000` : `${registrationData.nights} night${registrationData.nights !== 1 ? 's' : ''} × ₦7,000`}</td><td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">₦{registrationData.accommodation.toLocaleString()}</td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">Feeding</td><td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{registrationData.feeding ? `${registrationData.numDays} day${registrationData.numDays !== 1 ? 's' : ''} × ₦1,500` : 'Not included'}</td><td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">₦{registrationData.feedingCost.toLocaleString()}</td></tr>
                    {/* Couples pricing is included in accommodation; no separate row */}
                    {registrationData.transportCost > 0 && (
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">Transportation</td><td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{registrationData.transportation.to && registrationData.transportation.fro ? 'To & From Lagos' : registrationData.transportation.to ? 'To Lagos' : 'From Lagos'}</td><td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">₦{registrationData.transportCost.toLocaleString()}</td></tr>
                    )}
                    <tr className="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-200 dark:border-blue-800"><td className="py-4 px-4 text-base font-bold text-slate-900 dark:text-white">Total Amount</td><td className="py-4 px-4"></td><td className="py-4 px-4 text-right text-xl font-bold text-blue-600 dark:text-blue-400">₦{registrationData.total.toLocaleString()}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


