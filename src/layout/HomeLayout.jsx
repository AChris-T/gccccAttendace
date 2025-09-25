import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/header/Navbar';
import { DashboardIcon, FormIcon, HomeIcon, LoadingIcon, LogoutIcon } from '../icons';
import ProgressBar from '../components/others/ProgressBar';
import { ScrollToTop } from '../components/others/ScrollToTop';
import { useLogout } from '../hooks/queries/auth.query';
import { useAuthStore } from '../store/auth.store';

const LayoutContent = () => {
    const { mutate, isPending } = useLogout()
    const { isAuthenticated, isAdmin } = useAuthStore();

    return (
        <div
            className={`max-w-[1940px] bg-[#24244e] mx-auto shadow-card h-full`}
        >
            <div className="flex flex-col ">
                <div className="flex flex-col min-h-[100dvh]  justify-between w-full">
                    <div>
                        <Navbar title='Home' />
                        <div className="md:h-[90dvh] overflow-y-scroll new mt-[-20px] md:mt-[-100px]">
                            <Outlet />
                        </div>
                    </div>
                    <div
                        className={`max-w-[1940px] bg-[#2E2E44] w-full flex justify-between lg:px-[142px] px-4 pt-3 pb-4 bottom-0 fixed `}
                    >
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
                        {isAuthenticated &&
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
                        }
                    </div>
                </div>
            </div>
        </div >
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