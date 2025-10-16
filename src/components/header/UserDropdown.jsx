import { useState } from "react";
import { ArrowDownIcon, AttendanceIcon2, DashboardIcon, LogoutIcon, UserIcon2 } from "@/icons";
import { Dropdown } from '../../components/ui/dropdown/Dropdown'
import { DropdownItem } from '../../components/ui/dropdown/DropdownItem'
import { useLogout } from "@/queries/auth.query";
import { useAuthStore } from "@/store/auth.store";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";


export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, isLeader } = useAuthStore();
  const { mutate, isPending } = useLogout();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <Avatar
          size="sm" src={user?.avatar || ''} name={user?.initials || ''}
        />
        <span className="block mr-1 font-medium text-theme-sm">
          {user?.first_name}
        </span>
        <ArrowDownIcon isOpen={isOpen} />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={toggleDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
          <Badge size="sm" color={isAdmin ? 'error' : isLeader ? 'warning' : 'primary'}>{isAdmin ? 'Admin' : isLeader ? 'Leader' : 'Member'}</Badge>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={toggleDropdown}
              tag="a"
              to={`${isAdmin ? "/dashboard/admin" : "/dashboard"}`}
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <DashboardIcon className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
              Dashboard
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={toggleDropdown}
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
              onItemClick={toggleDropdown}
              tag="a"
              to="/dashboard/attendance"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <AttendanceIcon2 className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
              Attendance
            </DropdownItem>
          </li>
        </ul>

        <Button
          loading={isPending}
          className="mt-2"
          size="sm"
          onClick={mutate}
          variant="neutral"
          startIcon={<LogoutIcon width={18} height={18} />}
        >
          Sign out
        </Button>
      </Dropdown>
    </div>
  );
}
