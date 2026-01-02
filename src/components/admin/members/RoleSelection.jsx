import { ROLE_OPTIONS } from '@/utils/data';
import { Users } from 'lucide-react';
import { memo } from 'react';

// Unified blue color scheme for all roles
const COLOR_SCHEME = {
    base: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    selected: 'bg-blue-600 dark:bg-blue-500 text-white',
};

const RoleButton = memo(({ role, isSelected, onSelect, disabled }) => {
    const Icon = role.icon;

    return (
        <button
            type="button"
            onClick={() => onSelect(role.value)}
            disabled={disabled}
            className={`
                group relative overflow-hidden rounded-lg p-3.5 text-left
                transition-all duration-200 ease-out hover:shadow-md
                focus:outline-none
                ${isSelected
                    ? `${COLOR_SCHEME.selected} shadow-md scale-100`
                    : `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm`
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
            `}
            aria-pressed={isSelected}
            aria-label={`Select ${role.text}`}
        >
            {/* Gradient Overlay for Selected State */}
            {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            )}

            {/* Content Container */}
            <div className="relative flex items-start space-x-3">
                {/* Icon Container */}
                <div className={`
                    flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                    transition-all duration-200
                    ${isSelected
                        ? 'bg-white/20 backdrop-blur-sm'
                        : COLOR_SCHEME.base
                    }
                `}>
                    <Icon className={`w-4.5 h-4.5 transition-transform duration-200 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`} />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <p className={`
                            text-sm font-semibold truncate transition-colors duration-200
                            ${isSelected
                                ? 'text-white'
                                : 'text-gray-900 dark:text-gray-100'
                            }
                        `}>
                            {role.text}
                        </p>

                        {/* Selection Indicator - Checkmark */}
                        {isSelected && (
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center animate-in zoom-in duration-200">
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <p className={`
                        text-xs mt-0.5 truncate transition-colors duration-200
                        ${isSelected
                            ? 'text-white/90'
                            : 'text-gray-500 dark:text-gray-400'
                        }
                    `}>
                        {role.description}
                    </p>
                </div>
            </div>
        </button>
    );
});

RoleButton.displayName = 'RoleButton';

const RoleSelection = ({ selectedRole, onRoleChange, disabled = false }) => {
    return (
        <div className="w-full">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Filter by Role
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Select a role to view specific member types
                    </p>
                </div>
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {ROLE_OPTIONS.map((role) => (
                    <RoleButton
                        key={role.value}
                        role={role}
                        isSelected={selectedRole === role.value}
                        onSelect={onRoleChange}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(RoleSelection);