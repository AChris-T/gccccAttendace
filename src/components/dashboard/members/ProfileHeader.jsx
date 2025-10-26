import Switch from "@/components/form/Switch";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { CheckIcon, DeleteIcon, UserIcon } from "@/icons";
import { Link } from "react-router-dom";

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
        <div className="truncate">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.full_name || 'N/A'}
            </h1>
            <Link to={`mailto:${user?.email}`} className="hover:underline text-sm block text-gray-500 dark:text-gray-400">
                {user.email || 'No email provided'}
            </Link>
            <div className="flex flex-wrap items-center gap-3 mt-2">
                <Badge size="sm" color={roleConfig.color}>
                    {roleConfig.label}
                </Badge>
                {isActive ? (
                    <Badge startIcon={<CheckIcon />} size="md" color="success">
                        Active
                    </Badge>
                ) : <Badge startIcon={<DeleteIcon height={15} />} size="md" color="error">
                    Deactivated
                </Badge>}
                {user?.assigned_to_member && <Badge color='primary' size="md">
                    <UserIcon width={15} height={15} /> {user?.assigned_to_member?.full_name}
                </Badge>}
            </div>
        </div>
    );
};

const SettingsPanel = ({ onToggleToolbox, onToggleProfile, showToolbox, showProfile }) => (
    <div className="space-y-2">
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
            <div className="flex justify-between items-start">
                <div>
                    <Avatar
                        size="3xl"
                        shape="square"
                        src={user.avatar}
                        name={user.initials}
                    />
                </div>
                <SettingsPanel
                    onToggleToolbox={onToggleToolbox}
                    onToggleProfile={onToggleProfile}
                    showToolbox={showToolbox}
                    showProfile={showProfile}
                />
            </div>
            <UserInfo user={user} />
        </div>
    );
};