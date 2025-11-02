import Animated from "@/components/common/Animated";
import Switch from "@/components/form/Switch";
import SingleSelectForm from "@/components/form/useForm/SingleSelectForm";
import Button from "@/components/ui/Button";
import { InfoIcon } from "@/icons";
import { filterFirstTimersSchema } from "@/schema";
import { MONTH_OPTIONS } from "@/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import { useFollowUpStatuses } from "@/queries/followupstatus.query";
import { useMembers } from "@/queries/member.query";

const INITIAL_FILTERS = {
    week_ending: null,
    date_of_visit: null,
    date_month_of_visit: null,
    assigned_to_member: null,
    follow_up_status: null
};

const FirstTimerFilterPanel = ({
    initialFilters = INITIAL_FILTERS,
    onApply,
    onReset,
    loading = false
}) => {
    const [filterByMonth, setFilterByMonth] = useState(false);

    const { data: followUpStatuses = [], isLoading: isLoadingStatuses } = useFollowUpStatuses();
    const { data: members } = useMembers();

    const memberOptions = useMemo(() => {
        if (!members?.length) return [];
        return members.map(member => ({
            value: member.id,
            text: `${member.first_name} ${member.last_name}`
        }));
    }, [members]);

    const followUpStatusOptions = useMemo(() => {
        if (!followUpStatuses?.length) return [];
        return followUpStatuses.map(status => ({
            value: status.id,
            text: status.title
        }));
    }, [followUpStatuses]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(filterFirstTimersSchema),
        defaultValues: initialFilters
    });

    // Watch all form values for active filter count
    const formValues = watch();

    const activeFilterCount = useMemo(() => {
        return [
            formValues.week_ending !== null && formValues.week_ending !== '',
            !filterByMonth && formValues.date_of_visit !== null && formValues.date_of_visit !== '',
            filterByMonth && formValues.date_month_of_visit !== null && formValues.date_month_of_visit !== '',
            formValues.assigned_to_member !== null && formValues.assigned_to_member !== '',
            formValues.follow_up_status !== null && formValues.follow_up_status !== ''
        ].filter(Boolean).length;
    }, [formValues, filterByMonth]);

    const hasActiveFilters = activeFilterCount > 0;

    // Handle single date changes
    const handleSingleDateChange = useCallback((date, onChange) => {
        const formatted = date ? date.format("YYYY-MM-DD") : null;
        onChange(formatted);
    }, []);

    // Handle filter mode change
    const handleFilterModeToggle = useCallback((isMonthMode) => {
        setFilterByMonth(isMonthMode);
        // Clear the other filter when switching modes
        if (isMonthMode) {
            setValue('date_of_visit', null);
        } else {
            setValue('date_month_of_visit', null);
        }
    }, [setValue]);

    const handleApply = handleSubmit((data) => {
        const processedData = {
            week_ending: data.week_ending,
            assigned_to_member: data.assigned_to_member ? Number(data.assigned_to_member) : null,
            follow_up_status: data.follow_up_status ? Number(data.follow_up_status) : null,
            ...(!filterByMonth
                ? { date_of_visit: data.date_of_visit }
                : { date_month_of_visit: data.date_month_of_visit }
            )
        };
        onApply?.(processedData);
    });

    const handleReset = useCallback(() => {
        reset(INITIAL_FILTERS);
        setFilterByMonth(false);
        onReset?.(INITIAL_FILTERS);
    }, [reset, onReset]);

    const filterSummary = useMemo(() => {
        const parts = [];

        if (formValues.week_ending) {
            parts.push(`Week: ${formValues.week_ending}`);
        }

        if (!filterByMonth && formValues.date_of_visit) {
            parts.push(`Visit: ${formValues.date_of_visit}`);
        }

        if (filterByMonth && formValues.date_month_of_visit) {
            const monthName = MONTH_OPTIONS.find(m => m.value === formValues.date_month_of_visit)?.text;
            parts.push(`Month: ${monthName}`);
        }

        if (formValues.assigned_to_member) {
            const member = members.find(m => m.id === Number(formValues.assigned_to_member));
            parts.push(member ? `${member.first_name} ${member.last_name}` : 'Assigned');
        }

        if (formValues.follow_up_status) {
            const status = followUpStatuses.find(s => s.id === Number(formValues.follow_up_status));
            parts.push(status?.name || 'Status');
        }

        return parts.join(' • ');
    }, [formValues, filterByMonth, members, followUpStatuses]);

    return (
        <Animated
            animation="fade-up"
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm w-full overflow-hidden"
        >
            <form onSubmit={handleApply}>
                {/* Header Section */}
                <div className="px-6 pt-6 pb-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Filter First Timers
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Search and filter first-time visitors by visit date, assignment, and status
                            </p>
                        </div>

                        {/* Active Filter Badge */}
                        {hasActiveFilters && (
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                    <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse"></span>
                                    {activeFilterCount} Active
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Filter Content */}
                <div className="p-6 space-y-6">
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                        {/* Visit Date Filter with Switch */}
                        <div className="p-5 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Visit Date Filter
                                    </h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {filterByMonth ? 'Filtering by visit month' : 'Filtering by specific visit date'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={`text-sm font-medium transition-colors ${!filterByMonth ? 'text-purple-700 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                        Date
                                    </span>
                                    <Switch
                                        checked={filterByMonth}
                                        onChange={handleFilterModeToggle}
                                        disabled={loading}
                                        color="purple"
                                    />
                                    <span className={`text-sm font-medium transition-colors ${filterByMonth ? 'text-purple-700 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                        Month
                                    </span>
                                </div>
                            </div>

                            {/* Mode Description */}
                            <div className="mb-4 flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-900/40 p-3.5 rounded-lg border border-purple-200/50 dark:border-purple-800/30 backdrop-blur-sm">
                                <InfoIcon className="w-4 h-4 mt-0.5 shrink-0 text-purple-600 dark:text-purple-400" />
                                <p className="leading-relaxed">
                                    {filterByMonth
                                        ? 'Filter first-timers by the month they visited. Useful for monthly reports, tracking visitor trends, and planning follow-up campaigns by month.'
                                        : 'Filter first-timers by a specific visit date. Perfect for daily reports, event-specific tracking, or reviewing visitors from a particular service.'
                                    }
                                </p>
                            </div>

                            {!filterByMonth && (
                                <div className="space-y-2">
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Visit Date
                                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 font-normal">
                                            (Select specific date)
                                        </span>
                                    </label>
                                    <Controller
                                        name="date_of_visit"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                containerStyle={{
                                                    width: "100%"
                                                }}
                                                style={{
                                                    width: "100%",
                                                    height: "44px",
                                                    padding: "0 16px",
                                                    fontSize: "14px",
                                                    borderRadius: "8px"
                                                }}
                                                format="YYYY-MM-DD"
                                                value={value || ""}
                                                onChange={(date) => handleSingleDateChange(date, onChange)}
                                                placeholder="Click to select visit date..."
                                                disabled={loading}
                                                className="w-full"
                                            />
                                        )}
                                    />
                                    {errors.date_of_visit && (
                                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.date_of_visit.message}
                                        </p>
                                    )}
                                </div>
                            )}

                            {filterByMonth && (
                                <SingleSelectForm
                                    label="Visit Month"
                                    name="date_month_of_visit"
                                    options={MONTH_OPTIONS}
                                    register={register}
                                    expandParent
                                    setValue={setValue}
                                    placeholder="Choose a month..."
                                    searchable
                                    disabled={loading}
                                    error={errors.date_month_of_visit?.message}
                                />
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Week Ending Date */}
                            <div className="space-y-2">
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Week Ending
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 font-normal">
                                        (Sunday of the week)
                                    </span>
                                </label>
                                <Controller
                                    name="week_ending"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DatePicker
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            style={{
                                                width: "100%",
                                                height: "44px",
                                                padding: "0 16px",
                                                fontSize: "14px",
                                                borderRadius: "8px"
                                            }}
                                            format="YYYY-MM-DD"
                                            value={value || ""}
                                            onChange={(date) => handleSingleDateChange(date, onChange)}
                                            placeholder="Select week ending..."
                                            disabled={loading}
                                            className="w-full"
                                        />
                                    )}
                                />
                                {errors.week_ending && (
                                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.week_ending.message}
                                    </p>
                                )}
                            </div>

                            {/* Assigned To Member */}
                            <SingleSelectForm
                                label="Assigned To"
                                name="assigned_to_member"
                                options={memberOptions}
                                register={register}
                                expandParent
                                setValue={setValue}
                                placeholder="Select member..."
                                searchable
                                disabled={loading}
                                error={errors.assigned_to_member?.message}
                            />

                            {/* Follow-up Status */}
                            <SingleSelectForm
                                label="Follow-up Status"
                                name="follow_up_status"
                                options={followUpStatusOptions}
                                register={register}
                                expandParent
                                setValue={setValue}
                                placeholder="Select status..."
                                searchable
                                disabled={loading || isLoadingStatuses}
                                error={errors.follow_up_status?.message}
                            />
                        </div>
                    </div>

                    {/* Filter Summary */}
                    {hasActiveFilters && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 dark:shadow-purple-500/30">
                                        {activeFilterCount}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            Active Filter{activeFilterCount > 1 ? 's' : ''}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            {filterSummary}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="group text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                    disabled={loading}
                                    aria-label="Clear all filters"
                                >
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear All
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline-light"
                            onClick={handleReset}
                            disabled={loading || !hasActiveFilters}
                            className="w-full sm:w-auto order-2 sm:order-1"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset Filters
                            </span>
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            disabled={loading || !hasActiveFilters}
                            className="w-full sm:w-auto min-w-40 order-1 sm:order-2"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Apply Filters
                            </span>
                        </Button>
                    </div>
                </div>
            </form>
        </Animated>
    );
};

export default FirstTimerFilterPanel;