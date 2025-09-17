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
  bars = 10,
  heights = null,
  maxHeight = 160,
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

