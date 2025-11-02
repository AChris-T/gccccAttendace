import Avatar from '@/components/ui/Avatar';
import { Toast } from '@/lib/toastify';
import { useCallback } from 'react';

const ProfileAvatar = ({ user, roleConfig, onUpload, isUploading }) => {
  const RoleIcon = roleConfig?.icon;

  const handleAvatarError = useCallback((error) => {
    Toast.error(error);
  }, []);

  return (
    <div className="relative shrink-0">
      {RoleIcon && (
        <div
          className={`z-10 absolute -top-1 -left-1 w-8 h-8 rounded-full bg-linear-to-br ${roleConfig.bgClass} flex items-center justify-center ring-4 ring-white dark:ring-gray-800`}
          aria-label={`Role: ${roleConfig.name || 'user'}`}
        >
          <RoleIcon width={16} height={16} className="text-white" />
        </div>
      )}

      <Avatar
        onError={handleAvatarError}
        loading={isUploading}
        onUpload={onUpload}
        size="2xl"
        src={user.avatar || ''}
        name={user.initials || ''}
        isProfileCompleted={user?.profile_completed}
        showProfileStatus
        className="ring-4 ring-white dark:ring-gray-800 shadow-xl"
      />
    </div>
  );
};

export default ProfileAvatar;
