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
