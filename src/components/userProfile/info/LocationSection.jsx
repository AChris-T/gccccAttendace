const LocationSection = ({ locationInfo, address, LocationIcon }) => (
  <div className="p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-linear-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800/50">
    <h4 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
      <LocationIcon width={18} height={18} className="text-gray-500" />
      Location Information
    </h4>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
      {locationInfo.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.label} className="mb-1.5 flex items-start gap-3">
            <div
              className={`bg-blue-100 dark:bg-gray-500 flex items-center justify-center w-9 h-9 rounded-lg shrink-0`}
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
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 wrap-break-words">
                {field.value || (
                  <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                    Not provided
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    <div className="pt-3 border-t border-gray-200 dark:border-gray-700/60">
      <p className="mb-1.5 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
        Address
      </p>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 wrap-break-word">
        {address || (
          <span className="text-gray-400 dark:text-gray-500 font-normal italic">
            No address provided
          </span>
        )}
      </p>
    </div>
  </div>
);

export default LocationSection;
