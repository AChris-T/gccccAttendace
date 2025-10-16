export const InfoField = ({ icon: Icon, label, value, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
        green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
        teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
        pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
        orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
        cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
        indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    };

    return (
        <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                <p className={`text-base font-semibold ${value ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 italic'} truncate`}>
                    {value || 'Not provided'}
                </p>
            </div>
        </div>
    );
};
