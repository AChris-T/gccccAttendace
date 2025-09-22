import { useMemo } from "react";

export const LoginLoader = () => {
  return (
    <div className="max-w-[1940px] bg-[#24244e] mx-auto overflow-x-hidden">
      <div className="flex items-center justify-center w-full px-4 md:px-0">
        <div className="flex w-full justify-center items-center h-[100vh]">
          <div className="flex flex-col items-center w-full railway">
            {/* Logo Skeleton */}
            <div className="w-[150px] h-[60px] bg-gray-600/50 rounded animate-pulse mb-3"></div>

            {/* Text Skeleton */}
            <div className="w-[250px] h-[18px] bg-gray-600/50 rounded animate-pulse mb-10"></div>

            {/* Form Skeleton */}
            <div className="flex flex-col gap-3 w-full md:w-[450px] md:px-[30px]">
              {/* Input 1 */}
              <div className="h-[48px] w-full bg-gray-600/50 rounded animate-pulse"></div>

              {/* Input 2 */}
              <div className="h-[48px] w-full bg-gray-600/50 rounded animate-pulse"></div>

              {/* Button Skeleton */}
              <div className="h-[50px] w-full bg-gray-600/50 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonTableLoader = ({ columnCount = 10, rowCount = 50 }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {Array.from({ length: columnCount }).map((_, i) => (
              <th
                key={i}
                className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700"
              >{''}
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border-b text-sm text-gray-600"
                >
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const BarChartSkeleton = ({
  bars = 12,
  heights = null,
  maxHeight = 280,
  showLabels = true,
  className = "",
}) => {
  // deterministic pseudo-random heights if none provided
  const generatedHeights = useMemo(() => {
    if (Array.isArray(heights) && heights.length >= bars) {
      return heights.slice(0, bars).map((h) => Math.max(0, Math.min(1, Number(h))));
    }
    // simple stable generator (based on index) so layout is consistent
    return Array.from({ length: bars }).map((_, i) => {
      // produce values between 0.25 and 0.95
      const v = ((i * 37) % 100) / 100; // deterministic
      return 0.25 + (v * 0.7);
    });
  }, [bars, heights]);

  return (
    <div
      role="status"
      aria-label="Loading chart"
      className={`w-full ${className}`}
    >
      <div className="flex items-end gap-4 px-2 py-3" style={{ minHeight: maxHeight }}>
        {generatedHeights.map((h, idx) => {
          const heightPx = Math.round(h * maxHeight);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              {/* bar */}
              <div
                className="w-full rounded-t-md overflow-hidden"
                style={{
                  height: heightPx,
                  maxHeight,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div
                  className="w-full bg-gray-200 dark:bg-gray-700 animate-pulse"
                  style={{ height: Math.max(6, heightPx) }}
                />
              </div>

              {/* value placeholder above label */}
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />

              {/* label placeholder */}
              {showLabels && (
                <div className="mt-2 h-3 w-3/4 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* optional hint for screen readers */}
      <span className="sr-only">Chart loading — bars are placeholders</span>
    </div>
  );
}

export const AnalyticsSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-5 animate-pulse"
        >
          {/* Top section (icon + dropdown) */}
          <div className="flex justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl dark:bg-gray-700" />
            <div className="w-6 h-6 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>

          {/* Middle section (title + value) */}
          <div className="flex items-end justify-between mt-7">
            <div className="w-full">
              <div className="w-20 h-3 mb-2 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="w-16 h-5 bg-gray-300 rounded dark:bg-gray-600" />
            </div>

            <div className="w-10 h-6 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const DashboardSkeletonLoader = () => {
  return (
    <div className="space-y-6">
      {/* Top Filters */}
      <div className="flex gap-4">
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700" />
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700" />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Skeleton */}
        <div className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="h-56 w-56 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700" />
          <div className="flex justify-center gap-4 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 animate-pulse dark:bg-gray-600" />
                <div className="h-3 w-12 bg-gray-200 rounded dark:bg-gray-700 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Stacked Bar Chart Skeleton */}
        <div className="flex flex-col justify-between p-4 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="h-56 w-full bg-gray-200 rounded-md animate-pulse dark:bg-gray-700" />
          <div className="grid grid-cols-4 gap-3 mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 animate-pulse dark:bg-gray-600" />
                <div className="h-3 w-14 bg-gray-200 rounded dark:bg-gray-700 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly First Timers */}
        <div className="flex flex-col p-4 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="h-6 w-40 bg-gray-200 rounded-md mb-4 animate-pulse dark:bg-gray-700" />
          <div className="h-56 w-full bg-gray-200 rounded-md animate-pulse dark:bg-gray-700" />
        </div>

        {/* Monthly Integrated First Timers */}
        <div className="flex flex-col p-4 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="h-6 w-60 bg-gray-200 rounded-md mb-4 animate-pulse dark:bg-gray-700" />
          <div className="h-56 w-full bg-gray-200 rounded-md animate-pulse dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};