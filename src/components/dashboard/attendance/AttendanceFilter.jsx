import Animated from "@/components/common/Animated";
import SingleSelectForm from "@/components/form/useForm/SingleSelectForm";
import Button from "@/components/ui/Button";
import { InfoIcon } from "@/icons";
import { filterAttendanceSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

const INITIAL_FILTERS = {
    service_id: null,
    attendance_date: [],
    status: null,
    mode: null
};

const STATUS_OPTIONS = [
    { value: 'present', text: 'Present' },
    { value: 'absent', text: 'Absent' }
];

const MODE_OPTIONS = [
    { value: 'online', text: 'Online' },
    { value: 'onsite', text: 'Onsite' }
];

const AttendanceFilter = ({
    services = [],
    initialFilters = INITIAL_FILTERS,
    onApply,
    onReset,
    loading = false
}) => {
    const serviceOptions = useMemo(() =>
        services.map(service => ({
            value: service.id,
            text: service.name
        })),
        [services]
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(filterAttendanceSchema),
        defaultValues: initialFilters
    });

    // Watch all form values for active filter count
    const formValues = watch();

    const activeFilterCount = useMemo(() => {
        return [
            formValues.service_id !== null && formValues.service_id !== '',
            formValues.attendance_date?.length > 0,
            formValues.status,
            formValues.mode
        ].filter(Boolean).length;
    }, [formValues]);

    const hasActiveFilters = activeFilterCount > 0;

    // Handle date changes - store as array of date strings
    const handleDateChange = useCallback((dates, onChange) => {
        const formatted = dates?.length
            ? dates.map(date => date.format("YYYY/MM/DD"))
            : [];
        onChange(formatted);
    }, []);

    const handleApply = handleSubmit((data) => {
        // Convert service_id to number if it exists
        const processedData = {
            ...data,
            service_id: data.service_id ? Number(data.service_id) : null
        };
        onApply?.(processedData);
    });

    const handleReset = useCallback(() => {
        reset(INITIAL_FILTERS);
        onReset?.(INITIAL_FILTERS);
    }, [reset, onReset]);

    const filterSummary = useMemo(() => {
        const parts = [];
        if (formValues.service_id !== null && formValues.service_id !== '') {
            const selectedService = services.find(s => s.id === Number(formValues.service_id));
            parts.push(selectedService?.name || '1 service');
        }
        if (formValues.attendance_date?.length > 0) {
            parts.push(`${formValues.attendance_date.length} date(s)`);
        }
        if (formValues.status) {
            parts.push(`Status: ${formValues.status}`);
        }
        if (formValues.mode) {
            parts.push(`Mode: ${formValues.mode}`);
        }
        return parts.join(' • ');
    }, [formValues, services]);

    return (
        <Animated
            animation="fade-up"
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow w-full"
        >
            <form onSubmit={handleApply} className="p-5">
                <div className="grid gap-x-3 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Date Picker */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Service Date
                        </label>
                        <Controller
                            name="attendance_date"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    format="YYYY/MM/DD"
                                    containerStyle={{
                                        width: '100%'
                                    }}
                                    multiple
                                    value={value || []}
                                    onChange={(dates) => handleDateChange(dates, onChange)}
                                    placeholder="Select date(s)"
                                    disabled={loading}
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.attendance_date && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                {errors.attendance_date.message}
                            </p>
                        )}
                    </div>

                    {/* Service Select */}
                    <SingleSelectForm
                        label="Select Service"
                        name="service_id"
                        options={serviceOptions}
                        register={register}
                        setValue={setValue}
                        placeholder="Select a service..."
                        searchable
                        disabled={loading}
                        error={errors.service_id?.message}
                    />

                    {/* Status Select */}
                    <SingleSelectForm
                        label="Attendance Status"
                        name="status"
                        options={STATUS_OPTIONS}
                        register={register}
                        setValue={setValue}
                        placeholder="Select status..."
                        disabled={loading}
                        error={errors.status?.message}
                    />

                    {/* Mode Select */}
                    <SingleSelectForm
                        label="Attendance Mode"
                        name="mode"
                        options={MODE_OPTIONS}
                        register={register}
                        setValue={setValue}
                        placeholder="Select mode..."
                        disabled={loading}
                        error={errors.mode?.message}
                    />
                </div>

                {/* Filter Summary */}
                {hasActiveFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <InfoIcon className="w-4 h-4" />
                                <span>{filterSummary}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                    {activeFilterCount} active
                                </span>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                    aria-label="Clear all filters"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        disabled={loading || !hasActiveFilters}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        type="button"
                        variant="outline-light"
                        onClick={handleReset}
                        disabled={loading || !hasActiveFilters}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </Animated>
    );
};

export default AttendanceFilter;