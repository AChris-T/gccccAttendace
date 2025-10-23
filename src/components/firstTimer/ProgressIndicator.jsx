import { CheckIcon } from "@/icons";

export const ProgressIndicator = ({ currentStep, totalSteps }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="w-full mb-8">
            <div className="block sm:hidden">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="text-xs font-bold text-[#24244e] dark:text-blue-400">
                            Step {currentStep} of {totalSteps}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold ">

                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            <span className="text-[#24244e] dark:text-blue-400">{Math.round((currentStep / totalSteps) * 100)}% </span>
                            Complete</span>
                    </div>
                </div>

                {/* Dot Progress Indicator */}
                <div className="relative flex items-center justify-between px-1">
                    {/* Background line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2" />

                    {/* Active progress line */}
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#24244e] to-[#3a3a6e] dark:from-blue-500 dark:to-blue-600 rounded-full -translate-y-1/2 transition-all duration-500 ease-out overflow-hidden"
                        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                    </div>

                    {/* Step dots */}
                    {steps.map((step) => {
                        const isCompleted = step < currentStep;
                        const isCurrent = step === currentStep;

                        return (
                            <div key={step} className="relative z-10">
                                <div
                                    className={`
                    w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs
                    transition-all duration-300 transform
                    ${isCompleted
                                            ? 'bg-gradient-to-br from-[#24244e] to-[#3a3a6e] dark:from-blue-500 dark:to-blue-600 text-white shadow-lg shadow-[#24244e]/30 dark:shadow-blue-500/30 scale-100'
                                            : isCurrent
                                                ? 'bg-white dark:bg-gray-800 border-3 border-[#24244e] dark:border-blue-500 text-[#24244e] dark:text-blue-500 scale-110 shadow-xl ring-4 ring-[#24244e]/20 dark:ring-blue-500/30'
                                                : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 scale-90'
                                        }
                  `}
                                >
                                    {isCompleted ? (
                                        <CheckIcon className="w-4 h-4" strokeWidth={3} />
                                    ) : (
                                        <span>{step}</span>
                                    )}

                                    {isCurrent && (
                                        <>
                                            <span className="absolute -inset-1 rounded-full bg-[#24244e]/20 dark:bg-blue-500/20 animate-ping" />
                                            <span className="absolute -inset-0.5 rounded-full bg-[#24244e]/10 dark:bg-blue-500/10 animate-pulse" />
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="hidden sm:block">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Your Progress
                    </h3>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {currentStep}/{totalSteps} Steps
                    </span>
                </div>

                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full -z-0">
                        <div
                            className="h-full bg-gradient-to-r from-[#24244e] to-[#3a3a6e] dark:from-blue-500 dark:to-blue-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                style={{
                                    animation: 'shimmer 2s infinite',
                                    backgroundSize: '200% 100%'
                                }}
                            />
                        </div>
                    </div>

                    {/* Step Circles */}
                    <div className="relative flex justify-between">
                        {steps.map((step) => {
                            const isCompleted = step < currentStep;
                            const isCurrent = step === currentStep;

                            return (
                                <div key={step} className="flex flex-col items-center">
                                    <div
                                        className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                      transition-all duration-300 transform relative
                      ${isCompleted
                                                ? 'bg-gradient-to-br from-[#24244e] to-[#3a3a6e] dark:from-blue-500 dark:to-blue-600 text-white scale-100 shadow-lg shadow-[#24244e]/30 dark:shadow-blue-500/30'
                                                : isCurrent
                                                    ? 'bg-white dark:bg-gray-800 border-2 border-[#24244e] dark:border-blue-500 text-[#24244e] dark:text-blue-500 scale-110 shadow-xl ring-4 ring-[#24244e]/10 dark:ring-blue-500/20'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 scale-90'
                                            }
                    `}
                                    >
                                        {isCompleted ? (
                                            <CheckIcon className="w-5 h-5" />
                                        ) : (
                                            <span>{step}</span>
                                        )}

                                        {isCurrent && (
                                            <span className="absolute -inset-1 rounded-full bg-[#24244e]/20 dark:bg-blue-500/20 animate-ping" />
                                        )}
                                    </div>

                                    <span
                                        className={`
                      mt-2 text-xs font-medium transition-all duration-300
                      ${isCurrent
                                                ? 'text-[#24244e] dark:text-blue-400 font-semibold'
                                                : isCompleted
                                                    ? 'text-gray-600 dark:text-gray-400'
                                                    : 'text-gray-400 dark:text-gray-500'
                                            }
                    `}
                                    >
                                        Step {step}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
      `}
            </style>
        </div>
    );
};
