import React, { useState, useEffect, useCallback, useMemo } from "react";
import { monthNames, years } from "@/utils/constant";


const MonthYearSelector = ({ onChange }) => {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState('');

    const months = useMemo(
        () => monthNames.map((name, index) => ({
            name,
            value: index + 1,
        })),
        []
    );

    const handleSelectionChange = useCallback(() => {
        if (selectedYear && selectedMonth) {
            onChange?.({ year: Number(selectedYear), month: Number(selectedMonth) });
        }
    }, [selectedYear, selectedMonth, onChange]);

    useEffect(() => {
        handleSelectionChange();
    }, [handleSelectionChange]);

    const handleYearChange = useCallback((e) => {
        setSelectedYear(Number(e.target.value) || "");
    }, []);

    const handleMonthChange = useCallback((e) => {
        setSelectedMonth(Number(e.target.value) || "");
    }, []);

    const selectClassName = "block w-full p-1.5 text-gray-700 dark:text-gray-400 border dark:border-gray-400 border-gray-300 rounded-md shadow text-xs sm:text-sm font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

    const labelClassName = "block text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-400 mb-1";

    return (
        <div className="flex gap-x-3 p-2">
            <div className="w-32">
                <label htmlFor="year-select" className={labelClassName}>
                    Select Year:
                </label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className={selectClassName}
                    aria-label="Select year"
                >
                    <option value="">-- Select --</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-36">
                <label htmlFor="month-select" className={labelClassName}>
                    Select Month:
                </label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className={selectClassName}
                    aria-label="Select month"
                >
                    <option value="">-- Select --</option>
                    {months.map(({ name, value }) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MonthYearSelector;