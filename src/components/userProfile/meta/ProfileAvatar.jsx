import Avatar from '@/components/ui/Avatar';
import { Toast } from '@/lib/toastify';

const ProfileAvatar = ({ user, roleConfig, onUpload, isUploading }) => {
  const RoleIcon = roleConfig.icon;

  return (
    <div className="relative shrink-0">
      <Avatar
        onError={(error) => Toast.error(error)}
        loading={isUploading}
        onUpload={onUpload}
        size="2xl"
        src={user?.avatar || ''}
        name={user?.initials || ''}
        className="ring-4 ring-white dark:ring-gray-800 shadow-xl"
      />
      <div
        className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-linear-to-br ${roleConfig.bgClass} flex items-center justify-center ring-4 ring-white dark:ring-gray-800`}
      >
        <RoleIcon width={16} height={16} className="text-white" />
      </div>
    </div>
  );
};

export default ProfileAvatar;
