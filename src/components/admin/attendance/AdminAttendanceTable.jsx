import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAllAttendance } from '@/queries/attendance.query';
import { useServices } from '@/queries/service.query';
import { AttendanceIcon2, FilterIcon } from '@/icons';
import AttendanceMarkAbsent from '@/components/admin/attendance/AttendanceMarkAbsent';
import AttendanceAssignment from '@/components/admin/attendance/AttendanceAssignment';
import AdminAttendanceFilter from '@/components/admin/attendance/AdminAttendanceFilter';
import ButtonSwitch from '@/components/ui/ButtonSwitch';
import { InlineLoader, TableLoadingSkeleton } from '@/components/skeleton';
import Message from '@/components/common/Message';

ModuleRegistry.registerModules([AllCommunityModule]);

// Constants
const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 200;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 800;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const AdminAttendanceTable = () => {
    const gridRef = useRef(null);
    const [isGridReady, setIsGridReady] = useState(false);

    // Filter state
    const [activeFilters, setActiveFilters] = useState({
        service_id: '',
        attendance_date: [],
        status: '',
        mode: ''
    });

    // UI state
    const [showFilter, setShowFilter] = useState(false);
    const [showMark, setShowMark] = useState(false);
    const [showAssign, setShowAssign] = useState(false);

    // Data fetching hooks
    const {
        data: allAttendance = [],
        isError,
        error,
        isLoading,
        refetch,
        isFetching
    } = useAllAttendance(activeFilters);

    const { data: services = [] } = useServices();

    // Memoized attendance data with safe array conversion
    const attendanceData = useMemo(() => {
        if (!allAttendance) return [];
        return Array.isArray(allAttendance) ? allAttendance : [];
    }, [allAttendance]);

    // Calculate dynamic table height based on content
    const tableHeight = useMemo(() => {
        if (attendanceData.length === 0) return MIN_TABLE_HEIGHT;

        const contentHeight = (attendanceData.length * ROW_HEIGHT) + HEADER_HEIGHT + PAGINATION_HEIGHT;
        return Math.min(Math.max(contentHeight, MIN_TABLE_HEIGHT), MAX_TABLE_HEIGHT);
    }, [attendanceData.length]);

    // Default column definitions with auto-sizing
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

    // Cell Renderers
    const StatusRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400 text-center">--</span>;

        const colorMap = {
            present: 'success',
            absent: 'error',
        };
        const color = colorMap[value.toLowerCase()];

        return <Badge color={color}>{value}</Badge>;
    }, []);

    const ModeRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400 text-center">--</span>;

        const colorMap = {
            onsite: 'primary',
            online: 'warning',
        };
        const color = colorMap[value.toLowerCase()];

        return <Badge color={color}>{value}</Badge>;
    }, []);

    // Value Formatters
    const dateFormatter = useCallback((params) => {
        if (!params.value) return '';
        const date = new Date(params.value);
        if (isNaN(date.getTime())) return params.value;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }, []);

    const nameFormatter = useCallback((params) => {
        if (!params.data?.user) return 'N/A';
        const { first_name = '', last_name = '' } = params.data.user;
        return `${first_name} ${last_name}`.trim() || 'N/A';
    }, []);

    const emailFormatter = useCallback((params) => {
        return params.data?.user?.email || 'N/A';
    }, []);

    const phoneFormatter = useCallback((params) => {
        return params.data?.user?.phone_number || 'N/A';
    }, []);

    const serviceFormatter = useCallback((params) => {
        return params.data?.service?.name || 'N/A';
    }, []);

    // Column Definitions with pinned ID column
    const columnDefs = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            pinned: 'left',
            // lockPinned: true,
            cellClass: 'font-medium',
            editable: false,
            suppressAutoSize: false,
        },
        {
            headerName: "Name",
            lockPinned: true,
            valueFormatter: nameFormatter,
            cellClass: 'font-medium',
        },
        {
            headerName: "Email",
            valueFormatter: emailFormatter,
            cellClass: 'text-blue-600 dark:text-blue-400',
        },
        {
            headerName: "Phone",
            valueFormatter: phoneFormatter,
        },
        {
            headerName: "Service",
            valueFormatter: serviceFormatter,
            cellClass: 'font-medium',
        },
        {
            field: "attendance_date",
            headerName: "Date",
            valueFormatter: dateFormatter,
            filter: false,
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
    ], [StatusRenderer, ModeRenderer, dateFormatter, nameFormatter, emailFormatter, phoneFormatter, serviceFormatter]);

    // Grid Options
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

        // Auto-size columns after grid is ready
        setTimeout(() => {
            autoSizeColumns();
        }, 100);
    }, [autoSizeColumns]);

    // Auto-size columns when data changes
    useEffect(() => {
        if (isGridReady && attendanceData.length > 0) {
            // Auto-size columns after data update
            setTimeout(() => {
                autoSizeColumns();
            }, 150);
        }
    }, [attendanceData, isGridReady, autoSizeColumns]);

    // Handlers
    const handleApplyFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, []);

    const handleResetFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, []);

    const handleExportCSV = useCallback(() => {
        if (!gridRef.current) return;

        const timestamp = new Date().toISOString().split('T')[0];
        gridRef.current.exportDataAsCsv({
            fileName: `attendance-report-${timestamp}.csv`,
        });
    }, []);

    const handleRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    // Check if any filters are active
    const hasActiveFilters = useMemo(() =>
        activeFilters.service_id ||
        activeFilters.attendance_date?.length > 0 ||
        activeFilters.status ||
        activeFilters.mode
        , [activeFilters]);

    // Error state
    if (isError) {
        return (
            <Message
                className='max-w-md'
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
        <>
            {/* Action Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-5'>
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
                <ButtonSwitch
                    onChange={() => setShowMark(!showMark)}
                    color="orange"
                    checked={showMark}
                    type='button'
                    icon={<AttendanceIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Mark attendance for absent or present members"
                >
                    Mark Attendance
                </ButtonSwitch>
                <ButtonSwitch
                    onChange={() => setShowAssign(!showAssign)}
                    color="green"
                    checked={showAssign}
                    type='button'
                    icon={<AttendanceIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Assign absent members to leaders for active followups"
                >
                    Assign Absent Members
                </ButtonSwitch>
            </div>

            {/* Conditional Action Panels */}
            {(showFilter || showMark || showAssign) && (
                <div className='p-4 dark:bg-gray-800 bg-white shadow rounded-lg mb-5'>
                    {showFilter && (
                        <AdminAttendanceFilter
                            services={services}
                            initialFilters={activeFilters}
                            onApply={handleApplyFilters}
                            onReset={handleResetFilters}
                            loading={isFetching}
                        />
                    )}
                    {showMark && <AttendanceMarkAbsent services={services} />}
                    {showAssign && <AttendanceAssignment services={services} />}
                </div>
            )}

            {/* Header Section */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {attendanceData.length}
                        </span>
                        {' '}record{attendanceData.length !== 1 ? 's' : ''} found
                    </p>
                    {hasActiveFilters && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                            Filtered
                        </span>
                    )}
                    {isFetching && <InlineLoader />}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap w-full gap-3 mb-4">
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
                <Button
                    variant='ghost'
                    onClick={autoSizeColumns}
                    disabled={!attendanceData.length || isLoading}
                >
                    Re-size Columns
                </Button>
            </div>

            {/* AG Grid Table with Dark Mode Support */}
            {isLoading && !attendanceData.length ?
                <TableLoadingSkeleton title='attendance' /> :
                <>
                    <div
                        className="ag-theme-alpine dark:ag-theme-alpine-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-colors"
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
                                    <div class="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                                    <div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
                                </div>
                                <p class="text-gray-700 dark:text-gray-300 mt-4 font-medium">Loading attendance...</p>
                            </div>
                        </div>
                    `}
                            overlayNoRowsTemplate={`
                        <div class="flex items-center justify-center h-full bg-white dark:bg-gray-900">
                            <div class="text-center py-8">
                                <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p class="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                                    No attendance records found
                                </p>
                                <p class="text-gray-400 dark:text-gray-500 text-sm">
                                    ${hasActiveFilters
                                    ? 'Try adjusting your filters or reset them to see all records'
                                    : 'Records will appear here once available'}
                                </p>
                            </div>
                        </div>
                    `}
                        />
                    </div>
                    {/* Footer with Dark Mode Support */}
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
                </>}
        </>
    );
};

export default AdminAttendanceTable;