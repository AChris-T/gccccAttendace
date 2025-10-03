import { useState } from 'react'
import { useMonthlyAttendanceStats } from '../../../queries/attendance.query'
import { AgCharts } from 'ag-charts-react'
import { BarChartSkeleton } from '../../skeleton'
import { years } from '../../../utils/constant'
const VALUE = {
    avg: 'Average',
    total: 'Total'
}
const AdminAttendanceMonthlyStats = () => {
    const [year, setYear] = useState(2025)
    const [mode, setMode] = useState('avg')
    const { data, isLoading, isError, error } = useMonthlyAttendanceStats(year, mode)
    const { dataset = [], series = [] } = data || {};


    const options = {
        title: {
            text: `${VALUE[mode]} attendance per month`,
        },
        // subtitle: {
        //     text: "In Billion U.S. Dollars",
        // },
        data: dataset,
        series,
    };

    const getButtonClass = (option) =>
        mode === option
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400";

    return (
        <>
            <div className="mb-10 flex gap-x-3">
                <div className="w-32">
                    <label
                        htmlFor="month-select"
                        className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-2"
                    >
                        Select Year:
                    </label>
                    <select
                        id="month-year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="block w-full px-1 py-2 text-gray-700 dark:text-white/90 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        aria-label="Select month for pie chart"
                    >
                        {years?.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        )) || []}
                    </select>
                </div>
                <div className='w-40 '>
                    <label
                        htmlFor="month-select"
                        className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-2"
                    >
                        Mode:
                    </label>
                    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
                        <button
                            onClick={() => setMode("avg")}
                            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
                                "avg"
                            )}`}
                        >
                            Average
                        </button>

                        <button
                            onClick={() => setMode("total")}
                            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
                                "total"
                            )}`}
                        >
                            Total
                        </button>
                    </div>
                </div>
            </div>
            {isLoading ? <BarChartSkeleton /> : <AgCharts options={options} style={{ height: "500px" }} />}
        </>
    )
}

export default AdminAttendanceMonthlyStats