import { LoadingIcon2 } from "@/icons";

const Button = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  title,
  className = "",
  disabled = false,
  type = "button",
  loading = false,
}) => {
  // Size Classes - Improved responsive sizing
  const sizeClasses = {
    sm: "h-8 sm:h-9 text-xs sm:text-sm px-3 sm:px-4 gap-1.5",
    md: "h-10 sm:h-11 text-sm sm:text-base px-4 sm:px-5 gap-2",
    lg: "h-12 sm:h-14 text-base sm:text-lg px-5 sm:px-6 gap-2.5",
    xl: "h-14 sm:h-16 text-lg sm:text-xl px-6 sm:px-8 gap-3",
  };

  // Modern Variant Classes with Dark Mode Support
  const variantClasses = {
    // Solid variants with refined shadows and modern colors
    primary:
      "bg-blue-600 text-white rounded-lg shadow-sm " +
      "hover:bg-blue-700 hover:shadow-md active:bg-blue-800 " +
      "dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700",

    secondary:
      "bg-gray-600 text-white rounded-lg shadow-sm " +
      "hover:bg-gray-700 hover:shadow-md active:bg-gray-800 " +
      "dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-800",

    success:
      "bg-green-600 text-white rounded-lg shadow-sm " +
      "hover:bg-green-700 hover:shadow-md active:bg-green-800 " +
      "dark:bg-green-500 dark:hover:bg-green-600 dark:active:bg-green-700",

    danger:
      "bg-red-600 text-white rounded-lg shadow-sm " +
      "hover:bg-red-700 hover:shadow-md active:bg-red-800 " +
      "dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700",

    warning:
      "bg-amber-500 text-white rounded-lg shadow-sm " +
      "hover:bg-amber-600 hover:shadow-md active:bg-amber-700 " +
      "dark:bg-amber-400 dark:hover:bg-amber-500 dark:active:bg-amber-600",

    info:
      "bg-cyan-500 text-white rounded-lg shadow-sm " +
      "hover:bg-cyan-600 hover:shadow-md active:bg-cyan-700 " +
      "dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:active:bg-cyan-600",

    // Outline variants with modern styling
    "outline-primary":
      "bg-transparent border-2 border-blue-600 text-blue-600 rounded-lg " +
      "hover:bg-blue-50 hover:border-blue-700 active:bg-blue-100 " +
      "dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/30 dark:hover:border-blue-300",

    "outline-secondary":
      "bg-transparent border-2 border-gray-600 text-gray-600 rounded-lg " +
      "hover:bg-gray-50 hover:border-gray-700 active:bg-gray-100 " +
      "dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-800/30 dark:hover:border-gray-300",

    "outline-success":
      "bg-transparent border-2 border-green-600 text-green-600 rounded-lg " +
      "hover:bg-green-50 hover:border-green-700 active:bg-green-100 " +
      "dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950/30 dark:hover:border-green-300",

    "outline-danger":
      "bg-transparent border-2 border-red-600 text-red-600 rounded-lg " +
      "hover:bg-red-50 hover:border-red-700 active:bg-red-100 " +
      "dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:border-red-300",

    "outline-warning":
      "bg-transparent border-2 border-amber-500 text-amber-600 rounded-lg " +
      "hover:bg-amber-50 hover:border-amber-600 active:bg-amber-100 " +
      "dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-950/30 dark:hover:border-amber-300",

    "outline-info":
      "bg-transparent border-2 border-cyan-500 text-cyan-600 rounded-lg " +
      "hover:bg-cyan-50 hover:border-cyan-600 active:bg-cyan-100 " +
      "dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-950/30 dark:hover:border-cyan-300",

    // Ghost variants - subtle background on hover
    ghost:
      "bg-transparent text-gray-700 rounded-lg " +
      "hover:bg-gray-100 active:bg-gray-200 " +
      "dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700",

    "ghost-primary":
      "bg-transparent text-blue-600 rounded-lg " +
      "hover:bg-blue-50 active:bg-blue-100 " +
      "dark:text-blue-400 dark:hover:bg-blue-950/30 dark:active:bg-blue-950/50",

    "ghost-danger":
      "bg-transparent text-red-600 rounded-lg " +
      "hover:bg-red-50 active:bg-red-100 " +
      "dark:text-red-400 dark:hover:bg-red-950/30 dark:active:bg-red-950/50",

    // Soft variants - light background with matching text
    "soft-primary":
      "bg-blue-100 text-blue-700 rounded-lg " +
      "hover:bg-blue-200 active:bg-blue-300 " +
      "dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/60",

    "soft-success":
      "bg-green-100 text-green-700 rounded-lg " +
      "hover:bg-green-200 active:bg-green-300 " +
      "dark:bg-green-950/40 dark:text-green-300 dark:hover:bg-green-950/60",

    "soft-danger":
      "bg-red-100 text-red-700 rounded-lg " +
      "hover:bg-red-200 active:bg-red-300 " +
      "dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/60",

    // Light/Dark variants
    light:
      "bg-gray-100 text-gray-900 rounded-lg shadow-sm " +
      "hover:bg-gray-200 active:bg-gray-300 " +
      "dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",

    dark:
      "bg-gray-900 text-white rounded-lg shadow-sm " +
      "hover:bg-gray-800 active:bg-gray-950 " +
      "dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",

    // Neutral with subtle styling
    neutral:
      "bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm " +
      "hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 " +
      "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 " +
      "dark:hover:bg-gray-750 dark:hover:border-gray-600",

    // Accent - brand color
    accent:
      "bg-purple-600 text-white rounded-lg shadow-sm " +
      "hover:bg-purple-700 hover:shadow-md active:bg-purple-800 " +
      "dark:bg-purple-500 dark:hover:bg-purple-600 dark:active:bg-purple-700",

    // Link style
    link:
      "bg-transparent text-blue-600 rounded-lg underline-offset-4 " +
      "hover:underline hover:text-blue-700 active:text-blue-800 " +
      "dark:text-blue-400 dark:hover:text-blue-300",

    // Gradient variants
    gradient:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-sm " +
      "hover:from-blue-700 hover:to-purple-700 hover:shadow-md " +
      "dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600",
  };

  // Disabled state classes
  const disabledClasses = disabled || loading
    ? "cursor-not-allowed opacity-50 pointer-events-none"
    : "cursor-pointer";

  // Focus visible styles
  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900";

  return (
    <button
      title={title || ""}
      type={type}
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-200 ease-in-out
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${focusClasses}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoadingIcon2 />
      ) : (
        <>
          {startIcon && <span className="flex items-center shrink-0">{startIcon}</span>}
          <span className="truncate">{children}</span>
          {endIcon && <span className="flex items-center shrink-0">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;