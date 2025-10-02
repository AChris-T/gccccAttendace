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

export const TabContentLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#24244e]"></div>
      <p className="text-sm text-gray-600">Loading form...</p>
    </div>
  </div>
);
export const UnitCardSkeleton = () => {
  return (
    <div className="relative border shadow flex flex-col items-center rounded-[20px] p-4 bg-white bg-clip-border shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none animate-pulse">
      {/* Header */}
      <div className="relative flex w-full justify-center rounded-xl bg-gray-200 dark:bg-gray-700 h-[70px]">
        <div className="absolute bottom-2 w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      {/* Leaders */}
      <div className="mb-5 mt-10 flex flex-wrap gap-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="my-5 flex flex-wrap items-center gap-4">
        <div className="w-36 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-28 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export const VideoCardSkeleton = () => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Thumbnail placeholder */}
      <div className="relative overflow-hidden aspect-video bg-slate-200 dark:bg-slate-700 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse"></div>
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const AttendanceStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 animate-pulse">
      {/* Present Card Skeleton */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-8">
        {/* Icon placeholder */}
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl dark:bg-gray-700"></div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-6 w-32 mt-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>

          {/* Badge placeholder */}
          <div className="h-8 w-16 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>

      {/* Absent Card Skeleton */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-8">
        {/* Icon placeholder */}
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl dark:bg-gray-700"></div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-6 w-32 mt-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>

          {/* Badge placeholder */}
          <div className="h-8 w-16 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export const MonthlyTargetSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03] animate-pulse">
      {/* Header Skeleton */}
      <div className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded sm:h-6 sm:w-40" />
        <div className="mt-2 h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded sm:h-4 sm:w-56" />
      </div>

      {/* Chart Skeleton */}
      <div className="px-4 py-6 sm:px-6 sm:py-[75px]">
        <div className="flex flex-col items-center justify-center">
          {/* Semi-circle skeleton */}
          <div className="relative w-full max-w-[220px] sm:max-w-[280px]">
            <div className="aspect-[2/1] flex items-center justify-center">
              <div className="w-full h-full rounded-t-full border-b-0 border-[16px] sm:border-[20px] border-gray-200 dark:border-gray-700" />
            </div>

            {/* Center text skeleton */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-4 sm:pb-6">
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:h-12 sm:w-24" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded sm:h-5 sm:w-20" />
            </div>
          </div>

          {/* Message Skeleton */}
          <div className="mt-4 sm:mt-6 w-full max-w-xs space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
