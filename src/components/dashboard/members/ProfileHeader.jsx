import Switch from "@/components/form/Switch";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { CheckIcon } from "@/icons";

const ROLE_CONFIG = {
    admin: { label: 'Admin', color: 'error' },
    leader: { label: 'Leader', color: 'warning' },
    member: { label: 'Member', color: 'primary' }
};

const getRoleConfig = (role) => {
    const normalizedRole = role?.toLowerCase();
    return ROLE_CONFIG[normalizedRole] || ROLE_CONFIG.member;
};

const UserInfo = ({ user }) => {
    const primaryRole = user.roles?.[0];
    const roleConfig = getRoleConfig(primaryRole);
    const isActive = user.status === 'active';

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.full_name || 'N/A'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email || 'No email provided'}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
                <Badge size="sm" color={roleConfig.color}>
                    {roleConfig.label}
                </Badge>
                {isActive && (
                    <Badge startIcon={<CheckIcon />} size="sm" color="success">
                        Active
                    </Badge>
                )}
            </div>
        </div>
    );
};

const SettingsPanel = ({ onToggleToolbox, onToggleProfile, showToolbox, showProfile }) => (
    <div className="space-y-3">
        <Switch
            onChange={onToggleToolbox}
            defaultChecked={showToolbox}
            label="Show Toolbox"
        />
        <Switch
            onChange={onToggleProfile}
            defaultChecked={showProfile}
            label="Show Profile"
        />
    </div>
);

export const ProfileHeader = ({
    user,
    onToggleToolbox,
    onToggleProfile,
    showToolbox,
    showProfile
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar
                        size="3xl"
                        shape="square"
                        src={user.avatar}
                        name={user.initials}
                    />
                    <UserInfo user={user} />
                </div>
                <SettingsPanel
                    onToggleToolbox={onToggleToolbox}
                    onToggleProfile={onToggleProfile}
                    showToolbox={showToolbox}
                    showProfile={showProfile}
                />
            </div>
        </div>
    );
};