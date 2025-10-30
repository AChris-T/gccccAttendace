import { useAuthStore } from '@/store/auth.store';
import { CommunityIcon, WorkerIcon } from '@/icons';
import InfoField from '@/components/userProfile/church/InfoField';
import UserUnitsDetails from '@/components/userProfile/UserUnitsDetials';

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

export default function UserChurchCard() {
  const { user, userUnitsDetails } = useAuthStore();

  const fields = FIELD_CONFIG.map((field) => ({
    ...field,
    value: user?.[field.key],
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

      <div className="px-5 py-5 lg:px-6 lg:py-6 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {fields.map((field) => (
            <InfoField key={field.label} field={field} value={field.value} />
          ))}
        </div>
        <UserUnitsDetails userUnits={userUnitsDetails} />
      </div>
    </div>
  );
}
