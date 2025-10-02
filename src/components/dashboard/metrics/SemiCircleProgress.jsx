export const SemiCircleProgress = ({ percentage, fillColor, toColor, level }) => {
    const STROKE_WIDTH = 20;
    const SIZE = 330;
    const MOBILE_SIZE = 220;

    // Use responsive size
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const size = isMobile ? MOBILE_SIZE : SIZE;
    const strokeWidth = isMobile ? 16 : STROKE_WIDTH;

    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const strokeColor = '#e5e7eb';

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className="relative"
                style={{
                    width: '100%',
                    maxWidth: size,
                    height: size / 2 + 50
                }}
            >
                <svg
                    viewBox={`0 0 ${size} ${size / 2 + 50}`}
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Background Semi-Circle */}
                    <path
                        d={`M ${strokeWidth / 2} ${size / 2} 
              A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        className="dark:opacity-20"
                    />

                    {/* Progress Semi-Circle with Gradient */}
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={fillColor} />
                            <stop offset="100%" stopColor={toColor} />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <path
                        d={`M ${strokeWidth / 2} ${size / 2} 
              A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        filter="url(#glow)"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute top-24 inset-0 flex flex-col items-center justify-center pb-4 sm:pb-6">
                    <div className="text-center">
                        <p
                            className="text-4xl font-bold mb-1 sm:text-5xl sm:mb-2"
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${fillColor}, ${toColor})`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {percentage}%
                        </p>
                        <p
                            className="text-sm font-semibold sm:text-base"
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${fillColor}, ${toColor})`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {level}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};