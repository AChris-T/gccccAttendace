import { useState, useMemo, useCallback } from "react";
import { DashboardSkeletonLoader } from "../../skeleton";
import { AgCharts } from "ag-charts-react";
import { generateChartSeries } from "../../../utils/helper";
import { years } from "../../../utils/constant";
import { useFirstTimersAnalytics } from "../../../queries/firstTimer.query";

const FirstTimersCharts = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleDateString('en-Ng', { month: 'long' }));
    const [selectedYear, setSelectedYear] = useState(2025);
    const { data, isLoading } = useFirstTimersAnalytics({ year: selectedYear })
    const { totalFirstTimers = [], statusesPerMonth = [], integratedFirstTimers = [] } = data || {}

    const getStatusDataForMonth = useCallback((selectedMonth, statusesPerMonthData) => {
        if (!statusesPerMonthData?.length) return [];

        const monthData = statusesPerMonthData.find(data => data.month === selectedMonth);
        if (!monthData) return [];

        const { month, ...statuses } = monthData;
        return Object.entries(statuses)
            .map(([status, count]) => ({ status, count }))
            .filter(item => item.count > 0);
    }, []);

    const chartOptions = useMemo(() => {
        const statusPerMonthOptions = {
            title: {
                text: `First timers' status in a year`,
            },
            data: statusesPerMonth,
            series: generateChartSeries(statusesPerMonth)
        };

        const totalFirstTimerOptions = {
            title: {
                text: `Total First Timers`,
            },
            data: totalFirstTimers,
            series: [
                {
                    type: "bar",
                    xKey: "month",
                    yKey: "count",
                    stroke: "#465fff",
                    fill: "#465fff"
                },
            ]
        };

        const integratedFirstTimerOptions = {
            title: {
                text: `Integrated First Timers`,
            },
            data: integratedFirstTimers,
            series: [
                {
                    type: "bar",
                    xKey: "month",
                    yKey: "count",
                    stroke: "#039855",
                    fill: "#039855"
                },
            ],
        };

        const statusPerMonthOptionsPie = {
            title: {
                text: `First timers' status in a month.`,
            },
            data: getStatusDataForMonth(selectedMonth, statusesPerMonth),
            series: [
                {
                    type: "pie",
                    angleKey: "count",
                    calloutLabelKey: "status",
                    sectorLabelKey: "count",
                    sectorLabel: {
                        color: "white",
                        fontWeight: "bold",
                        formatter: ({ value }) => `${value}`,
                    },
                },
            ],
        };

        return {
            statusPerMonthOptions,
            totalFirstTimerOptions,
            integratedFirstTimerOptions,
            statusPerMonthOptionsPie
        };
    }, [statusesPerMonth, totalFirstTimers, integratedFirstTimers, selectedMonth, getStatusDataForMonth]);

    const handleMonthChange = useCallback((event) => {
        setSelectedMonth(event.target.value);
    }, []);

    const commonChartProps = {
        enableCharts: true,
        enableRangeSelection: true,
        animateRows: true
    };

    if (isLoading) return <DashboardSkeletonLoader />

    const MonthlyChartsSection = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <ChartContainer title="Total First Timers">
                <AgCharts
                    options={chartOptions.totalFirstTimerOptions}
                    {...commonChartProps} style={{ height: "500px" }}
                />
            </ChartContainer>
            <ChartContainer title="Total Integrated First Timers">
                <AgCharts style={{ height: "500px" }}
                    options={chartOptions.integratedFirstTimerOptions}
                    {...commonChartProps}
                />
            </ChartContainer>
        </div>
    );

    const StatusReportSection = () => (
        <>
            <MonthSelector />
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <ChartContainer title="First Timers' Status /  Month">
                    <AgCharts
                        style={{ height: "500px" }}
                        options={chartOptions.statusPerMonthOptionsPie}
                    />
                </ChartContainer>
                <ChartContainer title="First Timers' Status / Year">
                    <AgCharts
                        style={{ height: "500px" }}
                        options={chartOptions.statusPerMonthOptions}
                        {...commonChartProps}
                    />
                </ChartContainer>
            </div>
        </>
    );

    const ChartContainer = ({ title, children }) => (
        <div className="mb-7">
            <p className={`text-gray-700 mb-2 dark:text-gray-400 text-lg font-semibold`}>{title}</p>
            {children}
        </div>
    );

    const MonthSelector = () => (
        <div className="mb-4 flex gap-x-3">
            <div className="w-32">
                <label
                    htmlFor="month-select"
                    className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-2"
                >
                    Select Year:
                </label>
                <select
                    id="month-year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
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
            <div className="w-36">
                <label
                    htmlFor="month-select"
                    className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-2"
                >
                    Select Month:
                </label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="block w-full px-1 py-2 border text-gray-700 dark:text-white/90 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    aria-label="Select month for pie chart"
                >
                    {statusesPerMonth?.map(({ month }) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    )) || []}
                </select>
            </div>
        </div>
    );

    return (
        <>
            <StatusReportSection />
            <MonthlyChartsSection />
        </>
    );
};

export default FirstTimersCharts;