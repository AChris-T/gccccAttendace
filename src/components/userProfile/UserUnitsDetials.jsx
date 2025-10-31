import { CrownIcon, StarIcon, UsersIcon } from "@/icons";

const UnitBadge = ({ unit }) => {
    const getRoleBadge = () => {
        if (unit.isLeader) {
            return {
                icon: <CrownIcon className="w-4 h-4" />,
                text: 'Leader',
                gradient: 'from-amber-500 to-orange-500',
                bgLight: 'bg-amber-50 dark:bg-amber-900/20',
                borderLight: 'border-amber-200 dark:border-amber-800',
                textLight: 'text-amber-700 dark:text-amber-400'
            };
        }
        if (unit.isAssistantLeader) {
            return {
                icon: <StarIcon className="w-4 h-4" />,
                text: 'Ass. Leader',
                gradient: 'from-blue-500 to-indigo-500',
                bgLight: 'bg-blue-50 dark:bg-blue-900/20',
                borderLight: 'border-blue-200 dark:border-blue-800',
                textLight: 'text-blue-700 dark:text-blue-400'
            };
        }
    };

    const role = getRoleBadge();

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded shadow dark:shadow-gray-900/30 overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700">

            <div className="p-4">
                {/* Unit Name & Member Count */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-600 dark:text-gray-300 mb-1 truncate">
                            {unit.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <UsersIcon className="w-3 h-3 shrink-0" />
                            <span className="text-xs font-medium">
                                {unit.members_count} {unit.members_count === 1 ? 'member' : 'members'}
                            </span>
                        </div>
                    </div>
                    <div className={`flex flex-wrap sm:flex-nowrap items-center gap-1 px-2.5 py-1.5 rounded-lg border ${role.borderLight} ${role.bgLight} transition-all duration-200`}>
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br ${role.gradient} text-white shadow-sm`}>
                            {role.icon}
                        </div>
                        <p className={`text-xs font-bold ${role.textLight}`}>
                            {role.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserUnitsDetails = ({ userUnits }) => {

    return (
        <div className="mx-auto">
            {userUnits?.length > 0 ? (
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {userUnits.map((unit) => (
                        <UnitBadge key={unit.id} unit={unit} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <UsersIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        No Units Yet
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        You don't belong to any units.
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserUnitsDetails;