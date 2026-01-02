import Badge from "@/components/ui/Badge";
import { ShieldIcon, StarIcon, UserIcon, UserIcon3 } from "@/icons";
import { useAuthStore } from "@/store/auth.store";
import { Lectern } from "lucide-react";

const RoleBadge = ({
    size = "md",
    variant = "light",
    showIcon = false,
    customLabels = {}
}) => {
    const { isAdmin, isLeader, isMember, isFirstTimer, isPastor } = useAuthStore()

    const roleConfig = [
        {
            condition: isPastor,
            color: "error",
            label: customLabels.pastor || "Pastor",
            icon: showIcon ? <Lectern className="h-3.5 w-3.5" /> : null,
        },
        {
            condition: isAdmin,
            color: "error",
            label: customLabels.admin || "Admin",
            icon: showIcon ? <ShieldIcon className="h-3.5 w-3.5" /> : null,
        },
        {
            condition: isLeader,
            color: "success",
            label: customLabels.leader || "Leader",
            icon: showIcon ? <StarIcon className="h-3.5 w-3.5" /> : null,
        },
        {
            condition: isMember,
            color: "primary",
            label: customLabels.member || "Member",
            icon: showIcon ? <UserIcon className="h-3.5 w-3.5" /> : null,
        },
        {
            condition: isFirstTimer,
            color: "light",
            label: customLabels.firstTimer || "First Timer",
            icon: showIcon ? <UserIcon3 className="h-3.5 w-3.5" /> : null,
        },
    ];

    const activeRole = roleConfig.find(role => role.condition);

    if (!activeRole) {
        return null;
    }

    return (
        <Badge
            variant={variant}
            color={activeRole.color}
            size={size}
            startIcon={activeRole.icon}
        >
            {activeRole.label}
        </Badge>
    );
};

export default RoleBadge