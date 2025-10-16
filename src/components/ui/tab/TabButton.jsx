export const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
    <button
        onClick={onClick}
        className={`
      relative flex items-center gap-2.5 px-3 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-lg
      ${active
                ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }
    `}
    >
        {Icon && <Icon className={`w-5 h-5 ${active ? 'text-white' : ''}`} />}
        <span>{label}</span>
        {count !== undefined && (
            <span className={`
        ml-1 px-2 py-0.5 rounded-full text-xs font-bold
        ${active
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
      `}>
                {count}
            </span>
        )}
    </button>
);