import { useState } from 'react'
import { useMonthlyAttendanceStats } from '../../../queries/attendance.query'
import { AgCharts } from 'ag-charts-react'
import { BarChartSkeleton } from '../../skeleton'
import { years } from '../../../utils/constant'
import { CalendarIcon2, ChevronDownIcon } from '@/icons'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import { generateChartSeries } from '@/utils/helper'

const AdminAttendanceMonthlyStats = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const { data = [], isLoading, isError, error } = useMonthlyAttendanceStats(year)

    const options = {
        title: {
            text: `Average attendance per month`,
        },
        data: data,
        series: generateChartSeries(data),
    };
    const commonChartProps = {
        enableCharts: true,
        enableRangeSelection: true,
        animateRows: true
    };
    const [isOpen, setIsOpen] = useState(false);
    const closeDropdown = () => setIsOpen(false);
    const openDropdown = () => setIsOpen(true);


    return (
        <>
            <div className="relative inline-block mb-4 max-w-xs">
                <button
                    role="button" onClick={openDropdown}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg  bg-white dark:bg-gray-800  text-gray-500 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
                >
                    <CalendarIcon2 />
                    <span className="font-medium"><b>Year:</b> {year}</span>
                    <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-300 text-gray-500 dark:text-gray-400 ${isOpen ? 'rotate-180' : 'rotate-0'} `} />
                </button>
                <Dropdown
                    onClose={closeDropdown}
                    isOpen={isOpen}
                    className="p-2 w-[165px]"
                >
                    <div className="p-3 space-y-3">
                        <div className="w-full">
                            <label
                                htmlFor="month-select"
                                className="block text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-400 mb-1"
                            >
                                Select Year:
                            </label>
                            <select
                                id="month-year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="block w-full p-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-400 border dark:border-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                aria-label="Select month for pie chart"
                            >
                                {years?.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )) || []}
                            </select>
                        </div>
                    </div>
                </Dropdown>
            </div>
            {isLoading ? <BarChartSkeleton /> : <AgCharts  {...commonChartProps} options={options} style={{ height: "500px" }} />}
        </>
    )
}

export default AdminAttendanceMonthlyStats