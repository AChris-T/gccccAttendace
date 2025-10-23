import React from 'react';
import UnitListItem from './UnitListItem';

const UnitSection = ({ section, units }) => {
  const Icon = section.icon;
  const hasUnits = units && units.length > 0;

  return (
    <div className="p-4 lg:p-5 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-linear-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg ${section.bgClass} ${section.borderClass}`}
          >
            <Icon
              width={16}
              height={16}
              className={section.colorClass}
              fill="currentColor"
            />
          </div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {section.title}
          </h4>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${section.bgClass} ${section.colorClass}`}
        >
          {hasUnits ? units.length : 0}
        </span>
      </div>

      {hasUnits ? (
        <ul className="space-y-2">
          {units.map((unit) => (
            <UnitListItem
              key={unit.id || unit.name}
              unit={unit}
              section={section}
            />
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center p-4">
          <div className="text-center">
            <span className="text-xs text-gray-400 dark:text-gray-500 italic">
              No units assigned
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitSection;
