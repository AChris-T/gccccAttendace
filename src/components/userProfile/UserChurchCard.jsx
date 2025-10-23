import { useAuthStore } from '@/store/auth.store';
import {
  CommunityIcon,
  WorkerIcon,
  AssistantIcon,
  MemberIcon,
  LeaderIcon3,
} from '@/icons';
import InfoField from '@/components/userProfile/church/InfoField';
import UnitSection from '@/components/userProfile/church/UnitSection';
import {
  UnitLeaderIcon,
  UnitAssistantIcon,
  UnitMemberIcon,
} from '@/components/userProfile/church/UnitIcons';

// Configuration
const FIELD_CONFIG = [
  {
    label: 'Community',
    key: 'community',
    icon: CommunityIcon,
  },
  {
    label: 'Worker',
    key: 'worker',
    icon: WorkerIcon,
  },
];

const UNIT_SECTIONS = [
  {
    title: 'Led Units',
    key: 'ledUnits',
    icon: LeaderIcon3,
    unitIcon: UnitLeaderIcon,
    badgeColor: 'primary',
    badgeLabel: 'Leader',
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-500/10',
    hoverClass: 'hover:bg-blue-100 dark:hover:bg-blue-500/20',
    borderClass: 'border-blue-200 dark:border-blue-500/30',
  },
  {
    title: 'Assisted Units',
    key: 'assistedUnits',
    icon: AssistantIcon,
    unitIcon: UnitAssistantIcon,
    badgeColor: 'warning',
    badgeLabel: 'Assistant',
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-50 dark:bg-purple-500/10',
    hoverClass: 'hover:bg-purple-100 dark:hover:bg-purple-500/20',
    borderClass: 'border-purple-200 dark:border-purple-500/30',
  },
  {
    title: 'Member Units',
    key: 'memberUnits',
    icon: MemberIcon,
    unitIcon: UnitMemberIcon,
    badgeColor: 'success',
    badgeLabel: 'Member',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-50 dark:bg-emerald-500/10',
    hoverClass: 'hover:bg-emerald-100 dark:hover:bg-emerald-500/20',
    borderClass: 'border-emerald-200 dark:border-emerald-500/30',
  },
];

export default function UserChurchCard() {
  const { user } = useAuthStore();

  const fields = FIELD_CONFIG.map((field) => ({
    ...field,
    value: user?.[field.key],
  }));

  const unitSections = UNIT_SECTIONS.map((section) => ({
    ...section,
    units: user?.[section.key] || [],
  }));

  return (
    <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60 lg:px-6 lg:pt-6 bg-linear-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
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
          {user?.roles?.includes('admin') &&
            unitSections.map((section) => (
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
