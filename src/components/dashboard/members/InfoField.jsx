export const InfoField = ({ icon: Icon, label, value }) => {
    return (
        <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0`}>
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
