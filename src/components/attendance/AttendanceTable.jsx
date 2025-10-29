import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Message from '@/components/common/Message';
import { TableSkeletonLoader } from '@/components/skeleton';
import { useUserAttendance } from '@/queries/attendance.query';
import { useServices } from '@/queries/service.query';
import AttendanceFilter from '@/components/dashboard/attendance/AttendanceFilter';
import { ExpandFullScreenIcon, FilterIcon } from '@/icons';
import ButtonSwitch from '@/components/ui/ButtonSwitch';

ModuleRegistry.registerModules([AllCommunityModule]);

const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 200;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 1000;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const AttendanceTable = () => {
    const gridRef = useRef(null);
    const [isGridReady, setIsGridReady] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        service_id: '',
        attendance_date: [],
        status: '',
        mode: ''
    });
    const [showFilter, setShowFilter] = useState(false);


    const {
        data: attendance,
        isLoading,
        refetch,
        isError,
        error,
        isFetching
    } = useUserAttendance(activeFilters);

    const { data: services = [] } = useServices();

    // Memoized attendance data with safe array conversion
    const attendanceData = useMemo(() => {
        if (!attendance) return [];
        return Array.isArray(attendance) ? attendance : [];
    }, [attendance]);

    // Calculate dynamic table height based on content
    const tableHeight = useMemo(() => {
        if (attendanceData.length === 0) return MIN_TABLE_HEIGHT;

        const contentHeight = (attendanceData.length * ROW_HEIGHT) + HEADER_HEIGHT + PAGINATION_HEIGHT;
        return Math.min(Math.max(contentHeight, MIN_TABLE_HEIGHT), MAX_TABLE_HEIGHT);
    }, [attendanceData.length]);

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

    // Status badge renderer component
    const StatusRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400 text-center">--</span>;

        const colorMap = {
            present: 'success',
            absent: 'error',
        };
        const color = colorMap[value.toLowerCase()];

        return <Badge color={color}>{value}</Badge>;
    }, []);

    // Mode badge renderer component
    const ModeRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400 text-center">--</span>;

        const colorMap = {
            onsite: 'primary',
            online: 'warning',
        };
        const color = colorMap[value.toLowerCase()];

        return <Badge color={color}>{value}</Badge>;
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

    // Value formatters
    const nameValueFormatter = useCallback((params) => {
        if (!params.data?.user) return 'N/A';
        const { first_name = '', last_name = '' } = params.data.user;
        return `${first_name} ${last_name}`.trim() || 'N/A';
    }, []);

    const emailValueFormatter = useCallback((params) => {
        return params.data?.user?.email || 'N/A';
    }, []);

    const phoneValueFormatter = useCallback((params) => {
        return params.data?.user?.phone_number || 'N/A';
    }, []);

    const serviceValueFormatter = useCallback((params) => {
        return params.data?.service?.name || 'N/A';
    }, []);

    // Column definitions with pinned ID column
    const columnDefs = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            pinned: 'left',
            cellClass: 'font-medium',
            editable: false,
            suppressAutoSize: false,
        },
        {
            headerName: "Name",
            valueFormatter: nameValueFormatter,
            cellClass: 'font-medium',
        },
        {
            headerName: "Email",
            valueFormatter: emailValueFormatter,
            cellClass: 'text-blue-600 dark:text-blue-400',
        },
        {
            headerName: "Phone",
            valueFormatter: phoneValueFormatter,
        },
        {
            headerName: "Service",
            valueFormatter: serviceValueFormatter,
            cellClass: 'font-medium',
        },
        {
            field: "attendance_date",
            headerName: "Date",
            valueFormatter: dateValueFormatter,
        },
        {
            field: "status",
            headerName: "Status",
            cellRenderer: StatusRenderer,
            editable: false,
        },
        {
            field: "mode",
            headerName: "Mode",
            cellRenderer: ModeRenderer,
            editable: false,
        },
    ], [
        StatusRenderer,
        ModeRenderer,
        dateValueFormatter,
        nameValueFormatter,
        emailValueFormatter,
        phoneValueFormatter,
        serviceValueFormatter
    ]);

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

        setTimeout(() => {
            autoSizeColumns();
        }, 100);
    }, [autoSizeColumns]);

    useEffect(() => {
        if (isGridReady && attendanceData.length > 0) {
            setTimeout(() => {
                autoSizeColumns();
            }, 150);
        }
    }, [attendanceData, isGridReady, autoSizeColumns]);

    // CSV export handler
    const handleExportCSV = useCallback(() => {
        if (!gridRef.current) return;

        const timestamp = new Date().toISOString().split('T')[0];
        gridRef.current.exportDataAsCsv({
            fileName: `attendance-report-${timestamp}.csv`,
        });
    }, []);

    // Refresh handler
    const handleRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    // Filter handlers
    const handleApplyFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, []);

    const handleResetFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, []);

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return Boolean(
            activeFilters.service_id ||
            activeFilters.attendance_date?.length > 0 ||
            activeFilters.status ||
            activeFilters.mode
        );
    }, [activeFilters]);

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
            <div className='grid grid-cols-1 md:grid-cols-3'>
                <ButtonSwitch
                    onChange={() => setShowFilter(!showFilter)}
                    checked={showFilter}
                    color="primary"
                    type='button'
                    icon={<FilterIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Filter attendance record"
                >
                    Filter
                </ButtonSwitch>
            </div>

            {/* Filter Section */}
            {showFilter && <div className='p-4 dark:bg-gray-800 bg-white shadow rounded-lg'>
                <AttendanceFilter
                    services={services}
                    initialFilters={activeFilters}
                    onApply={handleApplyFilters}
                    onReset={handleResetFilters}
                    loading={isFetching}
                />
            </div>
            }

            <div className='space-y-3'>
                {/* Header Section */}
                <div className="flex items-center gap-3">
                    <p className="text-sm text-green-600 dark:text-green-400">
                        <span className="font-semibold text-green-500 dark:text-green-500">
                            {attendanceData.length}
                        </span>
                        {' '}record{attendanceData.length !== 1 ? 's' : ''} found
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
                            disabled={!attendanceData.length || isLoading}
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
                            disabled={!attendanceData.length || isLoading}
                        >
                            <ExpandFullScreenIcon className='h-4 w-4 md:h-5 md:w-5' />
                        </Button>
                    </div>
                </div>

                {isLoading && !attendanceData.length ?
                    <TableSkeletonLoader />
                    :
                    <>
                        <div
                            className={`ag-theme-alpine border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-colors`}
                            style={{ width: "100%", height: `${tableHeight}px` }}
                        >
                            <AgGridReact
                                ref={gridRef}
                                defaultColDef={defaultColDef}
                                columnDefs={columnDefs}
                                rowData={attendanceData}
                                gridOptions={gridOptions}
                                onGridReady={onGridReady}
                                suppressLoadingOverlay={false}
                                suppressNoRowsOverlay={false}
                                overlayLoadingTemplate={`
        <div class="flex items-center justify-center h-full">
            <div class="text-center">
                <div class="relative inline-block">
                    <div class="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                    <div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <p class="text-gray-700 mt-4 font-medium">Loading attendance records...</p>
            </div>
        </div>
    `}
                                overlayNoRowsTemplate={`
        <div class="flex items-center justify-center h-full bg-white">
            <div class="text-center py-8">
                <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-500  text-lg font-medium mb-2">
                    No attendance records found
                </p>
                <p class="text-gray-400 text-sm">
                    ${hasActiveFilters
                                        ? 'Try adjusting your filters or reset them to see all records'
                                        : 'Records will appear here once available'}
                </p>
            </div>
        </div>
    `}
                            />
                        </div>
                        {attendanceData.length > 0 && (
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

export default AttendanceTable;