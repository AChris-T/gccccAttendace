import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/header/Navbar';
import { DashboardIcon, FormIcon, HomeIcon, LoadingIcon, LogoutIcon } from '../icons';
import ProgressBar from '../components/others/ProgressBar';
import { ScrollToTop } from '../components/others/ScrollToTop';
import { useLogout } from '../queries/auth.query';
import { useAuthStore } from '../store/auth.store';

const LayoutContent = () => {
    const { mutate, isPending } = useLogout()
    const { isAuthenticated, isAdmin } = useAuthStore();

    return (
        <div className="max-w-[1940px] bg-[#24244e] mx-auto shadow-card h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-50 max-w-[1940px] mx-auto bg-[#24244e]">
                <Navbar title='Home' />
            </div>

            <div className="flex-1 overflow-y-auto pt-[60px] pb-[72px]">
                <Outlet />
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[1940px] bg-[#11112b] mx-auto w-full flex justify-between lg:px-[142px] px-4 pt-3 pb-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${isActive ? 'text-white' : 'text-[#ffffffa8]'
                        }`
                    }
                >
                    <HomeIcon width={20} height={20} />
                    Home
                </NavLink>
                <NavLink
                    to={`/forms`}
                    className={({ isActive }) =>
                        `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${isActive ? 'text-white' : 'text-[#ffffffa8]'
                        }`
                    }
                >
                    <FormIcon width={20} height={20} />
                    Forms
                </NavLink>
                {isAuthenticated && (
                    <>
                        <NavLink
                            to={`${isAdmin ? '/dashboard/admin' : '/dashboard'}`}
                            className={({ isActive }) =>
                                `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${isActive ? 'text-white' : 'text-[#ffffffa8]'
                                }`
                            }
                        >
                            <DashboardIcon width={30} height={30} />
                            Dashboard
                        </NavLink>
                        <NavLink
                            onClick={mutate}
                            to='#'
                            className={({ isActive }) =>
                                `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${isActive ? 'text-white' : 'text-[#ffffffa8]'
                                }`
                            }
                        >
                            {isPending ? <LoadingIcon /> : <LogoutIcon />}
                            Logout
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

const HomeLayout = () => {
    return (
        <>
            <ProgressBar />
            <ScrollToTop />
            <LayoutContent />
        </>
    );
};

export default HomeLayout;