import Animated from "@/components/common/Animated";
import Switch from "@/components/form/Switch";
import SingleSelectForm from "@/components/form/useForm/SingleSelectForm";
import Button from "@/components/ui/Button";
import { InfoIcon } from "@/icons";
import { filterMembersSchema } from "@/schema";
import { communityArray, MONTH_OPTIONS } from "@/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

const INITIAL_FILTERS = {
    date_of_birth: [],
    birth_month: null,
    community: null
};

const MembersFilterPanel = ({
    initialFilters = INITIAL_FILTERS,
    onApply,
    onReset,
    loading = false
}) => {
    const [filterByMonth, setFilterByMonth] = useState(false);

    const communityOptions = useMemo(() => {
        if (!communityArray) return [];
        return communityArray?.map(community => ({
            value: community,
            text: community
        }));
    }, [communityArray]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(filterMembersSchema),
        defaultValues: initialFilters
    });

    // Watch all form values for active filter count
    const formValues = watch();

    const activeFilterCount = useMemo(() => {
        return [
            !filterByMonth && formValues.date_of_birth?.length > 0,
            filterByMonth && formValues.birth_month !== null && formValues.birth_month !== '',
            formValues.community !== null && formValues.community !== ''
        ].filter(Boolean).length;
    }, [formValues, filterByMonth]);

    const hasActiveFilters = activeFilterCount > 0;

    // Handle date changes - store as array of date strings
    const handleDateChange = useCallback((dates, onChange) => {
        const formatted = dates?.length
            ? dates.map(date => date.format("YYYY-MM-DD"))
            : [];
        onChange(formatted);
    }, []);

    // Handle filter mode change
    const handleFilterModeToggle = useCallback((isMonthMode) => {
        setFilterByMonth(isMonthMode);
        // Clear the other filter when switching modes
        if (isMonthMode) {
            setValue('date_of_birth', []);
        } else {
            setValue('birth_month', null);
        }
    }, [setValue]);

    const handleApply = handleSubmit((data) => {
        const processedData = {
            community: data.community,
            ...(!filterByMonth
                ? { date_of_birth: data.date_of_birth }
                : { birth_month: data.birth_month }
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

        if (!filterByMonth && formValues.date_of_birth?.length > 0) {
            parts.push(`${formValues.date_of_birth.length} specific date${formValues.date_of_birth.length > 1 ? 's' : ''}`);
        }

        if (filterByMonth && formValues.birth_month) {
            const monthName = MONTH_OPTIONS.find(m => m.value === formValues.birth_month)?.text;
            parts.push(`Birth month: ${monthName}`);
        }

        if (formValues.community) {
            parts.push(`${formValues.community}`);
        }

        return parts.join(' • ');
    }, [formValues, filterByMonth]);

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
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filter Members
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Search and filter members by birth date or community
                            </p>
                        </div>

                        {/* Active Filter Badge */}
                        {hasActiveFilters && (
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></span>
                                    {activeFilterCount} Active
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Filter Content */}
                <div className="p-6 space-y-6">
                    {/* Filter Mode Toggle with Switch */}
                    <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Filter Type
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {filterByMonth ? 'Filtering by birth month' : 'Filtering by specific dates'}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-medium transition-colors ${!filterByMonth ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                    Dates
                                </span>
                                <Switch
                                    checked={filterByMonth}
                                    onChange={handleFilterModeToggle}
                                    disabled={loading}
                                    color="blue"
                                />
                                <span className={`text-sm font-medium transition-colors ${filterByMonth ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                    Month
                                </span>
                            </div>
                        </div>

                        {/* Mode Description */}
                        <div className="mb-2 flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-900/40 p-3.5 rounded-lg border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm">
                            <InfoIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                            <p className="leading-relaxed">
                                {filterByMonth
                                    ? 'Filter members by their birth month. Perfect for planning monthly birthday celebrations, sending group wishes, or organizing birth month events and gatherings.'
                                    : 'Filter members by selecting one or more specific birth dates. Ideal for precise birthday lookups, daily birthday notifications, or planning date-specific celebrations.'
                                }
                            </p>
                        </div>


                        {!filterByMonth && (
                            <div className="space-y-2">
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Select Birth Date(s)
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 font-normal">
                                        (Multiple selection available)
                                    </span>
                                </label>
                                <Controller
                                    name="date_of_birth"
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
                                            multiple
                                            value={value || []}
                                            onChange={(dates) => handleDateChange(dates, onChange)}
                                            placeholder="Click to select birth dates..."
                                            disabled={loading}
                                            className="w-full"
                                        />
                                    )}
                                />
                                {errors.date_of_birth && (
                                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.date_of_birth.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {filterByMonth && (
                            <SingleSelectForm
                                label="Select Birth Month"
                                name="birth_month"
                                options={MONTH_OPTIONS}
                                register={register}
                                expandParent
                                setValue={setValue}
                                placeholder="Choose a month..."
                                searchable
                                disabled={loading}
                                error={errors.birth_month?.message}
                            />
                        )}
                    </div>

                    {/* Filter Fields */}
                    <div className="grid gap-5 grid-cols-1">
                        <SingleSelectForm
                            label="Community"
                            name="community"
                            options={communityOptions}
                            register={register}
                            expandParent
                            setValue={setValue}
                            placeholder="Select community..."
                            searchable
                            disabled={loading}
                            error={errors.community?.message}
                        />
                    </div>

                    {/* Filter Summary */}
                    {hasActiveFilters && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 dark:shadow-blue-500/30">
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

export default MembersFilterPanel;