import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router-dom";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { ScrollToTop } from "../components/others/ScrollToTop";
import ProgressBar from "../components/others/ProgressBar";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <>
      <div className="min-h-screen xl:flex">
        <div>
          <AppSidebar />
          <Backdrop />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
            } ${isMobileOpen ? "ml-0" : ""}`}
        >
          <AppHeader />
          <div className="p-4 md:p-6 mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
// max-w-(--breakpoint-2xl) 
const AppLayout = () => {
  return (
    <>
      <ProgressBar />
      <ScrollToTop />
      <SidebarProvider>
        <LayoutContent />
      </SidebarProvider>
    </>
  );
};

export default AppLayout;
