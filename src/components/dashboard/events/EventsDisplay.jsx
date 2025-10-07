import { EmptyState } from '@/components/common/EmptyState';
import React, { useState, useMemo } from 'react';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

const UtensilsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 2v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2M7 2v20M15 2v9c0 1.1.9 2 2 2 1.1 0 2-.9 2-2V2" />
    </svg>
);

const BusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
);

const ReceiptIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

const EventCalculator = ({ event, onBack }) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [transportation, setTransportation] = useState({ to: false, fro: false });
    const [feeding, setFeeding] = useState(false);
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
                full: date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
            });
        }
        return days;
    }, []);

    const toggleDay = (index) => {
        setSaved(false);
        setRegistrationData(null);
        const newSelected = [...selectedDays];
        const dayIndex = newSelected.indexOf(index);

        if (dayIndex > -1) {
            newSelected.splice(dayIndex, 1);
        } else {
            newSelected.push(index);
        }

        setSelectedDays(newSelected.sort((a, b) => a - b));
    };

    const isConsecutive = useMemo(() => {
        if (selectedDays.length === 0) return true;
        const sorted = [...selectedDays].sort((a, b) => a - b);
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] - sorted[i - 1] !== 1) return false;
        }
        return true;
    }, [selectedDays]);

    const calculations = useMemo(() => {
        const numDays = selectedDays.length;
        const nights = Math.max(0, numDays - 1);
        const accommodation = nights * 7000;
        const feedingCost = feeding ? numDays * 1500 : 0;
        const transportCost = (transportation.to ? 5000 : 0) + (transportation.fro ? 5000 : 0);
        const total = accommodation + feedingCost + transportCost;

        return { numDays, nights, accommodation, feeding, feedingCost, transportCost, total };
    }, [selectedDays, transportation, feeding]);

    const handleSave = () => {
        if (selectedDays.length === 0 || !isConsecutive) return;
        setSaved(true);

        const savedData = {
            event: event.title,
            selectedDates: selectedDays.map(i => dates[i].full),
            ...calculations,
            transportation,
            timestamp: new Date().toISOString()
        };

        setRegistrationData(savedData);
    };

    return (
        <>
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
                <ArrowLeftIcon />
                Back to Events
            </button>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-slate-800 rounded shadow overflow-hidden">
                {/* Event Header */}
                <div>
                    <div className="relative h-48 bg-gradient-to-br from-red-700 via-red-600 to-amber-600 overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative h-full flex items-center justify-center text-center px-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
                                <p className="text-white/90 text-lg">{event.date}</p>
                            </div>
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="text-blue-600">
                                <CalendarIcon />
                            </span>
                            Select Your Days
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Choose consecutive days you'll attend
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                            {dates.map((d, i) => (
                                <button
                                    key={i}
                                    onClick={() => toggleDay(i)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedDays.includes(i)
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                                        : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700'
                                        }`}
                                >
                                    <div className={`text-xs font-medium mb-1 ${selectedDays.includes(i)
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-slate-500 dark:text-slate-400'
                                        }`}>
                                        {d.day}
                                    </div>
                                    <div className={`text-lg font-bold ${selectedDays.includes(i)
                                        ? 'text-blue-700 dark:text-blue-300'
                                        : 'text-slate-900 dark:text-white'
                                        }`}>
                                        {d.date}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {!isConsecutive && selectedDays.length > 0 && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-700 dark:text-red-400">
                                    ⚠️ Please select consecutive days only
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Transportation */}
                    <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="text-blue-600">
                                <BusIcon />
                            </span>
                            Transportation (Optional)
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                                <input
                                    type="checkbox"
                                    checked={transportation.to}
                                    onChange={(e) => {
                                        setSaved(false);
                                        setRegistrationData(null);
                                        setTransportation({ ...transportation, to: e.target.checked });
                                    }}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                    <div className="font-medium text-slate-900 dark:text-white">To Lagos</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">₦5,000</div>
                                </div>
                            </label>

                            <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                                <input
                                    type="checkbox"
                                    checked={transportation.fro}
                                    onChange={(e) => {
                                        setSaved(false);
                                        setRegistrationData(null);
                                        setTransportation({ ...transportation, fro: e.target.checked });
                                    }}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                    <div className="font-medium text-slate-900 dark:text-white">From Lagos</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">₦5,000</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Feeding */}
                    <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="text-blue-600">
                                <UtensilsIcon />
                            </span>
                            Feeding (Optional)
                        </h2>

                        <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
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
                                <div className="font-medium text-slate-900 dark:text-white">Include Feeding</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">₦1,500 per day</div>
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    {/* Cost Breakdown */}
                    {selectedDays.length > 0 && isConsecutive && (
                        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="text-blue-600">
                                    <ReceiptIcon />
                                </span>
                                Cost Breakdown
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                                            <HomeIcon />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">Accommodation</div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                {calculations.nights} night{calculations.nights !== 1 ? 's' : ''} × ₦7,000
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                                        ₦{calculations.accommodation.toLocaleString()}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600">
                                            <UtensilsIcon />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">Feeding</div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                {calculations.numDays} day{calculations.numDays !== 1 ? 's' : ''} × ₦1,500
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
                                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600">
                                                <BusIcon />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">Transportation</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    {transportation.to && transportation.fro ? 'To & From' : transportation.to ? 'To Lagos' : 'From Lagos'}
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
                                        <div className="text-xl font-bold text-slate-900 dark:text-white">Total Amount</div>
                                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            ₦{calculations.total.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={saved}
                                className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${saved
                                    ? 'bg-green-600 cursor-default'
                                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                                    }`}
                            >
                                {saved ? (
                                    <>
                                        <CheckIcon />
                                        Registration Saved
                                    </>
                                ) : (
                                    'Save Registration'
                                )}
                            </button>
                        </div>
                    )}

                    {/* Registration Summary Table */}
                    {saved && registrationData && (
                        <div className="p-6 sm:p-8 bg-white dark:bg-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
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
                                    }}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                >
                                    New Registration
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                                                Item
                                            </th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                                                Details
                                            </th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">
                                                Event
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {registrationData.event}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-slate-600 dark:text-slate-400">
                                                -
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">
                                                Dates
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {registrationData.selectedDates.join(', ')}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-slate-600 dark:text-slate-400">
                                                {registrationData.numDays} day{registrationData.numDays !== 1 ? 's' : ''}
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">
                                                Accommodation
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {registrationData.nights} night{registrationData.nights !== 1 ? 's' : ''} × ₦7,000
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">
                                                ₦{registrationData.accommodation.toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">
                                                Feeding
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {registrationData.feeding
                                                    ? `${registrationData.numDays} day${registrationData.numDays !== 1 ? 's' : ''} × ₦1,500`
                                                    : 'Not included'}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">
                                                ₦{registrationData.feedingCost.toLocaleString()}
                                            </td>
                                        </tr>
                                        {registrationData.transportCost > 0 && (
                                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">
                                                    Transportation
                                                </td>
                                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                    {registrationData.transportation.to && registrationData.transportation.fro
                                                        ? 'To & From Lagos'
                                                        : registrationData.transportation.to
                                                            ? 'To Lagos'
                                                            : 'From Lagos'}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">
                                                    ₦{registrationData.transportCost.toLocaleString()}
                                                </td>
                                            </tr>
                                        )}
                                        <tr className="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-200 dark:border-blue-800">
                                            <td className="py-4 px-4 text-base font-bold text-slate-900 dark:text-white">
                                                Total Amount
                                            </td>
                                            <td className="py-4 px-4"></td>
                                            <td className="py-4 px-4 text-right text-xl font-bold text-blue-600 dark:text-blue-400">
                                                ₦{registrationData.total.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                    <p className="mb-1">
                                        <span className="font-semibold">Registration ID:</span> {registrationData.timestamp}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Registered on:</span> {new Date(registrationData.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default function EventsDisplay() {
    const getInitialTab = () => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        return ['upcoming', 'ongoing', 'past'].includes(tab) ? tab : 'upcoming';
    };

    const [activeTab, setActiveTab] = useState(getInitialTab());
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Update URL when tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        const url = new URL(window.location);
        url.searchParams.set('tab', tab);
        window.history.pushState({}, '', url);
    };

    React.useEffect(() => {
        const handlePopState = () => {
            setActiveTab(getInitialTab());
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const events = {
        upcoming: [
            {
                id: 1,
                title: "School of Destiny 2025",
                subtitle: "The Call",
                date: "December 15-21, 2025",
                location: "Glory Centre Community Church, Lagos",
                address: "No 12, Efon Alaye Close, Off Olajide Street, Ojodu Berger, Lagos",
                description: "A life-changing annual convention where we seek God's face and prepare for the upcoming year. This year's theme 'The Call' is an important beckoning to everyone whom God will use and walk with in these times.",
                status: "Preparation",
                imageUrl: "/images/sod-2025.png",
                ministers: ["Pst. Olakunle Zakariya", "Pst. Adesola Zakariya"],
                highlights: [
                    "Soul-stirring worship and music",
                    "Deep sermons from respected pastors",
                    "Community prayer sessions",
                    "Deliverance and renewal sessions"
                ]
            }
        ],
        ongoing: [],
        past: []
    };

    if (selectedEvent) {
        return (
            <EventCalculator event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        );
    }

    return (

        <>
            {/* Tabs */}
            <div className="flex mb-10 border-b">
                <div className="inline-flex bg-white dark:bg-slate-800 rounded p-1.5 shadow">
                    {['upcoming', 'ongoing', 'past'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-3 rounded font-semibold transition-all duration-200 capitalize ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow'
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {tab}
                            {events[tab].length > 0 && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab
                                    ? 'bg-white/20'
                                    : 'bg-slate-200 dark:bg-slate-700'
                                    }`}>
                                    {events[tab].length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Events Grid */}
            <>
                {events[activeTab].length > 0 ? (
                    events[activeTab].map((event) => (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div
                                key={event.id}
                                className="bg-white dark:bg-slate-800 rounded shadow overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Event Image/Banner */}
                                <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                                    {event.imageUrl ? (
                                        <>
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-amber-600"></div>
                                            <div className="absolute inset-0 bg-black/20"></div>
                                        </>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-amber-400 text-slate-900 text-xs font-bold rounded-full shadow-lg">
                                            {event.status}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{event.title}</h3>
                                        <p className="text-white/90 drop-shadow-md">{event.subtitle}</p>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="p-6">
                                    <div className="space-y-1 font-medium mb-4">
                                        <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                            <CalendarIcon />
                                            <span className="text-base">{event.date}</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                            <MapPinIcon />
                                            <span className="text-base">{event.location}</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                            <UsersIcon />
                                            <span className="text-base">{event.ministers.join(', ')}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                                        {event.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            Event Highlights
                                        </h4>
                                        <ul className="space-y-1">
                                            {event.highlights.slice(0, 3).map((highlight, i) => (
                                                <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                                    <span className="text-blue-600 mt-0.5">•</span>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => setSelectedEvent(event)}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
                                    >
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyState title={`No ${activeTab} events`} description={`Check back later for ${activeTab} events`} />
                )}
            </>
        </>
    );
}