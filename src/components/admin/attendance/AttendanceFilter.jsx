import Animated from "@/components/common/Animated";
import SingleSelect from "@/components/form/SingleSelect";
import Button from "@/components/ui/Button";
import { useCallback, useMemo, useState } from "react";
import DatePicker from "react-multi-date-picker";

const INITIAL_FILTERS = {
    service_id: '',
    attendance_date: [],
    status: '',
    mode: ''
};

const STATUS_OPTIONS = [
    { value: 'present', text: 'Present' },
    { value: 'absent', text: 'Absent' }
];

const MODE_OPTIONS = [
    { value: 'online', text: 'Online' },
    { value: 'onsite', text: 'Onsite' }
];

const InfoIcon = () => (
    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const AttendanceFilter = ({
    services = [],
    initialFilters = INITIAL_FILTERS,
    onApply,
    onReset,
    loading = false
}) => {
    const [filters, setFilters] = useState(initialFilters);

    const serviceOptions = useMemo(() =>
        services.map(service => ({
            value: service.id,
            text: service.name
        })),
        [services]
    );

    const activeFilterCount = useMemo(() => {
        return [
            filters.service_id,
            filters.attendance_date?.length > 0,
            filters.status,
            filters.mode
        ].filter(Boolean).length;
    }, [filters]);

    const hasActiveFilters = activeFilterCount > 0;

    const updateFilter = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    // Date filter handler
    const handleDateChange = useCallback((dates) => {
        const formatted = dates?.length
            ? dates.map(date => date.format("YYYY/MM/DD"))
            : [];
        updateFilter('attendance_date', formatted);
    }, [updateFilter]);

    const handleApply = useCallback(() => {
        onApply?.(filters);
    }, [filters, onApply]);

    const handleReset = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        onReset?.(INITIAL_FILTERS);
    }, [onReset]);

    const filterSummary = useMemo(() => {
        const parts = [];
        if (filters.service_id) parts.push('1 service');
        if (filters.attendance_date?.length > 0) parts.push(`${filters.attendance_date.length} date(s)`);
        if (filters.status) parts.push(`Status: ${filters.status}`);
        if (filters.mode) parts.push(`Mode: ${filters.mode}`);
        return parts.join(' • ');
    }, [filters]);

    return (
        <Animated
            animation="fade-up"
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow animate-fadeIn w-full md:w-1/2 lg:w-1/2 xl:w-3/4 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Filter Attendance
                    </h3>
                    {hasActiveFilters && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            {activeFilterCount} active
                        </span>
                    )}
                </div>

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        aria-label="Clear all filters"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Filter Fields */}
            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {/* Date Picker */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Service Date
                        </label>
                        <DatePicker
                            format="YYYY/MM/DD"
                            multiple
                            onChange={handleDateChange}
                            placeholder="Select date(s)"
                            disabled={loading}
                        />
                    </div>

                    {/* Service Select */}
                    <SingleSelect
                        label="Select Service"
                        name="service"
                        options={serviceOptions}
                        defaultValue={filters.service_id}
                        onChange={(value) => updateFilter('service_id', value)}
                        placeholder="Select a service..."
                        searchable
                        disabled={loading}
                    />

                    {/* Status Select */}
                    <SingleSelect
                        label="Attendance Status"
                        name="status"
                        options={STATUS_OPTIONS}
                        defaultValue={filters.status}
                        onChange={(value) => updateFilter('status', value)}
                        placeholder="Select status..."
                        disabled={loading}
                    />

                    {/* Mode Select */}
                    <SingleSelect
                        label="Attendance Mode"
                        name="mode"
                        options={MODE_OPTIONS}
                        defaultValue={filters.mode}
                        onChange={(value) => updateFilter('mode', value)}
                        placeholder="Select mode..."
                        disabled={loading}
                    />
                </div>

                {/* Filter Summary */}
                {hasActiveFilters && (
                    <div className="flex items-center text-xs text-green-600 dark:text-gray-400 mt-4">
                        <InfoIcon />
                        <span>{filterSummary}</span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-2 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        variant="success"
                        className="rounded px-6"
                        onClick={handleApply}
                        disabled={loading || !hasActiveFilters}
                    >
                        {loading ? 'Applying...' : 'Apply Filters'}
                    </Button>
                    <Button
                        variant="danger"
                        className="rounded px-6"
                        onClick={handleReset}
                        disabled={loading || !hasActiveFilters}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </Animated>
    );
};

export default AttendanceFilter;