import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";
import { Toast } from "@/lib/toastify";

// Icon Components
export const HomeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MaximizeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MinimizeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PageBreadcrumb = ({ pageTitle, description, icon: PageIcon }) => {
  const { isAdmin } = useAuthStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        Toast.error("Fullscreen error:", err)
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      {/* Left Section - Page Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3">
          {PageIcon && (
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-900/30">
              <PageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {pageTitle}
              </h1>
            </div>
            {description && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Breadcrumb & Actions */}
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {/* Breadcrumb Navigation */}
        <nav className="hidden sm:block" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                to={`${isAdmin ? '/dashboard/admin' : '/dashboard'}`}
                className="group flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <HomeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </li>
            <li>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-600" />
            </li>
            <li>
              <span className="px-3 py-1.5 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg">
                {pageTitle}
              </span>
            </li>
          </ol>
        </nav>

        <nav className="sm:hidden inline-flex items-center gap-2 pr-3 py-1.5" aria-label="Breadcrumb">
          <Link
            to={`${isAdmin ? '/dashboard/admin' : '/dashboard'}`}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
          >
            <HomeIcon className="w-4 h-4" />
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span className="text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg">
            {pageTitle}
          </span>
        </nav>

        <button
          onClick={toggleFullscreen}
          className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <MinimizeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <MaximizeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PageBreadcrumb;