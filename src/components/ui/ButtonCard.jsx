import { LoadingIcon2 } from "@/icons";

const ButtonCard = ({
    children,
    icon,
    description,
    color = "indigo",
    onClick,
    title,
    className = "",
    disabled = false,
    type = "button",
    loading = false,
    // Anchor tag props
    href,
    target,
    rel,
    download,
}) => {
    // Card color classes for different color variants
    const colorClasses = {
        indigo: {
            iconBg: "bg-indigo-100 group-hover:bg-indigo-200 dark:bg-indigo-900/30 dark:group-hover:bg-indigo-900/50",
            iconText: "text-indigo-600 dark:text-indigo-400",
            border: "border-gray-200 hover:border-indigo-300 dark:border-gray-600 dark:hover:border-indigo-600",
            focusRing: "focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400",
        },
        blue: {
            iconBg: "bg-blue-100 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50",
            iconText: "text-blue-600 dark:text-blue-400",
            border: "border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-600",
            focusRing: "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
        },
        green: {
            iconBg: "bg-green-100 group-hover:bg-green-200 dark:bg-green-900/30 dark:group-hover:bg-green-900/50",
            iconText: "text-green-600 dark:text-green-400",
            border: "border-gray-200 hover:border-green-300 dark:border-gray-600 dark:hover:border-green-600",
            focusRing: "focus-visible:ring-green-500 dark:focus-visible:ring-green-400",
        },
        red: {
            iconBg: "bg-red-100 group-hover:bg-red-200 dark:bg-red-900/30 dark:group-hover:bg-red-900/50",
            iconText: "text-red-600 dark:text-red-400",
            border: "border-gray-200 hover:border-red-300 dark:border-gray-600 dark:hover:border-red-600",
            focusRing: "focus-visible:ring-red-500 dark:focus-visible:ring-red-400",
        },
        purple: {
            iconBg: "bg-purple-100 group-hover:bg-purple-200 dark:bg-purple-900/30 dark:group-hover:bg-purple-900/50",
            iconText: "text-purple-600 dark:text-purple-400",
            border: "border-gray-200 hover:border-purple-300 dark:border-gray-600 dark:hover:border-purple-600",
            focusRing: "focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400",
        },
        amber: {
            iconBg: "bg-amber-100 group-hover:bg-amber-200 dark:bg-amber-900/30 dark:group-hover:bg-amber-900/50",
            iconText: "text-amber-600 dark:text-amber-400",
            border: "border-gray-200 hover:border-amber-300 dark:border-gray-600 dark:hover:border-amber-600",
            focusRing: "focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400",
        },
        cyan: {
            iconBg: "bg-cyan-100 group-hover:bg-cyan-200 dark:bg-cyan-900/30 dark:group-hover:bg-cyan-900/50",
            iconText: "text-cyan-600 dark:text-cyan-400",
            border: "border-gray-200 hover:border-cyan-300 dark:border-gray-600 dark:hover:border-cyan-600",
            focusRing: "focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-400",
        },
        emerald: {
            iconBg: "bg-emerald-100 group-hover:bg-emerald-200 dark:bg-emerald-900/30 dark:group-hover:bg-emerald-900/50",
            iconText: "text-emerald-600 dark:text-emerald-400",
            border: "border-gray-200 hover:border-emerald-300 dark:border-gray-600 dark:hover:border-emerald-600",
            focusRing: "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
        },
        orange: {
            iconBg: "bg-orange-100 group-hover:bg-orange-200 dark:bg-orange-900/30 dark:group-hover:bg-orange-900/50",
            iconText: "text-orange-600 dark:text-orange-400",
            border: "border-gray-200 hover:border-orange-300 dark:border-gray-600 dark:hover:border-orange-600",
            focusRing: "focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400",
        },
        pink: {
            iconBg: "bg-pink-100 group-hover:bg-pink-200 dark:bg-pink-900/30 dark:group-hover:bg-pink-900/50",
            iconText: "text-pink-600 dark:text-pink-400",
            border: "border-gray-200 hover:border-pink-300 dark:border-gray-600 dark:hover:border-pink-600",
            focusRing: "focus-visible:ring-pink-500 dark:focus-visible:ring-pink-400",
        },
        slate: {
            iconBg: "bg-slate-100 group-hover:bg-slate-200 dark:bg-slate-900/30 dark:group-hover:bg-slate-900/50",
            iconText: "text-slate-600 dark:text-slate-400",
            border: "border-gray-200 hover:border-slate-300 dark:border-gray-600 dark:hover:border-slate-600",
            focusRing: "focus-visible:ring-slate-500 dark:focus-visible:ring-slate-400",
        },
    };

    const currentColor = colorClasses[color] || colorClasses.indigo;

    // Disabled state classes
    const disabledClasses =
        disabled || loading
            ? "!cursor-not-allowed opacity-50 pointer-events-none"
            : "cursor-pointer";

    // Common classes for both button and anchor
    const baseClasses = `
    flex items-start group w-full
    gap-2 sm:gap-3 
    p-3 sm:p-4 
    bg-white dark:bg-gray-700 
    rounded-lg border 
    hover:shadow-md 
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    dark:focus-visible:ring-offset-gray-900
    ${currentColor.border}
    ${currentColor.focusRing}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, " ");

    // Content to be rendered (same for button and anchor)
    const content = (
        <>
            {/* Icon Container - Responsive sizing */}
            <div
                className={`
          p-2 sm:p-3 
          rounded-lg 
          transition-colors
          shrink-0
          ${currentColor.iconBg}
        `.trim().replace(/\s+/g, " ")}
            >
                {loading ? (
                    <LoadingIcon2 className={`w-4 h-4 sm:w-5 sm:h-5 ${currentColor.iconText}`} />
                ) : icon ? (
                    <span className={`flex items-center ${currentColor.iconText}`}>
                        {icon}
                    </span>
                ) : null}
            </div>

            {/* Text Content - Responsive typography */}
            <div className="text-left flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                    {children}
                </h3>
                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </>
    );

    // Render as anchor tag if href is provided
    if (href) {
        return (
            <a
                href={disabled || loading ? undefined : href}
                target={target}
                rel={target === "_blank" ? (rel || "noopener noreferrer") : rel}
                download={download}
                title={title || ""}
                className={baseClasses}
                onClick={disabled || loading ? (e) => e.preventDefault() : onClick}
                aria-disabled={disabled || loading}
            >
                {content}
            </a>
        );
    }

    // Render as button by default
    return (
        <button
            title={title || ""}
            type={type}
            className={baseClasses}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {content}
        </button>
    );
};

export default ButtonCard;