import { CameraIcon, LoadingIcon2, UserIcon } from '@/icons';
import { useState, useRef } from 'react';

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

  const sizeClasses = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-28 h-28 text-2xl',
    '3xl': 'w-36 h-36 text-3xl'
  };

  const iconSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-xl'
  };

  const handleClick = () => {
    if (onUpload && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const maxSize = 1.5 * 1024 * 1024;
    if (file.size > maxSize) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return onError('Image size must be less than 1MB. Please select a smaller image.');
    }
    if (file && onUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const showImage = src && !imageError;

  return (
    <div className="inline-block relative">
      <div
        className={`
          relative overflow-hidden shadow
          ${sizeClasses[size]}
          ${shapeClasses[shape]}
          ${onUpload ? 'cursor-pointer' : ''}
          transition-all duration-300 ease-in-out
          ${className}
        `}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600">
            {name ? (
              <span className="font-semibold text-white select-none">
                {name}
              </span>
            ) : (
              <UserIcon
                size={iconSizes[size]}
                className="text-white opacity-80"
              />
            )}
          </div>
        )}

        {onUpload && (
          <>
            <div
              className={`
                absolute inset-0 bg-black/60 dark:bg-black/70
                flex items-center justify-center
                transition-opacity duration-300
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <CameraIcon
                size={iconSizes[size] * 0.8}
                className="!text-white drop-shadow-lg"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload avatar image"
            />
          </>
        )}
        {loading &&
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
            <LoadingIcon2 height={22} className='text-white' />
          </div>
        }
      </div>
      {name && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
        {name}
      </div>}
    </div>
  );
};
export default Avatar;