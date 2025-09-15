import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useAttendanceStore } from '../../store/attendance.store';
import { LoadingIcon } from '../../icons';
import { formatDisplayDate } from '../../utils/helper'
import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';


export default function AttendancePage() {
    const { filteredAttendanceHistory, fetchAttendanceHistory, selectedMonth, setSelectedMonth, loading } = useAttendanceStore();

    useEffect(() => {
        fetchAttendanceHistory();
    }, [fetchAttendanceHistory]);

    const filteredResults = filteredAttendanceHistory() || [];

    return (
        <>
            <PageMeta title="Attendance | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Attendance" />
            <div className="">
                <div className="overflow-x-auto max-w-full w-full mt-[20px]">
                    <div className="bg-[#2E2E44] w-full p-5 rounded-lg min-w-full">
                        <div className="flex flex-col-reverse items-start justify-between w-full gap-4 md:flex-row md:items-center">
                            <div className="flex flex-wrap items-center justify-center w-full gap-3 md:justify-start">
                                <div className="h-14 py-3  rounded-lg px-2 font-medium text-sm border-[#444466] border bg-[#1E1E2F]">
                                    <select
                                        className="bg-[#1E1E2F] w-full pr-5 text-white  h-full focus:outline-none"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                    >
                                        <option value="All">All Months</option>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const month = new Date(0, i).toLocaleString('default', {
                                                month: 'long',
                                            });
                                            return (
                                                <option key={month} value={month}>
                                                    {month}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="items-center justify-center hidden w-full gap-2 md:flex md:justify-end">
                                <h3 className="text-white">Current Streak:</h3>
                                <div className="bg-[#FF7242] border-2 border-[#FFC857] rounded-full w-[151px] h-[44px] flex items-center justify-center text-white font-semibold">
                                    Coming Soon 🔥
                                </div>
                            </div>
                        </div>

                        <div>
                            {loading ? (
                                <div className="flex items-center justify-center w-full h-64">
                                    <div className="text-xl text-white">
                                        <LoadingIcon height={50} width={50} />
                                    </div>
                                </div>
                            ) : filteredResults?.length === 0 ? (
                                <div className="flex items-center justify-center w-full h-64">
                                    <div className="text-xl text-white">
                                        No attendance records found
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-full h-full mt-8 overflow-x-auto">
                                        <div className="rounded-lg">
                                            <table className="w-full min-w-[1000px] max-w-full text-sm text-left rounded-lg border-[1px] border-[#444466]">
                                                <thead className="text-white h-[48px] bg-[#1E1E2F]">
                                                    <tr>
                                                        <th className="px-4 pl-[30px] py-2">Date</th>
                                                        <th className="px-4 py-2">Service</th>
                                                        <th className="px-4 py-2">Status</th>
                                                        <th className="px-4 py-2">Mode</th>
                                                        <th className="px-4 py-2">Service Time</th>
                                                        <th className="px-4 py-2">Checked in Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredResults?.map((user, i) => (
                                                        <tr key={i} className="text-white">
                                                            <td className="px-4 text-sm py-7 pl-[30px]">
                                                                {formatDisplayDate(
                                                                    user.attendance_date || user.created_at
                                                                ) || 'NA'}
                                                            </td>
                                                            <td className="px-4 text-sm py-7">
                                                                {user.service_name}
                                                            </td>
                                                            <td className="px-4 text-sm py-7">
                                                                <span
                                                                    className={`${user.status === 'Absent'
                                                                        ? 'text-red-500'
                                                                        : 'text-green-500'
                                                                        } font-medium capitalize`}
                                                                >
                                                                    {user.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 text-sm capitalize py-7">
                                                                {user.mode || 'NA'}
                                                            </td>
                                                            <td className="px-4 text-sm py-7">
                                                                {dayjs(
                                                                    user.service_start_time,
                                                                    'HH:mm:ss'
                                                                ).format('hh:mm a') || 'NA'}
                                                            </td>

                                                            <td className="px-4 w-[250px] text-sm py-7">
                                                                {user.created_at
                                                                    ? dayjs(user.created_at).format('hh:mm a')
                                                                    : '--'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* <div className="flex flex-col items-center justify-between w-full gap-2 mt-4 z-60 md:flex-row">
                  <div className="flex items-center gap-2 mb-2 md:mb-0">
                    <span className="text-sm text-white">Show</span>
                    <select
                      className="bg-[#23233a] text-white border border-[#444466] rounded px-2 py-1 cursor-pointer hover:bg-[#2E2E44] transition-colors"
                      value={state.itemsPerPage}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          itemsPerPage: Number(e.target.value),
                          currentPage: 1,
                        }))
                      }
                    >
                      {[4, 10].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <span className="flex text-sm text-white">
                      from {filteredResults?.length}
                    </span>
                  </div>
                </div> */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
