
import { memo } from "react";

const SuccessCompletion = memo(() => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl">
                {/* Main Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 dark:from-gray-900 dark:via-green-950/20 dark:to-emerald-950/30 border border-green-100 dark:border-green-900/30 shadow-2xl shadow-green-500/10 dark:shadow-green-500/5">

                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-400/20 dark:from-green-500/10 dark:to-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-emerald-400/20 to-green-400/20 dark:from-emerald-500/10 dark:to-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>

                    {/* Content Container */}
                    <div className="relative px-5 py-12 z-10 text-center">

                        {/* Success Icon with Animation */}
                        <div className="relative mx-auto mb-8 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                            {/* Outer Ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 opacity-20 animate-ping" />

                            {/* Main Circle */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 shadow-lg shadow-green-500/30 dark:shadow-green-500/20 flex items-center justify-center animate-scale-in">
                                {/* Checkmark Icon */}
                                <svg
                                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white animate-draw-check"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            {/* Sparkles */}
                            <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 dark:bg-yellow-300 rounded-full animate-sparkle" />
                            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-sparkle delay-300" />
                            <div className="absolute top-1/2 -right-3 w-2.5 h-2.5 bg-green-400 dark:bg-green-300 rounded-full animate-sparkle delay-500" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5">
                            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent animate-fade-in">
                                Submission Successful!
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 max-w-xl mx-auto leading-relaxed animate-fade-in-delay-1">
                            We’re so glad you joined us today! It was a joy having you fellowship with us. Your details have been received, and we look forward to connecting with you soon.
                        </p>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 max-w-xl mx-auto leading-relaxed animate-fade-in-delay-1">
                            May your week be filled with peace and God’s blessings!
                        </p>

                        {/* Action Button */}
                        <button
                            onClick={() => window.location.reload()}
                            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-400 dark:hover:to-emerald-400 text-white font-semibold text-base sm:text-lg rounded-2xl shadow-lg shadow-green-500/30 dark:shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40 dark:hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 animate-fade-in-delay-3"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Complete</span>
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>

                        {/* Decorative Divider */}
                        <div className="mt-10 sm:mt-12 lg:mt-14 pt-8 sm:pt-10 border-t border-gray-200 dark:border-gray-700/50 animate-fade-in-delay-4">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                                <svg
                                    className="w-4 h-4 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Your data is secure and encrypted
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes draw-check {
          0% {
            stroke-dasharray: 0, 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100, 0;
            opacity: 1;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-draw-check {
          animation: draw-check 0.8s ease-out 0.3s forwards;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .animate-sparkle.delay-300 {
          animation-delay: 0.3s;
        }

        .animate-sparkle.delay-500 {
          animation-delay: 0.5s;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out 0.5s both;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.6s ease-out 0.7s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.9s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.6s ease-out 1.1s both;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.6s ease-out 1.3s both;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
        </div>
    );
});

SuccessCompletion.displayName = "SuccessCompletion";
export default SuccessCompletion;