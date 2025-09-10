/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { IoMdLogOut } from 'react-icons/io';
import { PiNoteFill } from 'react-icons/pi';
import useAuthStore from '../../store/authStore';
import { MdAdminPanelSettings } from 'react-icons/md';
import Navbar from '../Modals/Navbar';

const DashboardPage = ({ isMarked, setIsMarked, attendanceType }) => {
  const [titleApp, setTitleApp] = useState('Home');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const source = params.get('source');
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const storeUser = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (source === 'online') {
      console.log('User is attending online');
    }
  }, [source]);
  const query = source === 'online' ? '?source=online' : '';
  const returnTo = encodeURIComponent(`${location.pathname}${location.search}`);

  return (
    <div
      className={`max-w-[1940px] ${
        isMarked ? `bg-[#24244e]` : 'bg-[#24244e]'
      } mx-auto shadow-card h-full`}
    >
      <div className="flex flex-col ">
        <div className="flex flex-col min-h-[100dvh]  justify-between w-full">
          <div>
            <Navbar title={titleApp} isMarked={isMarked} />
            <div className="md:h-[90dvh] overflow-y-scroll new mt-[-20px] md:mt-[-100px]">
              <Outlet />
            </div>
          </div>
          <div
            className={`max-w-[1940px] ${
              isMarked ? `bg-[#2E2E44]` : 'bg-[#2E2E44]'
            } w-full flex justify-between lg:px-[142px] px-4 pt-3 pb-4 bottom-0 fixed  `}
          >
            <NavLink
              to={`/${query}`}
              className={({ isActive }) =>
                `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${
                  isActive ? 'text-white' : 'text-[#ffffffa8]'
                }`
              }
            >
              <FaUserCheck className="text-[24px]" />
              Home
            </NavLink>
            <NavLink
              to={`/attendance${query}`}
              className={({ isActive }) =>
                `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${
                  isActive ? 'text-white' : 'text-[#ffffffa8]'
                }`
              }
            >
              <PiNoteFill className="text-[24px]" />
              Attendance
            </NavLink>
            <NavLink
              to={`/form${query}`}
              className={({ isActive }) =>
                `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${
                  isActive ? 'text-white' : 'text-[#ffffffa8]'
                }`
              }
            >
              <PiNoteFill className="text-[24px]" />
              Forms
            </NavLink>
            {storeUser?.role === 'admin' && (
              <NavLink
                to={'/admin'}
                className={({ isActive }) =>
                  `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${
                    isActive ? 'text-white' : 'text-[#ffffffa8]'
                  }`
                }
              >
                <MdAdminPanelSettings className="text-[24px]" /> Admin
              </NavLink>
            )}
            <NavLink
              to={`/login${query ? `${query}&` : '?'}returnTo=${returnTo}`}
              onClick={handleLogout}
              className={({ isActive }) =>
                `flex flex-col items-center rounded gap-[8px] h-[48px] px-2 text-[12px] font-medium ${
                  isActive ? 'text-white' : 'text-[#ffffffa8]'
                }`
              }
            >
              <IoMdLogOut className="text-[24px]" />
              Logout
            </NavLink>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DashboardPage;
