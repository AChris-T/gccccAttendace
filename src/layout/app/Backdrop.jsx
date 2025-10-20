import { useSidebar } from "@/context/SidebarContext";
import { CloseIcon } from "@/icons";

const Backdrop = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();
  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
    >
      <div className="absolute top-0 right-0 text-warning-25">
        <button
          className="absolute top-4 right-4 z-10 bg-red-50 hover:bg-red-100 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <CloseIcon className="w-6 h-6 text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default Backdrop;
