import { useLogout } from '@/queries/auth.query';
import { useAuthStore } from '@/store/auth.store';
import dayjs from 'dayjs';
import { Link, NavLink } from 'react-router-dom';
import {
  CancelIcon,
  DashboardIcon,
  FormIcon,
  HamburgerIcon,
  HomeIcon,
  LoadingIcon,
  LogoutIcon,
} from '@/icons';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { mutate, isPending } = useLogout();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [now, setNow] = useState(dayjs());
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const t = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(t);
  }, []);

  const formattedDateTime = now.format('dddd  [,] MMMM DD YYYY');
  const formattedTime = now.format('hh:mm:ss A ');
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-3 relative flex items-center justify-between rounded-2xl border border-white/10 px-3 py-2 backdrop-blur-xl">
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col  gap-1">
                <Link to="/" className="flex" aria-label="Go to home">
                  <img
                    src="/images/logo/logo-white.png"
                    alt="GCCC Logo"
                    className="h-10 w-auto object-contain"
                  />
                </Link>

                {/* <p className="text-[14px] flex items-center gap-2 text-white leading-6 font-normal">
              {formattedTime} |{' '}
              <span className="text-[#86888A]">
                {formattedDateTime}
              </span>{' '}
            </p> */}
                <div className="flex items-center gap-2 text-sm text-white">
                  <span className="font-medium tabular-nums">
                    {formattedTime}
                  </span>
                  <span className="text-white/40">|</span>
                  <span className="text-white/70">{formattedDateTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <HomeIcon width={18} height={18} />
                    <span className="hidden sm:inline">Home</span>
                  </NavLink>
                  <NavLink
                    to={`/forms`}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <FormIcon width={18} height={18} />
                    <span className="hidden sm:inline">Forms</span>
                  </NavLink>
                  {isAuthenticated && (
                    <>
                      <NavLink
                        to={`${isAdmin ? '/dashboard/admin' : '/dashboard'}`}
                        className={({ isActive }) =>
                          `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-white/15 text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`
                        }
                      >
                        <DashboardIcon width={18} height={18} />
                        <span className="hidden sm:inline">Dashboard</span>
                      </NavLink>
                      <NavLink
                        onClick={mutate}
                        to="#"
                        className={({ isActive }) =>
                          `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-white/15 text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`
                        }
                      >
                        {isPending ? <LoadingIcon /> : <LogoutIcon />}
                        <span className="hidden sm:inline">Logout</span>
                      </NavLink>
                    </>
                  )}
                </div>
                {/* Mobile hamburger */}
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {menuOpen ? <CancelIcon /> : <HamburgerIcon />}
                </button>
              </div>

              {menuOpen && (
                <div
                  id="mobile-menu"
                  className="absolute inset-x-0 top-full mt-2 md:hidden z-[60] rounded-xl border border-white/10 bg-slate-900/80 p-2 shadow-xl backdrop-blur-xl max-h-[calc(100vh-120px)] overflow-y-auto"
                >
                  <nav className="flex flex-col divide-y divide-white/10">
                    <NavLink
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between gap-3 px-3 py-3 text-base font-medium ${
                          isActive
                            ? 'text-white'
                            : 'text-white/80 hover:text-white'
                        }`
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        <HomeIcon width={18} height={18} />
                        Home
                      </span>
                    </NavLink>
                    <NavLink
                      to={`/forms`}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between gap-3 px-3 py-3 text-base font-medium ${
                          isActive
                            ? 'text-white'
                            : 'text-white/80 hover:text-white'
                        }`
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        <FormIcon width={18} height={18} />
                        Forms
                      </span>
                    </NavLink>
                    {isAuthenticated && (
                      <>
                        <NavLink
                          to={`${isAdmin ? '/dashboard/admin' : '/dashboard'}`}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between gap-3 px-3 py-3 text-base font-medium ${
                              isActive
                                ? 'text-white'
                                : 'text-white/80 hover:text-white'
                            }`
                          }
                        >
                          <span className="inline-flex items-center gap-2">
                            <DashboardIcon width={18} height={18} />
                            Dashboard
                          </span>
                        </NavLink>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            mutate();
                          }}
                          className="flex items-center justify-between gap-3 px-3 py-3 text-left text-base font-medium text-white/80 hover:text-white"
                        >
                          <span className="inline-flex items-center gap-2">
                            {isPending ? <LoadingIcon /> : <LogoutIcon />}
                            Logout
                          </span>
                        </button>
                      </>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
