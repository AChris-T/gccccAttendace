import Badge from "@/components/ui/Badge";
import { CrownIcon, StarIcon, UsersIcon } from "@/icons";

export const UnitListItem = ({ unit, type }) => {
    const typeConfig = {
        led: { color: 'blue', badge: 'Leader', icon: CrownIcon },
        assisted: { color: 'purple', badge: 'Assistant', icon: StarIcon },
        member: { color: 'green', badge: 'Member', icon: UsersIcon },
    };

    const config = typeConfig[type];
    const Icon = config.icon;

    return (
        <div className={`flex items-center justify-between p-4 bg-${config.color}-50 dark:bg-${config.color}-900/10 rounded-lg border border-${config.color}-100 dark:border-${config.color}-900/30`}>
            <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 text-${config.color}-600 dark:text-${config.color}-400`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{unit.name}</span>
            </div>
            <Badge color="info" size="sm">{config.badge}</Badge>
        </div>
    );
};
