import React from 'react';

const SocialLinkCard = ({ Icon, label, color, url }) => {
  const isActive = !!url;

  // Brand-specific icon colors
  const iconColors = {
    Facebook: 'text-blue-600 dark:text-blue-500',
    'X (Twitter)': 'text-sky-500 dark:text-sky-400',
    Instagram: 'text-pink-600 dark:text-pink-500',
    Linkedin: 'text-blue-700 dark:text-blue-600',
  };

  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onClick={(e) => !url && e.preventDefault()}
      className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive
        ? `border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 cursor-pointer`
        : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 cursor-not-allowed opacity-60"
        }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-transform ${isActive ? "group-hover:scale-110" : ""
          }`}
      >
        <Icon
          width={20}
          height={20}
          className={
            isActive
              ? iconColors[label] || "text-gray-700 dark:text-gray-300"
              : "text-gray-400 dark:text-gray-600"
          }
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">{label}</p>
        <p
          className={`text-xs ${isActive ? "text-gray-900 dark:text-gray-200 font-semibold" : "text-gray-400 dark:text-gray-600"
            } truncate`}
        >
          {isActive ? "Connected" : "Not linked"}
        </p>
      </div>
      {isActive && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
    </a>
  );
};

export default SocialLinkCard;