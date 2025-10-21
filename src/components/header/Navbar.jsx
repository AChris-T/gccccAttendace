import { useLogout } from '@/queries/auth.query';
import { useAuthStore } from '@/store/auth.store';
import dayjs from 'dayjs';
import { Link, NavLink } from 'react-router-dom';
import { DashboardIcon, FormIcon, HomeIcon, LoadingIcon, LogoutIcon } from '@/icons';


const Navbar = () => {
  const { mutate, isPending } = useLogout()
  const { isAuthenticated, isAdmin } = useAuthStore();

  const formattedDateTime = dayjs().format('dddd  [,] MMMM DD YYYY');
  const formattedTime = dayjs().format('hh:mm A ');
  return (
    <>
      <div className='fixed top-0 right-0 left-0 z-50 container mx-auto'>
        <div className="flex w-full  items-center z-50 relative  justify-between md:items-center px-4">
          <div>

            <Link to='/' className='hidden md:flex'>
              <img
                src='/images/logo/logo-white.png'
                alt="menu"
                className="w-[200px] h-[80px] object-contain"
              />
            </Link>
            <Link to='/' className='md:hidden'>
              <img
                src='/images/logo/gccc.png'
                alt="menu"
                className="flex w-[80px] h-[80px] object-cover"
              />
            </Link>

            <p className="text-[14px] flex items-center gap-2 text-white leading-6 font-normal">
              {formattedTime} |{' '}
              <span className="text-[#86888A]">
                {formattedDateTime}
              </span>{' '}
            </p>
          </div>



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
    </>
  );
};

export default Navbar;
