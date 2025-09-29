const gradientPresets = [
    // Horizontal variations
    "bg-gradient-to-r from-yellow-200 via-orange-300 via-pink-400 to-purple-500",
    "bg-gradient-to-r from-blue-200 via-blue-400 via-teal-400 to-teal-600",
    "bg-gradient-to-r from-pink-200 via-pink-400 via-red-400 to-red-600",
    "bg-gradient-to-r from-green-200 via-green-400 via-emerald-400 to-emerald-600",
    "bg-gradient-to-r from-purple-200 via-purple-400 via-indigo-400 to-indigo-600",
    "bg-gradient-to-r from-yellow-200 via-yellow-400 via-orange-400 to-orange-600",
    "bg-gradient-to-r from-cyan-200 via-cyan-400 via-blue-400 to-blue-600",
    "bg-gradient-to-r from-rose-200 via-rose-400 via-pink-400 to-pink-600",
    "bg-gradient-to-r from-lime-200 via-lime-400 via-green-400 to-green-600",
    "bg-gradient-to-r from-violet-200 via-violet-400 via-purple-400 to-purple-600",

    // Diagonal variations
    "bg-gradient-to-br from-amber-200 via-orange-400 to-red-500",
    "bg-gradient-to-bl from-sky-200 via-blue-400 to-indigo-600",
    "bg-gradient-to-tr from-emerald-200 via-teal-400 to-cyan-600",
];

export const GradientCard = ({
    index = 0,
    height = "h-32",
    rounded = "rounded-lg",
    shadow = "shadow-lg",
    className = "",
    children,
}) => {
    const gradientClass = gradientPresets[index % gradientPresets.length];

    return (
        <div
            className={`${height} ${rounded} ${shadow} ${gradientClass} ${className} flex items-center justify-center w-full`}
        >
            {children}
        </div>
    );
};
