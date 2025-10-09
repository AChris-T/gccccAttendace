export const InfoField = ({ icon: Icon, label, value, fullWidth = false, isEmail = false, isPhone = false }) => (
    <div className={`${fullWidth ? 'col-span-2' : ''}`}>
        <div className="flex items-start gap-2 mb-1">
            <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {label}
            </span>
        </div>
        {isEmail ? (
            <a href={`mailto:${value}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 ml-6 hover:underline">
                {value || 'N/A'}
            </a>
        ) : isPhone ? (
            <a href={`tel:${value}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 ml-6 hover:underline">
                {value || 'N/A'}
            </a>
        ) : (
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 ml-6">
                {value || 'N/A'}
            </p>
        )}
    </div>
);