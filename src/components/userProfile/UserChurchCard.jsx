import { useAuthStore } from "@/store/auth.store";
import { CommunityIcon, WorkerIcon, AssistantIcon, MemberIcon, LeaderIcon3 } from "@/icons";

export default function UserChurchCard() {
  const { user } = useAuthStore();

  const ledUnits = user?.ledUnits || [];
  const assistedUnits = user?.assistedUnits || [];
  const memberUnits = user?.memberUnits || [];

  const fields = [
    {
      label: "Community",
      value: user?.community,
      icon: CommunityIcon
    },
    {
      label: "Worker",
      value: user?.worker,
      icon: WorkerIcon
    },
  ];

  const unitSections = [
    {
      title: "Led Units",
      units: ledUnits,
      icon: LeaderIcon3,
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-500/10"
    },
    {
      title: "Assisted Units",
      units: assistedUnits,
      icon: AssistantIcon,
      colorClass: "text-purple-600 dark:text-purple-400",
      bgClass: "bg-purple-50 dark:bg-purple-500/10"
    },
    {
      title: "Member Units",
      units: memberUnits,
      icon: MemberIcon,
      colorClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50 dark:bg-emerald-500/10"
    }
  ];

  return (
    <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-colors mb-6">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60 lg:px-6 lg:pt-6">
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
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.label}
                className="relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
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
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 pl-11">
                  {field.value || (
                    <span className="text-gray-400 dark:text-gray-500">Not assigned</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Units Section */}
      <div className="px-5 pb-5 lg:px-6 lg:pb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {unitSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`flex items-center justify-center w-7 h-7 rounded-lg ${section.bgClass}`}>
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

                {section.units.length > 0 ? (
                  <ul className="space-y-2">
                    {section.units.map((unit) => (
                      <li
                        key={unit.id || unit.name}
                        className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${section.bgClass} ${section.colorClass}`}></span>
                        {unit.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 py-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                      No units assigned
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}