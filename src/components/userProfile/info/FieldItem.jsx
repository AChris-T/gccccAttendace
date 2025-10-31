const FieldItem = ({ Icon, label, value }) => {

  return (
    <div className="group relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-linear-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all">
      <div className="flex items-start gap-3">
        <div
          className={`bg-blue-100 dark:bg-gray-500 flex items-center justify-center w-9 h-9 rounded-lg  transition-transform group-hover:scale-110 shrink-0`}
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
            {label}
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 wrap-break-word">
            {value || (
              <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                Not provided
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FieldItem;
