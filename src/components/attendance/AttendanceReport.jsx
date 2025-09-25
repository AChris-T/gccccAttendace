// import { Flame, CheckCircle } from "lucide-react";

export default function AttendanceReport({ longest = 5, current = 2, calendar }) {
    return (
        <div className="p-6 bg-white shadow rounded-2xl">
            {/* Streak Counter */}
            <div className="flex items-center gap-2 mb-4">
                {/* <Flame className="text-orange-500 w-6 h-6 animate-pulse" /> */}
                <span className="text-xl font-bold text-gray-800">
                    {current} Service Streak
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                    className="bg-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${(current / longest) * 100}%` }}
                />
            </div>
            <p className="text-sm text-gray-500">
                Longest streak this month: <strong>{longest}</strong>
            </p>

            {/* Calendar (simplified) */}
            {/* <div className="grid grid-cols-7 gap-2 mt-6">
                {calendar.map((day) => (
                    <div
                        key={day.date}
                        className={`p-2 text-center rounded-lg ${day.attended
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-400"
                            }`}
                    >
                        {day.day}
                        {day.attended && <CheckCircle className="w-4 h-4 mx-auto mt-1" />}
                    </div>
                ))}
            </div> */}
        </div>
    );
}
