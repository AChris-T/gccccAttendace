import React from 'react';
import Badge from '@/components/ui/Badge';

const UnitListItem = ({ unit, section }) => {
  const UnitIcon = section.unitIcon;

  return (
    <li
      className={`group flex items-center justify-between gap-3 p-3 rounded-lg border ${section.borderClass} ${section.bgClass} ${section.hoverClass} transition-all duration-200`}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div
          className={`shrink-0 w-7 h-7 rounded-lg ${section.bgClass} flex items-center justify-center ${section.borderClass}`}
        >
          <UnitIcon width={14} height={14} className={section.colorClass} />
        </div>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {unit.name}
        </span>
      </div>
      <Badge size="sm" color={section.badgeColor}>
        {section.badgeLabel}
      </Badge>
    </li>
  );
};

export default UnitListItem;
