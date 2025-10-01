import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ProgressArc = ({
    percentage = 75.55,
    change = 10,
    label = null,
    size = 'md',
    strokeWidth = 'thick',
    showChange = true,
    animate = true,
    gradientColors = ['#4F46E5', '#6366F1'],
    backgroundColor = '#E5E7EB',
    duration = 1000,
    className = ''
}) => {
    const [displayPercentage, setDisplayPercentage] = useState(0);
    const [animatedOffset, setAnimatedOffset] = useState(0);
    const animationRef = useRef(null);

    // Size configurations
    const sizeConfig = {
        sm: { width: 200, height: 200, viewBox: '0 0 200 200', fontSize: 'text-3xl', changeFontSize: 'text-sm' },
        md: { width: 320, height: 320, viewBox: '0 0 200 200', fontSize: 'text-5xl', changeFontSize: 'text-lg' },
        lg: { width: 400, height: 400, viewBox: '0 0 200 200', fontSize: 'text-6xl', changeFontSize: 'text-xl' },
        xl: { width: 480, height: 480, viewBox: '0 0 200 200', fontSize: 'text-7xl', changeFontSize: 'text-2xl' }
    };

    // Stroke width configurations
    const strokeConfig = {
        thin: 12,
        normal: 16,
        thick: 24,
        extraThick: 32
    };

    const currentSize = sizeConfig[size];
    const currentStroke = strokeConfig[strokeWidth];

    // Calculate arc path and properties
    const radius = 65;
    const circumference = Math.PI * radius;
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const targetOffset = circumference * (1 - normalizedPercentage / 100);

    // Animate percentage counter
    useEffect(() => {
        if (!animate) {
            setDisplayPercentage(normalizedPercentage);
            setAnimatedOffset(targetOffset);
            return;
        }

        const startTime = Date.now();
        const startPercentage = 0;
        const startOffset = circumference;

        const animateValue = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);

            const currentPercentage = startPercentage + (normalizedPercentage - startPercentage) * eased;
            const currentOffset = startOffset + (targetOffset - startOffset) * eased;

            setDisplayPercentage(currentPercentage);
            setAnimatedOffset(currentOffset);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animateValue);
            }
        };

        animationRef.current = requestAnimationFrame(animateValue);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [percentage, animate, duration, normalizedPercentage, targetOffset, circumference]);

    // Determine change icon and color
    const getChangeIndicator = () => {
        if (change > 0) {
            return { Icon: TrendingUp, color: 'text-green-500', sign: '+' };
        } else if (change < 0) {
            return { Icon: TrendingDown, color: 'text-red-500', sign: '' };
        } else {
            return { Icon: Minus, color: 'text-gray-500', sign: '' };
        }
    };

    const { Icon: ChangeIcon, color: changeColor, sign } = getChangeIndicator();

    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: currentSize.width, height: currentSize.height }}>
            {/* SVG Arc Container */}
            <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox={currentSize.viewBox}
                style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                }}
            >
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id={`arcGradient-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: gradientColors[0], stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: gradientColors[1], stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id={`glow-${Math.random()}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background Arc (Gray) */}
                <path
                    d={`M ${100 - radius} 100 A ${radius} ${radius} 0 1 1 ${100 + radius} 100`}
                    fill="none"
                    stroke={backgroundColor}
                    strokeWidth={currentStroke}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                />

                {/* Progress Arc (Colored) */}
                <path
                    d={`M ${100 - radius} 100 A ${radius} ${radius} 0 1 1 ${100 + radius} 100`}
                    fill="none"
                    stroke={`url(#arcGradient-${Math.random()})`}
                    strokeWidth={currentStroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedOffset}
                    className="transition-all duration-100"
                    style={{
                        filter: `url(#glow-${Math.random()})`,
                        transition: animate ? 'none' : 'stroke-dashoffset 0.3s ease-out'
                    }}
                />
            </svg>

            {/* Center Content */}
            <div className="relative z-10 text-center">
                <div className={`${currentSize.fontSize} font-bold text-gray-900 dark:text-white mb-2 transition-all duration-300`}>
                    {displayPercentage.toFixed(2)}%
                </div>

                {showChange && (
                    <div className={`${currentSize.changeFontSize} font-semibold ${changeColor} flex items-center justify-center gap-1 transition-all duration-300`}>
                        <ChangeIcon className="w-4 h-4 animate-pulse" />
                        {sign}{Math.abs(change)}%
                    </div>
                )}

                {label && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressArc

// Demo Component
// const ProgressArcDemo = () => {
//     const [percentage, setPercentage] = useState(75.55);
//     const [change, setChange] = useState(10);
//     const [size, setSize] = useState('md');
//     const [strokeWidth, setStrokeWidth] = useState('thick');
//     const [animate, setAnimate] = useState(true);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-white dark:from-slate-900 dark:via-gray-900 dark:to-black transition-colors duration-300 p-8">
//             <div className="max-w-6xl mx-auto">
//                 <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
//                     Reusable Progress Arc Component
//                 </h1>

//                 {/* Controls */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
//                     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                         Controls
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {/* Percentage Control */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Percentage: {percentage}%
//                             </label>
//                             <input
//                                 type="range"
//                                 min="0"
//                                 max="100"
//                                 step="0.1"
//                                 value={percentage}
//                                 onChange={(e) => setPercentage(parseFloat(e.target.value))}
//                                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                             />
//                         </div>

//                         {/* Change Control */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Change: {change > 0 ? '+' : ''}{change}%
//                             </label>
//                             <input
//                                 type="range"
//                                 min="-50"
//                                 max="50"
//                                 step="1"
//                                 value={change}
//                                 onChange={(e) => setChange(parseInt(e.target.value))}
//                                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                             />
//                         </div>

//                         {/* Size Control */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Size
//                             </label>
//                             <select
//                                 value={size}
//                                 onChange={(e) => setSize(e.target.value)}
//                                 className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
//                             >
//                                 <option value="sm">Small</option>
//                                 <option value="md">Medium</option>
//                                 <option value="lg">Large</option>
//                                 <option value="xl">Extra Large</option>
//                             </select>
//                         </div>

//                         {/* Stroke Width Control */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Stroke Width
//                             </label>
//                             <select
//                                 value={strokeWidth}
//                                 onChange={(e) => setStrokeWidth(e.target.value)}
//                                 className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
//                             >
//                                 <option value="thin">Thin</option>
//                                 <option value="normal">Normal</option>
//                                 <option value="thick">Thick</option>
//                                 <option value="extraThick">Extra Thick</option>
//                             </select>
//                         </div>

//                         {/* Animation Toggle */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Animation
//                             </label>
//                             <button
//                                 onClick={() => setAnimate(!animate)}
//                                 className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${animate
//                                         ? 'bg-green-500 text-white hover:bg-green-600'
//                                         : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
//                                     }`}
//                             >
//                                 {animate ? 'Enabled' : 'Disabled'}
//                             </button>
//                         </div>

//                         {/* Randomize Button */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Quick Actions
//                             </label>
//                             <button
//                                 onClick={() => {
//                                     setPercentage(Math.random() * 100);
//                                     setChange((Math.random() * 60) - 30);
//                                 }}
//                                 className="w-full px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//                             >
//                                 Randomize
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Demo Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {/* Main Demo */}
//                     <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                             Custom Settings
//                         </h3>
//                         <ProgressArc
//                             percentage={percentage}
//                             change={change}
//                             size={size}
//                             strokeWidth={strokeWidth}
//                             animate={animate}
//                         />
//                     </div>

//                     {/* Preset 1: Success */}
//                     <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                             Success State
//                         </h3>
//                         <ProgressArc
//                             percentage={92.5}
//                             change={15.3}
//                             label="Revenue Growth"
//                             gradientColors={['#059669', '#10B981']}
//                             size="md"
//                             strokeWidth="thick"
//                         />
//                     </div>

//                     {/* Preset 2: Warning */}
//                     <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                             Warning State
//                         </h3>
//                         <ProgressArc
//                             percentage={45.8}
//                             change={-8.2}
//                             label="Performance Score"
//                             gradientColors={['#F59E0B', '#FBBF24']}
//                             size="md"
//                             strokeWidth="thick"
//                         />
//                     </div>

//                     {/* Preset 3: Danger */}
//                     <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                             Danger State
//                         </h3>
//                         <ProgressArc
//                             percentage={23.1}
//                             change={-12.5}
//                             label="System Health"
//                             gradientColors={['#DC2626', '#EF4444']}
//                             size="md"
//                             strokeWidth="thick"
//                         />
//                     </div>

//                     {/* Preset 4: Info */}
//                     <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                             Info State
//                         </h3>
//                         <ProgressArc
//                             percentage={68.9}
//                             change={3.2}
//                             label="User Engagement"
//                             gradientColors={['#0EA5E9', '#38BDF8']}
//                             size="md"
//                             strokeWidth="thick"
//                         />
//                     </div>

//                     {/* Preset 5: Purple */}
//                     <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                             Custom Purple
//                         </h3>
//                         <ProgressArc
//                             percentage={85.2}
//                             change={0}
//                             label="Completion Rate"
//                             gradientColors={['#7C3AED', '#A78BFA']}
//                             size="md"
//                             strokeWidth="thick"
//                         />
//                     </div>
//                 </div>

//                 {/* Usage Code */}
//                 <div className="mt-8 bg-gray-800 rounded-xl p-6 shadow-lg">
//                     <h2 className="text-xl font-bold text-white mb-4">Usage Example</h2>
//                     <pre className="text-green-400 text-sm overflow-x-auto">
//                         {`<ProgressArc
//   percentage={${percentage}}
//   change={${change}}
//   label="Custom Label"
//   size="${size}"
//   strokeWidth="${strokeWidth}"
//   animate={${animate}}
//   gradientColors={['#4F46E5', '#6366F1']}
//   backgroundColor="#E5E7EB"
//   duration={1000}
//   showChange={true}
// />`}
//                     </pre>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProgressArcDemo;