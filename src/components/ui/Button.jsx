
import { LoadingIcon2 } from '@/icons';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  href,
  title,
  className = "",
  disabled = false,
  type = "button",
  loading = false,
  target = "_self",
  rel = "",
}) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const createRipple = (event) => {
    if (disabled || loading) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    // Call the original onClick handler
    if (onClick) onClick(event);
  };

  const baseClasses = "h-10 sm:h-11 text-sm sm:text-base px-4 sm:px-5 gap-2 relative overflow-hidden";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#119bd6] via-[#0d8ac0] to-[#0a7eb3] " +
      "text-white rounded-lg shadow-md shadow-[#119bd6]/20 font-semibold " +
      "hover:shadow-xl hover:shadow-[#119bd6]/40 hover:brightness-110 hover:-translate-y-0.5 " +
      "active:brightness-95 active:scale-[0.97] active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:shadow-[#119bd6]/25 dark:hover:shadow-[#119bd6]/50",

    "outline-primary":
      "bg-transparent border-2 border-[#119bd6] text-[#119bd6] rounded-lg font-semibold " +
      "hover:bg-[#119bd6]/10 hover:border-[#0d8ac0] hover:shadow-md hover:shadow-[#119bd6]/20 hover:-translate-y-0.5 " +
      "active:scale-[0.97] active:bg-[#119bd6]/20 active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:border-[#119bd6] dark:text-[#119bd6] dark:hover:bg-[#119bd6]/15",

    danger:
      "bg-gradient-to-r from-[#eb2225] via-[#d41e21] to-[#c11a1d] " +
      "text-white rounded-lg shadow-md shadow-[#eb2225]/20 font-semibold " +
      "hover:shadow-xl hover:shadow-[#eb2225]/40 hover:brightness-110 hover:-translate-y-0.5 " +
      "active:brightness-95 active:scale-[0.97] active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:shadow-[#eb2225]/25 dark:hover:shadow-[#eb2225]/50",

    "outline-danger":
      "bg-transparent border-2 border-[#eb2225] text-[#eb2225] rounded-lg font-semibold " +
      "hover:bg-[#eb2225]/10 hover:border-[#d41e21] hover:shadow-md hover:shadow-[#eb2225]/20 hover:-translate-y-0.5 " +
      "active:scale-[0.97] active:bg-[#eb2225]/20 active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:border-[#eb2225] dark:text-[#eb2225] dark:hover:bg-[#eb2225]/15",

    light:
      "bg-white text-gray-700 rounded-lg shadow-md shadow-gray-200/80 border border-gray-200 font-semibold " +
      "hover:shadow-lg hover:shadow-gray-300/60 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 " +
      "active:scale-[0.97] active:bg-gray-100 active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 " +
      "dark:shadow-gray-900/40 dark:hover:shadow-gray-900/60 dark:hover:bg-gray-750 dark:hover:border-gray-600",

    "outline-light":
      "bg-transparent border-2 border-gray-300 text-gray-600 rounded-lg font-semibold " +
      "hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:shadow-gray-200/50 hover:-translate-y-0.5 " +
      "active:scale-[0.97] active:bg-gray-200 active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:border-gray-500",

    dark:
      "bg-gradient-to-r from-[#101828] via-[#1a2235] to-[#0f1624] " +
      "text-white rounded-lg shadow-md shadow-gray-900/40 font-semibold " +
      "hover:shadow-xl hover:shadow-gray-900/60 hover:brightness-125 hover:-translate-y-0.5 " +
      "active:brightness-100 active:scale-[0.97] active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:from-gray-700 dark:via-gray-650 dark:to-gray-700 dark:shadow-gray-950/50",

    "outline-dark":
      "bg-transparent border-2 border-gray-600 text-gray-700 rounded-lg font-semibold " +
      "hover:bg-gray-100 hover:border-gray-700 hover:shadow-md hover:shadow-gray-400/30 hover:-translate-y-0.5 " +
      "active:scale-[0.97] active:bg-gray-200 active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-400",

    ghost:
      "bg-gray-200/90 text-gray-700 rounded-lg font-semibold " +
      "hover:bg-gray-300 hover:shadow-md hover:shadow-gray-300/50 hover:-translate-y-0.5 " +
      "active:scale-[0.97] active:bg-gray-400/80 active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:bg-gray-700/90 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:shadow-gray-900/40",
    neutral:
      "bg-gray-200/90 text-gray-700 rounded-lg font-semibold " +
      "hover:bg-gray-300 hover:shadow-md hover:shadow-gray-300/50 hover:-translate-y-0.5 " +
      "active:scale-[0.97] active:bg-gray-400/80 active:translate-y-0 " +
      "transition-all duration-200 ease-out " +
      "dark:bg-gray-700/90 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:shadow-gray-900/40",
  };

  const disabledClasses =
    disabled || loading
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer";

  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-[#119bd6] dark:focus-visible:ring-[#119bd6] dark:focus-visible:ring-offset-gray-900";

  const combinedClasses = `
    inline-flex items-center justify-center
    ${variant !== 'neutral' ? baseClasses : 'text-xs p-2 gap-1 relative overflow-hidden'}
    ${variantClasses[variant] || variantClasses['primary']}
    ${disabledClasses}
    ${focusClasses}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const renderStartIcon = () => {
    if (loading) return <LoadingIcon2 />;
    if (startIcon) return <span className="flex items-center shrink-0">{startIcon}</span>;
    return null;
  };

  const renderEndIcon = () => {
    if (endIcon && !loading) {
      return <span className="flex items-center shrink-0">{endIcon}</span>;
    }
    return null;
  };

  const RippleEffect = () => (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animation: 'ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      ))}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );

  const ButtonContent = () => (
    <>
      {renderStartIcon()}
      {!loading && <span className="truncate flex items-center gap-1 font-semibold">{children}</span>}
      {renderEndIcon()}
      <RippleEffect />
    </>
  );

  if (href && !disabled && !loading) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    const finalRel = rel || (target === "_blank" ? "noopener noreferrer" : "");

    return (
      isExternal ?
        <a
          ref={buttonRef}
          href={href}
          target={target}
          rel={finalRel}
          title={title || ""}
          className={`group ${combinedClasses}`}
          onClick={createRipple}
        >
          <ButtonContent />
        </a> :
        <Link
          ref={buttonRef}
          to={href}
          target={target}
          rel={finalRel}
          title={title || ""}
          className={`group ${combinedClasses}`}
          onClick={createRipple}
        >
          <ButtonContent />
        </Link>
    );
  }

  return (
    <button
      ref={buttonRef}
      title={title || ""}
      type={type}
      className={`group ${combinedClasses}`}
      onClick={createRipple}
      disabled={disabled || loading}
    >
      <ButtonContent />
    </button>
  );
};

export default Button;