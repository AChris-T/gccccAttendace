// Tab button component for better reusability
export const TabButton = ({ tab, isActive, onClick }) => (
    <button
        onClick={() => onClick(tab.id)}
        className={`
      relative px-4 py-3 text-sm font-medium transition-all duration-200 
      border-b-2 -mb-px focus:outline-none focus:ring-2 focus:ring-[#24244e] 
      focus:ring-offset-2 rounded-t-md hover:bg-gray-50
      ${isActive
                ? 'border-[#24244e] text-[#24244e] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
    `}
        aria-current={isActive ? 'page' : undefined}
        aria-label={tab.ariaLabel}
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
    >
        {tab.label}
        {isActive && (
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#24244e] transition-all duration-200" />
        )}
    </button>
);