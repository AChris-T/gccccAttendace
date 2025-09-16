import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import Button from "../ui/Button";
import { ArrowDownIcon, AttendanceIcon2, LogoutIcon, UserIcon2 } from "../../icons";
import { Dropdown } from '../../components/ui/dropdown/Dropdown'
import { DropdownItem } from '../../components/ui/dropdown/DropdownItem'
import Avatar from "../ui/Avatar";
import { Image } from "../../utils/constant";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuthStore()

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Avatar src={user?.avatar || Image} />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{user?.first_name}</span>
        <ArrowDownIcon isOpen={isOpen} />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <UserIcon2 className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
              Profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/dashboard/attendance"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <AttendanceIcon2 className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
              Attendance
            </DropdownItem>
          </li>
        </ul>
        <Button loading={loading} className="mt-2" onClick={logout} variant='neutral' startIcon={<LogoutIcon width={18} height={18} />}>Sign out</Button>
      </Dropdown>
    </div>
  );
}
