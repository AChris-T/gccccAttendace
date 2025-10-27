import Avatar from '@/components/ui/Avatar';
import { DownloadIcon } from '@/icons';
import { Toast } from '@/lib/toastify';
import { useAuthStore } from '@/store/auth.store';
import { useCallback } from 'react';

const MIME_TYPE_EXTENSIONS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

const DEFAULT_EXTENSION = 'jpg';

const ProfileAvatar = ({ user, roleConfig, onUpload, isUploading }) => {
  const RoleIcon = roleConfig?.icon;
  const { isAdmin } = useAuthStore();


  const getFileExtension = useCallback((mimeType) => {
    return MIME_TYPE_EXTENSIONS[mimeType] || DEFAULT_EXTENSION;
  }, []);

  const sanitizeFileName = useCallback((fileName) => {
    return fileName.replace(/[^\w\-]+/g, '');
  }, []);

  const generateFileName = useCallback((imageUrl, userName, extension) => {
    const urlParts = imageUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1].split('?')[0];
    const baseName = sanitizeFileName(
      userName || lastPart.split('.')[0] || 'download'
    );
    return `${baseName}.${extension}`;
  }, [sanitizeFileName]);


  const triggerBlobDownload = useCallback((blob, fileName) => {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(blobUrl);
  }, []);


  const handleDownload = useCallback(async (imageUrl, userName) => {
    if (!imageUrl) {
      Toast.error('No image URL provided');
      return;
    }

    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const extension = getFileExtension(blob.type);
      const fileName = generateFileName(imageUrl, userName, extension);

      triggerBlobDownload(blob, fileName);

      Toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Image download error:', error);
      Toast.error(`Failed to download image: ${error}`);
    }
  }, [getFileExtension, generateFileName, triggerBlobDownload]);

  const handleAvatarError = useCallback((error) => {
    Toast.error(error);
  }, []);

  const handleDownloadClick = useCallback(() => {
    handleDownload(user?.avatar, user?.full_name);
  }, [user?.avatar, user?.full_name, handleDownload]);

  if (!user || !roleConfig) {
    return null;
  }

  return (
    <div className="relative shrink-0">
      <Avatar
        onError={handleAvatarError}
        loading={isUploading}
        onUpload={onUpload}
        size="2xl"
        src={user.avatar || ''}
        name={user.initials || ''}
        className="ring-4 ring-white dark:ring-gray-800 shadow-xl"
      />

      {isAdmin && user.avatar && (
        <button
          type="button"
          onClick={handleDownloadClick}
          className="absolute top-0 left-0"
          aria-label="Download avatar"
          disabled={isUploading}
        >
          <DownloadIcon
            width={20}
            height={20}
            fill="transparent"
            className={`text-white cursor-pointer rounded-full w-8 h-8 p-2 bg-linear-to-br ${roleConfig.bgClass} dark:text-gray-300 flex items-center justify-center ring-4 ring-white dark:ring-gray-800 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          />
        </button>
      )}

      {RoleIcon && (
        <div
          className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-linear-to-br ${roleConfig.bgClass} flex items-center justify-center ring-4 ring-white dark:ring-gray-800`}
          aria-label={`Role: ${roleConfig.name || 'user'}`}
        >
          <RoleIcon width={16} height={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;