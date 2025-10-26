import React, { useState, useEffect } from 'react';

// SVG Icons
const ChevronIcon = ({ direction = 'right', className = '' }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
            transform: direction === 'left' ? 'rotate(180deg)' :
                direction === 'up' ? 'rotate(-90deg)' :
                    direction === 'down' ? 'rotate(90deg)' : 'none'
        }}
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const MenuIcon = ({ className = '' }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = ({ className = '' }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// Main Drawer Component
const Drawer = ({
    children,
    position = 'left',
    isOpen = false,
    onToggle,
    positioning = 'absolute',
    width = '320px',
    height = '100%',
    showOverlay = false,
    className = ''
}) => {
    const getDrawerStyles = () => {
        const baseStyles = 'transition-transform duration-500 ease-in-out bg-white dark:bg-gray-900 shadow-2xl z-40';

        switch (position) {
            case 'left':
                return `${baseStyles} top-0 -left-10 h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
            case 'right':
                return `${baseStyles} top-0 -right-10 h-full ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
            case 'top':
                return `${baseStyles} top-0 left-0 w-full ${isOpen ? 'translate-y-0' : '-translate-y-full'}`;
            case 'bottom':
                return `${baseStyles} bottom-0 left-0 w-full ${isOpen ? 'translate-y-0' : 'translate-y-full'}`;
            default:
                return baseStyles;
        }
    };

    const getToggleButtonPosition = () => {
        const baseStyles = 'transition-all duration-300 ease-in-out z-50';

        switch (position) {
            case 'left':
                return `${baseStyles} ${positioning} top-1/2 -translate-y-1/2 ${isOpen ? `left-[${width}]` : 'left-2'}`;
            case 'right':
                return `${baseStyles} ${positioning} top-1/2 -translate-y-1/2 ${isOpen ? `right-[${width}]` : 'right-2'}`;
            case 'top':
                return `${baseStyles} ${positioning} left-1/2 -translate-x-1/2 ${isOpen ? `top-[${height}]` : 'top-2'}`;
            case 'bottom':
                return `${baseStyles} ${positioning} left-1/2 -translate-x-1/2 ${isOpen ? `bottom-[${height}]` : 'bottom-2'}`;
            default:
                return baseStyles;
        }
    };

    const getIconDirection = () => {
        if (!isOpen) {
            switch (position) {
                case 'left': return 'right';
                case 'right': return 'left';
                case 'top': return 'down';
                case 'bottom': return 'up';
                default: return 'right';
            }
        } else {
            switch (position) {
                case 'left': return 'left';
                case 'right': return 'right';
                case 'top': return 'up';
                case 'bottom': return 'down';
                default: return 'left';
            }
        }
    };

    const getSizeStyles = () => {
        if (position === 'left' || position === 'right') {
            return { width, height: '100%' };
        } else {
            return { height, width: '100%' };
        }
    };

    return (
        <>
            {/* Overlay - only for parent container */}
            {showOverlay && isOpen && (
                <div
                    className={`${positioning} inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-500 ease-in-out`}
                    onClick={onToggle}
                />
            )}

            {/* Drawer */}
            <div
                className={`${positioning} ${getDrawerStyles()} ${className} overflow-hidden`}
                style={getSizeStyles()}
            >
                <div className="h-full overflow-y-hidden overflow-x-hidden">
                    {/* Header with gradient */}
                    <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-4 flex justify-between items-center shadow-lg">
                        <h2 className="text-xl font-bold text-white">Drawer</h2>
                        <button
                            onClick={onToggle}
                            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
                            aria-label="Close drawer"
                        >
                            <CloseIcon className="text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>

            {/* Toggle Button with Pulse Animation */}
            <button
                onClick={onToggle}
                className={`${getToggleButtonPosition()} group`}
                aria-label={isOpen ? "Close drawer" : "Open drawer"}
            >
                {/* Pulse ring animation */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-75" />
                )}

                {/* Button */}
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:from-blue-700 group-hover:to-purple-700">
                    {isOpen ? (
                        <ChevronIcon direction={getIconDirection()} className="text-white" />
                    ) : (
                        <MenuIcon className="text-white" />
                    )}
                </span>
            </button>
        </>
    );
};
export default Drawer;