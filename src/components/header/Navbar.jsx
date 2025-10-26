import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import {
  AttendanceIcon2,
  ChevronDownIcon,
  CloseIcon,
  DashboardIcon,
  FormIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  UserIcon
} from '@/icons';
import { useLogout } from '@/queries/auth.query';
import { useAuthStore } from '@/store/auth.store';
import { Toast } from '@/lib/toastify';
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton';
import RoleBadge from '@/components/userProfile/RoleBadge';

const Navbar = () => {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const { isAuthenticated, user } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, []);

  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }, []);

  const formatDate = useCallback((date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setMenuOpen(false);
      setDropdownOpen(false);
    } catch (error) {
      Toast.error('Logout failed:', error);
    }
  }, [logout]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  const navItems = useMemo(() => [
    {
      icon: HomeIcon,
      label: 'Home',
      path: '/',
      show: true,
      end: true
    },
    {
      icon: FormIcon,
      label: 'Forms',
      path: '/forms',
      show: true,
      end: false
    },
    {
      icon: LogoutIcon,
      label: 'Sign In',
      path: '/login',
      show: !isAuthenticated,
      end: false
    },
  ], [isAuthenticated]);

  const getNavLinkClasses = useCallback(({ isActive }) => {
    const baseClasses = 'relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ease-out';
    const activeClasses = 'bg-white/15 text-white shadow-sm';
    const inactiveClasses = 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/5';

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  }, []);

  const getMobileNavLinkClasses = useCallback(() => {
    return 'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group';
  }, []);

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled
          ? 'bg-[#24244e] backdrop-blur-2xl shadow-2xl shadow-black/20 border-white/10'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            <div className="flex items-center gap-6">
              <Link to='/' aria-label="Go to homepage">
                <img
                  src="/images/logo/logo-white.png"
                  alt="GCCC Logo"
                  className="h-10 md:h-14 w-auto object-contain"
                />
              </Link>

              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <time className="text-white/90 font-mono text-sm font-medium tabular-nums">
                    {formatTime(time)}
                  </time>
                </div>
                <div className="md:hidden lg:block  w-px h-5 bg-white/20" aria-hidden="true" />
                <time className="md:hidden lg:block text-white/60 text-sm">
                  {formatDate(time)}
                </time>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <nav
                className="flex items-center gap-1 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                aria-label="Main navigation"
              >
                {navItems
                  .filter(item => item.show)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={getNavLinkClasses}
                      >
                        <Icon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="hidden sm:inline-block text-sm">{item.label}</span>
                        <div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          aria-hidden="true"
                        />
                      </NavLink>
                    );
                  })}
              </nav>


              {isAuthenticated && (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <ThemeToggleButton className="h-8 w-8" />
                    <button onClick={toggleDropdown} className='flex items-center gap-2 text-white/80 hover:text-white  transition-all duration-300'>
                      <Avatar size='xs' name={user?.initials} src={user?.avatar} />
                      <span className="hidden lg:inline text-sm font-medium">{user?.first_name}</span>
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#24244e] backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm text-white/90 font-medium truncate">
                          {user?.full_name}
                        </p>
                        <p className="text-xs text-white/50 mt-0.5 mb-1 truncate">
                          {user?.email}
                        </p>
                        <RoleBadge showIcon />
                      </div>
                      <div className="p-3 space-y-1 border-b border-white/10">
                        <Link
                          to={'/dashboard'}
                          onClick={closeDropdown}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                          <DashboardIcon className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to='/dashboard/attendance'
                          onClick={closeDropdown}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                          <AttendanceIcon2 className="w-4 h-4" />
                          <span>Attendance</span>
                        </Link>
                        <Link
                          to='/dashboard/profile'
                          onClick={closeDropdown}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                      </div>
                      <div className="p-3 space-y-1 border-b border-white/10">
                        <Button
                          startIcon={<LogoutIcon height={20} width={20} />}
                          loading={isLoggingOut}
                          onClick={handleLogout}
                          className="w-full"
                          disabled={isLoggingOut}
                        >
                          <span>Logout</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='flex items-center gap-3 md:hidden'>
              <ThemeToggleButton className="h-9 w-9" />
              <button
                onClick={toggleMenu}
                className="md:hidden h-10 w-10 relative p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <CloseIcon className='h-4 w-4' />
                ) : (
                  <MenuIcon className='h-4 w-4' />
                )}
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <time className="text-white/90 font-mono text-xs font-medium tabular-nums">
                {formatTime(time)}
              </time>
            </div>
            <time className="text-white/60 text-xs">
              {formatDate(time)}
            </time>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 pb-6 pt-4 space-y-2 bg-[#24244e] backdrop-blur-2xl border-t border-white/10">
            {navItems?.filter(item => item.show)?.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={closeMenu}
                  className={getMobileNavLinkClasses}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}

            {isAuthenticated && (
              <>
                <div className="my-2 border-t border-white/10" />
                <div className="px-4 py-2">
                  <p className="text-sm text-white/90 font-medium truncate">
                    {user?.full_name}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5 mb-1 truncate">
                    {user?.email}
                  </p>
                  <RoleBadge showIcon />
                </div>
                <Link
                  to='/dashboard'
                  onClick={closeMenu}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <DashboardIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to='/dashboard/attendance'
                  onClick={closeMenu}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <AttendanceIcon2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">Attendance</span>
                </Link>
                <Link
                  to='/dashboard/profile'
                  onClick={closeMenu}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <UserIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">Profile</span>
                </Link>
                <div className="my-2 pb-2 border-t border-white/10" />
                <Button
                  startIcon={<LogoutIcon />}
                  className='w-full'
                  onClick={handleLogout}
                  loading={isLoggingOut}
                  disabled={isLoggingOut}
                >
                  <span className="font-medium">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;