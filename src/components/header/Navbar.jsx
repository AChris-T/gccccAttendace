import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { ChevronDownIcon, CloseIcon, DashboardIcon, FormIcon, HomeIcon, LogoutIcon, MenuIcon, UserIcon } from '@/icons';
import { useLogout } from '@/queries/auth.query';
import { useAuthStore } from '@/store/auth.store';
import { useState, useEffect, useRef } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { mutateAsync: logout, isPending } = useLogout();
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  }

  const navItems = [
    { icon: HomeIcon, label: 'Home', path: '/', show: true, to: '/' },
    { icon: FormIcon, label: 'Forms', path: '/forms', show: true },
    { icon: DashboardIcon, label: 'Dashboard', path: isAdmin ? '/dashboard/admin' : '/dashboard', show: isAuthenticated },
  ];

  const NavLink = ({ icon: Icon, label, path, onClick, isButton }) => {
    const baseClasses = "group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ease-out";
    const hoverClasses = "hover:bg-white/10 hover:shadow-lg hover:shadow-white/5";
    const activeClasses = "bg-white/15 text-white shadow-lg shadow-white/10";
    const inactiveClasses = "text-white/70 hover:text-white";

    const content = (
      <>
        <Icon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" />
        <span className="hidden sm:inline-block text-sm">{label}</span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </>
    );

    if (isButton) {
      return (
        <button
          onClick={onClick}
          className={`${baseClasses} ${hoverClasses} ${inactiveClasses}`}
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        to={path}
        className={`${baseClasses} ${hoverClasses} ${path === '/' ? activeClasses : inactiveClasses}`}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
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
            {/* Logo & Time Section */}
            <div className="flex items-center gap-6">
              <Link to='/'>
                <img
                  src="/images/logo/logo-white.png"
                  alt="GCCC Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>

              {/* Desktop Time Display */}
              <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/90 font-mono text-sm font-medium tabular-nums">
                    {formatTime(time)}
                  </span>
                </div>
                <div className="w-px h-5 bg-white/20" />
                <span className="text-white/60 text-sm">
                  {formatDate(time)}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                {navItems.filter(item => item.show).map((item) => (
                  <NavLink key={item.path} {...item} />
                ))}
              </div>

              {/* User Dropdown */}
              {isAuthenticated && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Avatar size='xs' name={user?.initials} src={user?.avatar} />
                    <span className="hidden lg:inline text-sm font-medium">Account</span>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900/98 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm text-white/90 font-medium">{user?.full_name}</p>
                        <p className="text-xs text-white/50 mt-0.5">{user?.email}</p>
                      </div>
                      <div className="py-3">
                        <Link
                          to='/dashboard/profile'
                          onClick={() => {
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Button
                          startIcon={<LogoutIcon />}
                          loading={isPending}
                          onClick={handleLogout}
                          className="ml-5 w-[150px] mt-2"
                        >
                          <span>Logout</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon className='h-4 w-4' /> : <MenuIcon className='h-4 w-4' />}
            </button>
          </div>

          {/* Mobile Time Display */}
          <div className="flex md:hidden items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 font-mono text-xs font-medium tabular-nums">
                {formatTime(time)}
              </span>
            </div>
            <span className="text-white/60 text-xs">
              {formatDate(time)}
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 pb-6 pt-4 space-y-2 bg-[#24244e] backdrop-blur-2xl border-t border-white/10">
            {navItems.filter(item => item.show).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  to={item.path}
                  key={item.path}
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {isAuthenticated && (
              <>
                <div className="my-2 border-t border-white/10" />
                <div className="px-4 py-2">
                  <p className="text-sm text-white/90 font-medium">{user?.full_name}</p>
                  <p className="text-xs text-white/50 mt-0.5">{user?.email}</p>
                </div>
                <Link
                  to='/dashboard/profile'
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <UserIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">My Profile</span>
                </Link>
                <Button
                  startIcon={<LogoutIcon />}
                  className='w-full'
                  onClick={handleLogout}
                  loading={isPending}
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