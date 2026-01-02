const InfoField = ({ field, value }) => {
  const Icon = field.icon;

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
            Not assigned
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
    <div className="group relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-linear-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all">
      <div className="flex items-start gap-3">
        <div
          className={`bg-blue-100 dark:bg-gray-500 flex items-center justify-center w-9 h-9 rounded-lg transition-transform group-hover:scale-110 shrink-0`}
        >
          <Icon
            width={20}
            height={20}
            className="text-blue-700 dark:text-gray-800"
            fill="currentColor"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {field.label}
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {getDisplayValue()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoField;