import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useEffect, useRef } from 'react';
import { useAttendanceStore } from "../../../store/attendance.store";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';

ModuleRegistry.registerModules([AllCommunityModule]);

const AdminAttendanceTable = () => {
    const { fetchAllAttendance, loading, error, allAttendance } = useAttendanceStore();
    const gridRef = useRef(null);

    useEffect(() => {
        fetchAllAttendance();
    }, [fetchAllAttendance]);

    // Highly optimized default column configuration for large datasets
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
        // Remove expensive features for large datasets
        filter: false, // Disable for performance with large data
        floatingFilter: false, // Disable floating filters for performance
        suppressMenu: false,
        lockPosition: false,
        suppressMovable: false,
    }), []);

    // Memoized and optimized cell renderers
    const StatusRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400">N/A</span>;

        // Optimized color logic without switch statement
        const colors = { present: 'green', absent: 'red', late: 'yellow' };
        const color = colors[value.toLowerCase()] || 'gray';

        return <Badge color={color}>{value}</Badge>;
    }, []);

    const ModeRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400">N/A</span>;

        const colors = { onsite: 'blue', online: 'purple', hybrid: 'indigo' };
        const color = colors[value.toLowerCase()] || 'gray';

        return <Badge color={color}>{value}</Badge>;
    }, []);

    const DayRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400">N/A</span>;

        const colors = {
            sunday: 'orange', monday: 'blue', tuesday: 'green', wednesday: 'purple',
            thursday: 'pink', friday: 'indigo', saturday: 'yellow'
        };
        const color = colors[value.toLowerCase()] || 'gray';
        const formatted = value.charAt(0).toUpperCase() + value.slice(1);

        return <Badge color={color}>{formatted}</Badge>;
    }, []);

    // Optimized formatters using simple functions
    const dateFormatter = useCallback(({ value }) => {
        if (!value) return '';
        return new Date(value).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }, []);

    const timeFormatter = useCallback(({ value }) => value || '', []);

    const nameFormatter = useCallback(({ data }) => {
        const { first_name, last_name } = data;
        if (!first_name && !last_name) return 'N/A';
        return `${first_name || ''} ${last_name || ''}`.trim();
    }, []);

    // Streamlined column definitions optimized for performance
    const columnDefs = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            width: 70,
            pinned: 'left',
            cellClass: 'text-xs font-medium',
            suppressSizeToFit: true,
        },
        {
            headerName: "Name",
            valueGetter: nameFormatter,
            width: 140,
            cellClass: 'text-xs',
        },
        {
            field: "email",
            headerName: "Email",
            width: 180,
            cellClass: 'text-xs text-blue-600',
            tooltipField: 'email', // Show full email on hover
        },
        {
            field: "service_name",
            headerName: "Service",
            width: 120,
            cellClass: 'text-xs font-medium',
        },
        {
            field: "attendance_date",
            headerName: "Date",
            valueFormatter: dateFormatter,
            width: 100,
            cellClass: 'text-xs',
        },
        {
            field: "status",
            headerName: "Status",
            cellRenderer: StatusRenderer,
            width: 90,
            cellClass: 'text-xs',
        },
        {
            field: "mode",
            headerName: "Mode",
            cellRenderer: ModeRenderer,
            width: 90,
            cellClass: 'text-xs',
        },
        {
            field: "service_day_of_week",
            headerName: "Day",
            cellRenderer: DayRenderer,
            width: 90,
            cellClass: 'text-xs',
        },
        {
            field: "service_start_time",
            headerName: "Time",
            valueFormatter: timeFormatter,
            width: 80,
            cellClass: 'text-xs',
        },
        {
            field: "phone_number",
            headerName: "Phone",
            width: 120,
            cellClass: 'text-xs',
        },
        {
            field: "role",
            headerName: "Role",
            width: 100,
            cellClass: 'text-xs',
        },
    ], [StatusRenderer, ModeRenderer, DayRenderer, dateFormatter, timeFormatter, nameFormatter]);

    // Highly optimized grid options for large datasets
    const gridOptions = useMemo(() => ({
        // Pagination optimizations
        pagination: true,
        paginationPageSize: 100, // Smaller page size for better performance
        paginationPageSizeSelector: [50, 100, 200],

        // Performance optimizations for large datasets
        rowBuffer: 10, // Minimal row buffer
        suppressRowVirtualisation: false, // Enable row virtualization
        suppressColumnVirtualisation: false, // Enable column virtualization

        // Remove expensive features
        suppressDragLeaveHidesColumns: true,
        suppressMovableColumns: false,
        suppressFieldDotNotation: true,

        // Animation settings for performance
        animateRows: false, // Disable for large datasets
        suppressAnimationFrame: false,

        // Grid settings
        defaultColDef,
        columnDefs,
        rowData: allAttendance,
        loading: loading,

        // Scroll settings
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
        suppressScrollOnNewData: true,

        // Selection settings (minimal overhead)
        suppressRowClickSelection: false,
        suppressRowDeselection: false,

        // Performance cache settings
        cacheBlockSize: 100,
        maxBlocksInCache: 10,
        maxConcurrentDatasourceRequests: 2,
        blockLoadDebounceMillis: 50,

        // Disable expensive features
        enableRangeSelection: false,
        enableRangeHandle: false,
        enableFillHandle: false,

        // Row height optimization
        rowHeight: 35, // Smaller row height for more data visibility
        headerHeight: 40,
    }), [defaultColDef, columnDefs, allAttendance, loading]);

    // Optimized event handlers
    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;

        // Optimize grid for large datasets
        params.api.sizeColumnsToFit();

        // Set loading overlay
        if (loading) {
            params.api.showLoadingOverlay();
        }
    }, [loading]);

    const onFirstDataRendered = useCallback((params) => {
        // Auto-size columns only on first render for performance
        if (allAttendance?.length > 0 && allAttendance.length < 1000) {
            params.api.sizeColumnsToFit();
        }
    }, [allAttendance]);

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Error loading attendance data</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                    <button
                        onClick={() => fetchAllAttendance()}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Loading state
    if (loading && !allAttendance?.length) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading attendance records...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Minimal header for performance */}
            <div className="mb-3 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    {allAttendance?.length?.toLocaleString() || 0} records
                    {loading && <span className="ml-2 text-blue-600">• Loading...</span>}
                </p>
                <div className="flex gap-3">
                    <Button
                        variant='outline-primary'
                        className='rounded px-4 py-2 text-sm'
                        onClick={() => gridRef.current?.exportDataAsCsv()}
                        disabled={loading}
                    >
                        Export CSV
                    </Button>
                    <Button
                        className='rounded px-4 py-2 text-sm'
                        variant='outline-light'
                        onClick={() => fetchAllAttendance()}
                        loading={loading}
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Optimized AG Grid for large datasets */}
            <div
                className="ag-theme-alpine border border-gray-200 rounded-lg shadow-sm"
                style={{ width: "100%", height: "700px" }}
            >
                <AgGridReact
                    ref={gridRef}
                    {...gridOptions}
                    onGridReady={onGridReady}
                    onFirstDataRendered={onFirstDataRendered}
                    loadingOverlayComponent={() => (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-600 mt-2">Loading records...</p>
                            </div>
                        </div>
                    )}
                    noRowsOverlayComponent={() => (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No attendance records found</p>
                        </div>
                    )}
                />
            </div>

            {/* Minimal footer */}
            {allAttendance?.length > 0 && (
                <div className="mt-3 text-xs text-gray-500 flex justify-between items-center">
                    <span>Updated: {new Date().toLocaleTimeString()}</span>
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Live
                    </span>
                </div>
            )}
        </div>
    );
};

export default AdminAttendanceTable;