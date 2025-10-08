import { useRef } from "react";
import { ExpandFullScreenIcon, MenuIcon } from "../../icons";

const ComponentCard = ({
  title,
  children,
  className = "",
  desc = "",
  icon
}) => {

  const divRef = useRef(null);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      divRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <div className="px-6 py-5 gap-x-10 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] flex justify-between !items-start mt-5 shadow">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            {icon ? icon : <MenuIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />}
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
            {desc && (
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                {desc}
              </p>
            )}
          </div>
        </div>
        <div>
          <button onClick={toggleFullscreen} type="button" variant="neutral" className="!p-0 !bg-none border-0 shadow-none text-gray-700 dark:text-white/90"><ExpandFullScreenIcon width={27} height={27} /></button>
        </div>
      </div>
      <div ref={divRef} className="space-y-6">{children}</div>
    </>
  );
};

export default ComponentCard;
