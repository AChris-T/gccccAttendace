import { useAuthStore } from "@/store/auth.store";
import { CommunityIcon, WorkerIcon, AssistantIcon, MemberIcon, LeaderIcon3 } from "@/icons";
import Badge from "@/components/ui/Badge";

// Unit Type Icons
export const UnitLeaderIcon = ({ width = 20, height = 20, className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const UnitAssistantIcon = ({ width = 20, height = 20, className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const UnitMemberIcon = ({ width = 20, height = 20, className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
  </svg>
);

export const BuildingIcon = ({ width = 20, height = 20, className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

// Configuration
const FIELD_CONFIG = [
  {
    label: "Community",
    key: "community",
    icon: CommunityIcon
  },
  {
    label: "Worker",
    key: "worker",
    icon: WorkerIcon
  }
];

const UNIT_SECTIONS = [
  {
    title: "Led Units",
    key: "ledUnits",
    icon: LeaderIcon3,
    unitIcon: UnitLeaderIcon,
    badgeColor: "primary",
    badgeLabel: "Leader",
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-500/10",
    hoverClass: "hover:bg-blue-100 dark:hover:bg-blue-500/20",
    borderClass: "border-blue-200 dark:border-blue-500/30"
  },
  {
    title: "Assisted Units",
    key: "assistedUnits",
    icon: AssistantIcon,
    unitIcon: UnitAssistantIcon,
    badgeColor: "warning",
    badgeLabel: "Assistant",
    colorClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-500/10",
    hoverClass: "hover:bg-purple-100 dark:hover:bg-purple-500/20",
    borderClass: "border-purple-200 dark:border-purple-500/30"
  },
  {
    title: "Member Units",
    key: "memberUnits",
    icon: MemberIcon,
    unitIcon: UnitMemberIcon,
    badgeColor: "success",
    badgeLabel: "Member",
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-500/10",
    hoverClass: "hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
    borderClass: "border-emerald-200 dark:border-emerald-500/30"
  }
];

// Subcomponents
const InfoField = ({ field, value }) => {
  const Icon = field.icon;

  return (
    <div className="relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-sm">
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
          <span className="text-gray-400 dark:text-gray-500 font-normal">Not assigned</span>
        )}
      </p>
    </div>
  );
};

const UnitListItem = ({ unit, section }) => {
  const UnitIcon = section.unitIcon;

  return (
    <li className={`group flex items-center justify-between gap-3 p-3 rounded-lg border ${section.borderClass} ${section.bgClass} ${section.hoverClass} transition-all duration-200`}>
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div className={`flex-shrink-0 w-7 h-7 rounded-lg ${section.bgClass} flex items-center justify-center ${section.borderClass}`}>
          <UnitIcon
            width={14}
            height={14}
            className={section.colorClass}
          />
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

const UnitSection = ({ section, units }) => {
  const Icon = section.icon;
  const hasUnits = units && units.length > 0;

  return (
    <div className="p-4 lg:p-5 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${section.bgClass} ${section.borderClass}`}>
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
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${section.bgClass} ${section.colorClass}`}>
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

// Main Component
export default function UserChurchCard() {
  const { user } = useAuthStore();

  const fields = FIELD_CONFIG.map(field => ({
    ...field,
    value: user?.[field.key]
  }));

  const unitSections = UNIT_SECTIONS.map(section => ({
    ...section,
    units: user?.[section.key] || []
  }));

  return (
    <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-colors mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60 lg:px-6 lg:pt-6 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Unit Information
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your church roles and assignments
        </p>
      </div>

      {/* Community & Worker Section */}
      <div className="px-5 py-5 lg:px-6 lg:py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {fields.map((field) => (
            <InfoField key={field.label} field={field} value={field.value} />
          ))}
        </div>
      </div>

      {/* Units Section */}
      <div className="px-5 pb-5 lg:px-6 lg:pb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {unitSections.map((section) => (
            <UnitSection
              key={section.key}
              section={section}
              units={section.units}
            />
          ))}
        </div>
      </div>
    </div>
  );
}