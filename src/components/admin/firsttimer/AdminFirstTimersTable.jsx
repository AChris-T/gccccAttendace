import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Link } from "react-router-dom";
import { useFirstTimers } from '@/queries/firstTimer.query';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Message from '@/components/common/Message';
import { TableSkeletonLoader } from '@/components/skeleton';
import { ExpandFullScreenIcon, FilterIcon } from '@/icons';
import ButtonSwitch from '@/components/ui/ButtonSwitch';
import FirstTimerFilterPanel from '@/components/admin/firsttimer/FirstTimerFilterPanel';

ModuleRegistry.registerModules([AllCommunityModule]);

// Constants
const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 200;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 1000;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const DEFAULT_FILTERS = {
    week_ending: [],
    date_of_visit: [],
    assigned_to_member: null,
    follow_up_status: null,
};

const AdminFirstTimersTable = () => {
    const gridRef = useRef(null);
    const [isGridReady, setIsGridReady] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);
    const { data: firstTimers, isLoading, refetch, isError, error, isFetching } = useFirstTimers(activeFilters);

    // Memoized first timers data with safe array conversion
    const firstTimersData = useMemo(() => {
        if (!firstTimers) return [];
        return Array.isArray(firstTimers) ? firstTimers : [];
    }, [firstTimers]);

    // Calculate dynamic table height based on content
    const tableHeight = useMemo(() => {
        if (firstTimersData.length === 0) return MIN_TABLE_HEIGHT;

        const contentHeight = (firstTimersData.length * ROW_HEIGHT) + HEADER_HEIGHT + PAGINATION_HEIGHT;
        return Math.min(Math.max(contentHeight, MIN_TABLE_HEIGHT), MAX_TABLE_HEIGHT);
    }, [firstTimersData.length]);

    // Default column definition with auto-sizing
    const defaultColDef = useMemo(() => ({
        filter: true,
        sortable: true,
        resizable: true,
        suppressPaste: false,
        floatingFilter: true,
        editable: false,
        minWidth: 100,
        autoHeaderHeight: true,
        wrapHeaderText: true,
    }), []);

    // Badge cell renderer component
    const BadgeRenderer = useCallback(({ value }) => {
        if (!value || typeof value !== 'object') return null;
        return <Badge color={value?.color}>{value?.title}</Badge>;
    }, []);

    // Link cell renderer component for ID
    const LinkRenderer = useCallback(({ value }) => {
        if (!value) return null;
        return (
            <Link
                target="_blank"
                to={`/dashboard/first-timers/${value}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                rel="noopener noreferrer"
            >
                {value}
            </Link>
        );
    }, []);

    // Member name link renderer component
    const MemberNameRenderer = useCallback(({ value }) => {
        if (!value || typeof value !== 'object') return null;
        return (
            <Link
                target="_blank"
                to={`/dashboard/members/${value?.id}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                rel="noopener noreferrer"
            >
                {value?.full_name || 'N/A'}
            </Link>
        );
    }, []);

    // Date formatter
    const dateValueFormatter = useCallback((params) => {
        if (!params.value) return '';
        const date = new Date(params.value);
        if (isNaN(date.getTime())) return params.value;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }, []);

    // Column definitions with pinned ID column
    const columnDefs = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            cellRenderer: LinkRenderer,
            pinned: 'left',
            cellClass: 'font-medium',
            editable: false,
            suppressAutoSize: false,
        },
        {
            pinned: 'left',
            field: "full_name",
            headerName: "Name",
            cellClass: 'font-medium',
        },
        {
            field: "email",
            headerName: "Email",
            cellClass: 'text-blue-600 dark:text-blue-400',
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
        },
        {
            field: "date_of_visit",
            headerName: "Date of Visit",
            valueFormatter: dateValueFormatter,
        },
        {
            field: "invited_by",
            headerName: "Invited By",
        },
        {
            field: "assigned_to_member",
            headerName: "Assigned To",
            cellRenderer: MemberNameRenderer,
            editable: false,
        },
        {
            field: "follow_up_status",
            headerName: "Follow-up Status",
            cellRenderer: BadgeRenderer,
            filter: false,
            editable: false,
        },
        {
            field: "gender",
            headerName: "Gender",
        },
        {
            field: "notes",
            headerName: "Notes",
            cellClass: 'text-wrap',
            autoHeight: true,
        },
        {
            field: "week_ending",
            headerName: "Week Ending",
            valueFormatter: dateValueFormatter,
        },
    ], [LinkRenderer, MemberNameRenderer, BadgeRenderer, dateValueFormatter]);

    // Grid options configuration
    const gridOptions = useMemo(() => ({
        pagination: true,
        paginationPageSize: DEFAULT_PAGE_SIZE,
        paginationPageSizeSelector: PAGINATION_PAGE_SIZES,
        suppressDragLeaveHidesColumns: true,
        animateRows: true,
        suppressCellFocus: false,
        suppressColumnVirtualisation: false,
        suppressRowVirtualisation: false,
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
        rowSelection: 'multiple',
        suppressRowDeselection: false,
        rowMultiSelectWithClick: true,
        enableFillHandle: true,
        enableCellTextSelection: true,
        ensureDomOrder: true,
        stopEditingWhenCellsLoseFocus: true,
        getRowId: (params) => params.data.id,
    }), []);

    // Auto-size columns based on content
    const autoSizeColumns = useCallback(() => {
        if (!gridRef.current) return;

        // Get all column IDs - use getColumns() or getAllDisplayedColumns()
        const allColumns = gridRef.current.getColumns?.() || gridRef.current.getAllDisplayedColumns?.();
        if (!allColumns || allColumns.length === 0) return;

        const allColumnIds = allColumns.map(col => col.getColId());
        gridRef.current.autoSizeColumns(allColumnIds, false);
    }, []);

    // Grid ready callback
    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
        setIsGridReady(true);

        // Auto-size columns after grid is ready
        setTimeout(() => {
            autoSizeColumns();
        }, 100);
    }, [autoSizeColumns]);

    // Auto-size columns when data changes
    useEffect(() => {
        if (isGridReady && firstTimersData.length > 0) {
            // Auto-size columns after data update
            setTimeout(() => {
                autoSizeColumns();
            }, 150);
        }
    }, [firstTimersData, isGridReady, autoSizeColumns]);

    // CSV export handler
    const handleExportCSV = useCallback(() => {
        if (!gridRef.current) return;

        const timestamp = new Date().toISOString().split('T')[0];
        gridRef.current.exportDataAsCsv({
            fileName: `first-timers-report-${timestamp}.csv`,
        });
    }, []);

    // Refresh handler
    const handleRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    const handleApplyFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, []);

    const handleResetFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, []);

    const handleToggleFilter = useCallback(() => {
        if (showFilter) {
            setActiveFilters(DEFAULT_FILTERS);
        }
        setShowFilter(!showFilter);
    }, [showFilter]);

    const hasActiveFilters = useMemo(() =>
        activeFilters.birth_month ||
        activeFilters.date_of_birth?.length > 0 ||
        activeFilters.community
        , [activeFilters]);

    if (isError) {
        return (
            <Message
                className={'max-w-md'}
                variant='error'
                data={error?.data}
                actionButton={
                    <Button
                        variant='outline-danger'
                        onClick={handleRefresh}
                        className='mt-2'
                        loading={isFetching}
                    >
                        Retry
                    </Button>
                }
            />
        );
    }

    return (
        <div className="w-full space-y-10">
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <ButtonSwitch
                    onChange={handleToggleFilter}
                    checked={showFilter}
                    color="pink"
                    type='button'
                    icon={<FilterIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Filter first timer's data"
                >
                    Filter
                </ButtonSwitch>
            </div>

            {showFilter &&
                <div className='max-w-xl p-4 dark:bg-gray-800 bg-white shadow rounded-lg'>
                    <FirstTimerFilterPanel
                        initialFilters={activeFilters}
                        onApply={handleApplyFilters}
                        onReset={handleResetFilters}
                        loading={isFetching}
                    />
                </div>
            }

            <div className="space-y-3">
                {/* Header Section */}
                <div className="flex items-center gap-5 flex-wrap">
                    <p className="text-sm text-green-600 dark:text-green-400">
                        <span className="font-semibold text-green-500 dark:text-green-500">
                            {firstTimersData.length}
                        </span>
                        {' '}Record{firstTimersData.length !== 1 ? 's' : ''} found
                    </p>

                    {hasActiveFilters && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                            Filtered
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-between w-full">
                    <div className='flex flex-wrap gap-3'>
                        <Button
                            variant='primary'
                            onClick={handleExportCSV}
                            disabled={!firstTimersData.length || isLoading}
                        >
                            Export CSV
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={handleRefresh}
                            loading={isFetching}
                            disabled={isLoading}
                        >
                            Refresh
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant='light'
                            onClick={autoSizeColumns}
                            disabled={!firstTimersData.length || isLoading}
                        >
                            <ExpandFullScreenIcon className='h-4 w-4 md:h-5 md:w-5' />
                        </Button>
                    </div>
                </div>

                {isLoading && !firstTimersData.length ?
                    <TableSkeletonLoader /> :
                    <>
                        {/* AG Grid Table with Dark Mode Support */}
                        <div
                            className={`ag-theme-alpine border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-colors`}
                            style={{ width: "100%", height: `${tableHeight}px` }}
                        >
                            <AgGridReact
                                ref={gridRef}
                                defaultColDef={defaultColDef}
                                columnDefs={columnDefs}
                                rowData={firstTimersData}
                                gridOptions={gridOptions}
                                onGridReady={onGridReady}
                                suppressLoadingOverlay={false}
                                suppressNoRowsOverlay={false}
                                overlayLoadingTemplate={`
                        <div class="flex items-center justify-center h-full">
                            <div class="text-center">
                                <div class="relative inline-block">
                                    <div class="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                                    <div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                                </div>
                                <p class="text-gray-700 mt-4 font-medium">Loading first timers...</p>
                            </div>
                        </div>
                    `}
                                overlayNoRowsTemplate={`
                        <div class="flex items-center justify-center h-full bg-white">
                            <div class="text-center py-8">
                                <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p class="text-gray-500  text-lg font-medium mb-2">
                                    No first timers found
                                </p>
                                <p class="text-gray-400  text-sm">
                                    First timers will appear here once available
                                </p>
                            </div>
                        </div>
                    `}
                            />
                        </div>

                        {/* Footer with Dark Mode Support */}
                        {firstTimersData.length > 0 && (
                            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                                <span>Last updated: {new Date().toLocaleString()}</span>
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></span>
                                        <span className="text-green-600 dark:text-green-400 font-medium">Live data</span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    );
};

export default AdminFirstTimersTable;