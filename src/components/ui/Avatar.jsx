import { CameraIcon, LoadingIcon2, UserIcon } from '@/icons';
import { useState, useRef, useCallback, useMemo } from 'react';

const AVATAR_SIZES = {
  xs: { container: 'w-8 h-8', text: 'text-xs', icon: 12 },
  sm: { container: 'w-10 h-10', text: 'text-sm', icon: 14 },
  md: { container: 'w-12 h-12', text: 'text-base', icon: 16 },
  lg: { container: 'w-16 h-16', text: 'text-lg', icon: 20 },
  xl: { container: 'w-20 h-20', text: 'text-xl', icon: 24 },
  '2xl': { container: 'w-28 h-28', text: 'text-2xl', icon: 32 },
  '3xl': { container: 'w-36 h-36', text: 'text-3xl', icon: 40 }
};

const SHAPE_CLASSES = {
  circle: 'rounded-full',
  square: 'rounded-xl'
};

const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5MB
const ACCEPTED_IMAGE_TYPES = 'image/*';

const Avatar = ({
  src,
  alt = 'User avatar',
  name = '',
  size = 'md',
  shape = 'circle',
  onUpload,
  className = '',
  loading = false,
  onError
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const sizeConfig = useMemo(() => AVATAR_SIZES[size], [size]);
  const shapeClass = useMemo(() => SHAPE_CLASSES[shape], [shape]);
  const isUploadable = Boolean(onUpload);
  const showImage = src && !imageError;


  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleClick = useCallback(() => {
    if (isUploadable && !loading) {
      fileInputRef.current?.click();
    }
  }, [isUploadable, loading]);

  const validateFile = useCallback((file) => {
    if (!file) return { valid: false, error: 'No file selected' };

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: 'Image size must be less than 1.5MB. Please select a smaller image.'
      };
    }

    return { valid: true };
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validation = validateFile(file);

    if (!validation.valid) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onError?.(validation.error);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      onUpload?.(reader.result);
      setImageError(false);
    };

    reader.onerror = () => {
      onError?.('Failed to read file. Please try again.');
    };

    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onUpload, onError, validateFile]);

  const containerClasses = useMemo(() => [
    'relative overflow-hidden shadow-xl transition-all duration-300 ease-in-out ring-2 ring-white',
    sizeConfig.container,
    shapeClass,
    isUploadable && !loading ? 'cursor-pointer hover:shadow-lg' : '',
    className
  ].filter(Boolean).join(' '), [sizeConfig, shapeClass, isUploadable, loading, className]);

  return (
    <div className="inline-block relative">
      <div
        className={containerClasses}
        onClick={handleClick}
        onMouseEnter={() => isUploadable && setIsHovered(true)}
        onMouseLeave={() => isUploadable && setIsHovered(false)}
        role={isUploadable ? 'button' : 'img'}
        aria-label={isUploadable ? 'Upload avatar' : alt}
        tabIndex={isUploadable && !loading ? 0 : -1}
        onKeyDown={(e) => {
          if (isUploadable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={handleImageError}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600">
            {name ? (
              <span className={`font-semibold text-white select-none ${sizeConfig.text}`}>
                {name}
              </span>
            ) : (
              <UserIcon
                size={sizeConfig.icon}
                className="text-white opacity-80"
              />
            )}
          </div>
        )}

        {isUploadable && (
          <>
            <div
              className={`
                absolute inset-0 bg-black/60 dark:bg-black/70
                flex items-center justify-center
                transition-opacity duration-300
                ${isHovered && !loading ? 'opacity-100' : 'opacity-0'}
              `}
              aria-hidden="true"
            >
              <CameraIcon
                size={sizeConfig.icon * 0.8}
                className="!text-white drop-shadow-lg"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES}
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload avatar image"
              disabled={loading}
            />
          </>
        )}

        {loading && (
          <div className={`absolute inset-0 flex items-center justify-center bg-black/50 ${shapeClass}`}>
            <LoadingIcon2 height={22} className="text-white" />
          </div>
        )}
      </div>

      {name && (
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg"
          aria-label={`${name} badge`}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export default Avatar;