import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { ArrowDownIcon, DownloadIcon } from '@/icons';
import { Toast } from '@/lib/toastify';

const ProfileAvatar = ({ user, roleConfig, onUpload, isUploading }) => {
  const RoleIcon = roleConfig.icon;

  const handleDownload = async () => {
    try {
      const src = user?.avatar;
      if (!src) {
        Toast.error('No avatar image to download');
        return;
      }

      const filename = `${user?.initials || 'avatar'}.png`;

      const createAndClickLink = (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      };

      if (src.startsWith('data:')) {
        const res = await fetch(src);
        const blob = await res.blob();
        createAndClickLink(blob);
        return;
      }

      const response = await fetch(src, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      createAndClickLink(blob);
    } catch (err) {
      Toast.error('Unable to download avatar image');
    }
  };

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
      {user?.roles?.includes('admin') && (
        <div className="absolute top-0 left-0">
          <DownloadIcon
            onClick={handleDownload}
            width={20}
            height={20}
            fill="transparent"
            className={`text-white cursor-pointer rounded-full w-8 h-8 p-2 bg-linear-to-br ${roleConfig.bgClass} dark:text-gray-300 flex items-center justify-center ring-4 ring-white dark:ring-gray-800`}
          />
        </div>
      )}
      <div
        className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-linear-to-br ${roleConfig.bgClass} flex items-center justify-center ring-4 ring-white dark:ring-gray-800`}
      >
        <RoleIcon width={16} height={16} className="text-white" />
      </div>
    </div>
  );
};

export default ProfileAvatar;
