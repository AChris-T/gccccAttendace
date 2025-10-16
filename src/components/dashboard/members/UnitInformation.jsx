import { InfoField } from "@/components/dashboard/members/InfoField";
import { SectionCard } from "@/components/dashboard/members/SectionCard";
import { UnitListItem } from "@/components/dashboard/members/UnitListItem";
import { BriefcaseIcon, CrownIcon, StarIcon, UsersIcon } from "@/icons";
const UNIT_SECTIONS = [
    {
        key: 'ledUnits',
        title: 'Led Units',
        icon: CrownIcon,
        iconColor: 'text-blue-600 dark:text-blue-400',
        type: 'led'
    },
    {
        key: 'assistedUnits',
        title: 'Assisted Units',
        icon: StarIcon,
        iconColor: 'text-purple-600 dark:text-purple-400',
        type: 'assisted'
    },
    {
        key: 'memberUnits',
        title: 'Member Units',
        icon: UsersIcon,
        iconColor: 'text-green-600 dark:text-green-400',
        type: 'member'
    }
];

const UnitSection = ({ section, units }) => {
    const Icon = section.icon;
    const hasUnits = units && units.length > 0;

    return (
        <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${section.iconColor}`} />
                {section.title} ({hasUnits ? units.length : 0})
            </h3>
            <div className="space-y-2">
                {hasUnits ? (
                    units.map((unit) => (
                        <UnitListItem key={unit.id} unit={unit} type={section.type} />
                    ))
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        Not assigned
                    </p>
                )}
            </div>
        </div>
    );
};
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {UNIT_SECTIONS.map((section) => (
                    <UnitSection
                        key={section.key}
                        section={section}
                        units={user[section.key]}
                    />
                ))}
            </div>
        </SectionCard>
    );
};