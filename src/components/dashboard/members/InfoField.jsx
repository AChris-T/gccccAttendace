export const InfoField = ({ icon: Icon, label, value }) => {
    // Format the display value based on type
    const getDisplayValue = () => {
        // Handle null or undefined
        if (value === null || value === undefined) {
            return (
                <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                    Not assigned
                </span>
            );
        }

        // Handle boolean values
        if (typeof value === 'boolean') {
            return (
                <span className={`font-semibold ${value ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {value ? 'Yes' : 'No'}
                </span>
            );
        }

        // Handle empty strings
        if (typeof value === 'string' && value.trim() === '') {
            return (
                <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                    Not assigned
                </span>
            );
        }

        // Handle numbers (including 0)
        if (typeof value === 'number') {
            return value.toString();
        }

        // Handle arrays
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return (
                    <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                        Not provided
                    </span>
                );
            }
            return value.join(', ');
        }

        // Handle objects
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        // Default: return the value as string
        return String(value);
    };

    return (
        <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                <p className={`text-base font-semibold ${value ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 italic'} truncate`}>
                    {getDisplayValue()}
                </p>
            </div>
        </div>
    );
};
