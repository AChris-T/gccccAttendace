import React from 'react';

const InfoField = ({ field, value }) => {
  const Icon = field.icon;

  return (
    <div className="relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-sm">
          <Icon
            width={18}
            height={18}
            className="text-white"
            fill="currentColor"
          />
        </div>
        <p className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
          {field.label}
        </p>
      </div>
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 pl-12">
        {value || (
          <span className="text-gray-400 dark:text-gray-500 font-normal">
            Not assigned
          </span>
        )}
      </p>
    </div>
  );
};

export default InfoField;
