import React, { useState } from 'react';

export const EmptyState = ({
  icon = 'inbox',
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  actionLabel,
  onAction,
  variant = 'default'
}) => {

  const icons = {
    inbox: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="animate-[bounce_3s_ease-in-out_infinite]"
          d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="animate-[pulse_2s_ease-in-out_infinite]"
          d="M9 22V12H15V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    calendar: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          className="animate-[pulse_2s_ease-in-out_infinite]"
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="animate-[bounce_3s_ease-in-out_infinite]"
          d="M16 2V6M8 2V6M3 10H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          className="animate-[ping_2s_ease-in-out_infinite]"
          cx="12"
          cy="15"
          r="2"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
    ),
    search: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          className="animate-[spin_3s_linear_infinite]"
          cx="11"
          cy="11"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="animate-[bounce_2s_ease-in-out_infinite]"
          d="M21 21L16.65 16.65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    database: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse
          className="animate-[pulse_2s_ease-in-out_infinite]"
          cx="12"
          cy="5"
          rx="9"
          ry="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="animate-[bounce_3s_ease-in-out_infinite_0.5s]"
          d="M3 5V19C3 20.657 7.029 22 12 22C16.971 22 21 20.657 21 19V5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="animate-[pulse_2.5s_ease-in-out_infinite]"
          d="M3 12C3 13.657 7.029 15 12 15C16.971 15 21 13.657 21 12"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    folder: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="animate-[bounce_3s_ease-in-out_infinite]"
          d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="animate-[pulse_2s_ease-in-out_infinite]"
          d="M8 12H16M12 8V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    cloud: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="animate-[float_3s_ease-in-out_infinite]"
          d="M18 10H19C19.7956 10 20.5587 10.3161 21.1213 10.8787C21.6839 11.4413 22 12.2044 22 13C22 13.7956 21.6839 14.5587 21.1213 15.1213C20.5587 15.6839 19.7956 16 19 16H6C4.93913 16 3.92172 15.5786 3.17157 14.8284C2.42143 14.0783 2 13.0609 2 12C2 10.9391 2.42143 9.92172 3.17157 9.17157C3.92172 8.42143 4.93913 8 6 8H6.5C7.5 5.5 9.5 3 13 3C16.5 3 18.5 5.5 18.5 8L18 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    box: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="animate-[bounce_3s_ease-in-out_infinite]"
          d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="animate-[pulse_2s_ease-in-out_infinite]"
          d="M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  };

  // Variant styles
  const variants = {
    default: {
      container: 'from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800',
      card: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      iconBg: 'bg-gradient-to-br from-blue-500 to-purple-600',
      iconColor: 'text-white',
      pulse: 'bg-blue-500/20 dark:bg-blue-400/20'
    },
    minimal: {
      container: 'from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800',
      card: 'bg-transparent border-slate-300 dark:border-slate-600',
      iconBg: 'bg-slate-200 dark:bg-slate-700',
      iconColor: 'text-slate-600 dark:text-slate-300',
      pulse: 'bg-slate-300/30 dark:bg-slate-600/30'
    },
    gradient: {
      container: 'from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950 dark:via-purple-950 dark:to-fuchsia-950',
      card: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-violet-200 dark:border-violet-800',
      iconBg: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600',
      iconColor: 'text-white',
      pulse: 'bg-violet-500/20 dark:bg-violet-400/20'
    },
    warm: {
      container: 'from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950',
      card: 'bg-white dark:bg-slate-800 border-orange-200 dark:border-orange-800',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
      iconColor: 'text-white',
      pulse: 'bg-orange-500/20 dark:bg-orange-400/20'
    }
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className={`w-full flex items-center justify-center p-5 bg-gradient-to-br ${currentVariant.container} rounded-2xl`}>
      <div className={`w-full ${currentVariant.card} rounded shadow border-2 p-8 md:p-12 text-center transition-all duration-300 hover:shadow-xl`}>
        {/* Animated Icon Container */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Pulse Rings */}
          <div className={`absolute inset-0 ${currentVariant.pulse} rounded-full animate-ping`}></div>
          <div className={`absolute inset-0 ${currentVariant.pulse} rounded-full animate-pulse`}></div>

          {/* Icon */}
          <div className={`relative w-24 h-24 md:w-28 md:h-28 ${currentVariant.iconBg} ${currentVariant.iconColor} rounded-3xl shadow-2xl p-6 transform transition-transform duration-300 hover:scale-110 hover:rotate-3`}>
            {icons[icon] || icons.inbox}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1 animate-[fadeIn_0.5s_ease-in-out]">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed animate-[fadeIn_0.7s_ease-in-out]">
          {description}
        </p>

        {/* Optional Action Button */}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className={`inline-flex items-center gap-2 px-6 py-3 ${currentVariant.iconBg} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95`}
          >
            {actionLabel}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

// Demo Component showing different variants
export default function EmptyStateDemo() {
  const [activeVariant, setActiveVariant] = useState('default');
  const [activeIcon, setActiveIcon] = useState('calendar');

  const examples = [
    {
      icon: 'calendar',
      title: 'No Events Available',
      description: 'There are no events scheduled at the moment. Check back later for upcoming events and exciting opportunities.',
      actionLabel: 'Explore Past Events',
      variant: 'default'
    },
    {
      icon: 'search',
      title: 'No Results Found',
      description: 'We couldn\'t find what you\'re looking for. Try adjusting your search terms or filters.',
      actionLabel: 'Clear Filters',
      variant: 'minimal'
    },
    {
      icon: 'folder',
      title: 'Empty Folder',
      description: 'This folder is empty. Start by adding your first item to get organized.',
      actionLabel: 'Add New Item',
      variant: 'gradient'
    },
    {
      icon: 'database',
      title: 'No Data Available',
      description: 'There\'s no data to display right now. Data will appear here once it\'s available.',
      actionLabel: 'Refresh',
      variant: 'warm'
    }
  ];

  const currentExample = examples.find(ex => ex.icon === activeIcon) || examples[0];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Empty State Component
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Beautiful, reusable empty states for your application
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Select Icon
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['calendar', 'search', 'folder', 'database', 'inbox', 'cloud', 'box'].map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setActiveIcon(icon)}
                    className={`p-3 rounded-lg border-2 transition-all ${activeIcon === icon
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                  >
                    <div className="w-6 h-6 mx-auto text-slate-600 dark:text-slate-300">
                      {icon === 'calendar' && '📅'}
                      {icon === 'search' && '🔍'}
                      {icon === 'folder' && '📁'}
                      {icon === 'database' && '💾'}
                      {icon === 'inbox' && '📥'}
                      {icon === 'cloud' && '☁️'}
                      {icon === 'box' && '📦'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Select Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['default', 'minimal', 'gradient', 'warm'].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setActiveVariant(variant)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all capitalize ${activeVariant === variant
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State Preview */}
        <EmptyState
          icon={activeIcon}
          title={currentExample.title}
          description={currentExample.description}
          actionLabel={currentExample.actionLabel}
          onAction={() => console.log('Action clicked!')}
          variant={activeVariant}
        />

        {/* Usage Code */}
        <div className="mt-6 bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-sm text-green-400">
            <code>{`<EmptyState
  icon="${activeIcon}"
  title="${currentExample.title}"
  description="${currentExample.description}"
  actionLabel="${currentExample.actionLabel}"
  onAction={() => handleAction()}
  variant="${activeVariant}"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}