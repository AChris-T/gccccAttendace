import { InfoField } from "@/components/dashboard/members/InfoField";
import { SectionCard } from "@/components/dashboard/members/SectionCard";
import { UnitListItem } from "@/components/dashboard/members/UnitListItem";
import { BriefcaseIcon, CrownIcon, StarIcon, UsersIcon } from "@/icons";

export const UnitInformation = ({ user }) => {
    return (
        <SectionCard
            title="Unit Information"
            description="Your church roles and assignments"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InfoField icon={UsersIcon} label="Community" value={user.community} color="blue" />
                <InfoField icon={BriefcaseIcon} label="Worker" value={user.worker} color="blue" />
            </div>

            <div className="space-y-6">
                {user.ledUnits && user.ledUnits.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <CrownIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            Led Units ({user.ledUnits.length})
                        </h3>
                        <div className="space-y-2">
                            {user.ledUnits.map((unit) => (
                                <UnitListItem key={unit.id} unit={unit} type="led" />
                            ))}
                        </div>
                    </div>
                )}

                {user.assistedUnits && user.assistedUnits.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <StarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            Assisted Units ({user.assistedUnits.length})
                        </h3>
                        <div className="space-y-2">
                            {user.assistedUnits.map((unit) => (
                                <UnitListItem key={unit.id} unit={unit} type="assisted" />
                            ))}
                        </div>
                    </div>
                )}

                {user.memberUnits && user.memberUnits.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <UsersIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                            Member Units ({user.memberUnits.length})
                        </h3>
                        <div className="space-y-2">
                            {user.memberUnits.map((unit) => (
                                <UnitListItem key={unit.id} unit={unit} type="member" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SectionCard>
    );
};