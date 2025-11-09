import { CrownIcon, StarIcon, UsersIcon } from '@/icons';

const UnitBadge = ({ unit }) => {
    const getRoleBadge = () => {
        if (unit.isLeader) {
            return {
                icon: <CrownIcon className="w-3 h-3" />,
                text: 'Leader',
                gradient: 'from-amber-500 to-orange-500',
                bgLight: 'bg-amber-50 dark:bg-amber-900/20',
                borderLight: 'border-amber-200 dark:border-amber-800',
                textLight: 'text-amber-700 dark:text-amber-400',
            };
        }
        if (unit.isAssistantLeader) {
            return {
                icon: <StarIcon className="w-3 h-3" />,
                text: 'Asst. Leader',
                gradient: 'from-blue-500 to-indigo-500',
                bgLight: 'bg-blue-50 dark:bg-blue-900/20',
                borderLight: 'border-blue-200 dark:border-blue-800',
                textLight: 'text-blue-700 dark:text-blue-400',
            };
        }
        // Default member badge
        return {
            icon: <UsersIcon className="w-3 h-3" />,
            text: 'Member',
            gradient: 'from-gray-500 to-slate-500',
            bgLight: 'bg-gray-50 dark:bg-gray-900/20',
            borderLight: 'border-gray-200 dark:border-gray-700',
            textLight: 'text-gray-700 dark:text-gray-400',
        };
    };

    const role = getRoleBadge();

    return (
        <div
            className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-lg"
        >
            {/* Unit Name & Member Count */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                        {unit?.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <UsersIcon className="w-4 h-4" />
                        <span>
                            {unit?.members_count}{' '}
                            {unit?.members_count === 1 ? 'member' : 'members'}
                        </span>
                    </div>
                </div>

                <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${role.textLight} ${role.bgLight} border ${role.borderLight}`}
                >
                    {role.icon}
                    <span>{role.text}</span>
                </div>
            </div>
        </div>
    );
};

const UserUnitsDetails = ({ userUnits }) => {
    return (
        <div className="space-y-4">
            {userUnits?.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {userUnits?.map((unit, index) => (
                        <UnitBadge key={unit.id || index} unit={unit} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <UsersIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No Units Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        You don't belong to any units.
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserUnitsDetails;