import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAllAttendance, useUserAttendance } from '@/queries/attendance.query';
import { useServices } from '@/queries/service.query';
import { LoadingIcon } from '@/icons';
import AttendanceFilter from '@/components/dashboard/attendance/AttendanceFilter';

ModuleRegistry.registerModules([AllCommunityModule]);

const AttendanceTable = () => {
    const gridRef = useRef(null);

    const [activeFilters, setActiveFilters] = useState({
        service_id: '',
        attendance_date: [],
        status: '',
        mode: ''
    });

    const {
        data: allAttendance = [],
        isError,
        error,
        isLoading,
        refetch,
        isFetching
    } = useUserAttendance(activeFilters);


    const { data: services = [] } = useServices();

    const defaultColDef = useMemo(() => ({
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
        suppressPaste: false,
        floatingFilter: true,
        editable: false,
    }), []);

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

    const columnDefs = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            width: 80,
            pinned: 'left',
            cellClass: 'font-medium',
            editable: false,
        },
        {
            headerName: "Name",
            valueFormatter: nameFormatter,
            width: 180,
        },
        {
            headerName: "Email",
            valueFormatter: emailFormatter,
            width: 220,
            cellClass: 'text-blue-600 dark:text-blue-400',
        },
        {
            headerName: "Phone",
            valueFormatter: phoneFormatter,
            width: 140,
        },
        {
            headerName: "Service",
            valueFormatter: serviceFormatter,
            width: 150,
            cellClass: 'font-medium',
        },
        {
            field: "attendance_date",
            headerName: "Date",
            valueFormatter: dateFormatter,
            width: 120,
            filter: false,
        },
        {
            field: "status",
            headerName: "Status",
            cellRenderer: StatusRenderer,
            width: 110,
            editable: false,
        },
        {
            field: "mode",
            headerName: "Mode",
            cellRenderer: ModeRenderer,
            width: 110,
            editable: false,
        },
    ], [StatusRenderer, ModeRenderer, dateFormatter, nameFormatter, emailFormatter, phoneFormatter, serviceFormatter]);

    const gridOptions = useMemo(() => ({
        pagination: true,
        paginationPageSize: 200,
        paginationPageSizeSelector: [25, 50, 100, 200],
        suppressDragLeaveHidesColumns: true,
        animateRows: true,
        suppressCellFocus: false,
        defaultColDef,
        columnDefs,
        rowData: allAttendance,
        loading: isLoading || isFetching,
        suppressColumnVirtualisation: false,
        suppressRowVirtualisation: false,
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
    }), [defaultColDef, columnDefs, allAttendance, isLoading, isFetching]);

    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
    }, []);

    const handleApplyFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, [activeFilters]);

    const handleResetFilters = useCallback((filters) => {
        setActiveFilters(filters);
    }, []);

    const handleExportCSV = useCallback(() => {
        if (gridRef.current) {
            const timestamp = new Date().toISOString().split('T')[0];
            gridRef.current.exportDataAsCsv({
                fileName: `attendance-report-${timestamp}.csv`,
            });
        }
    }, []);

    const hasActiveFilters =
        activeFilters.service_id ||
        activeFilters.attendance_date?.length > 0 ||
        activeFilters.status ||
        activeFilters.mode;

    return (
        <div className="w-full animate-fadeIn">
            <div className='mb-14'>
                <AttendanceFilter
                    services={services}
                    initialFilters={activeFilters}
                    onApply={handleApplyFilters}
                    onReset={handleResetFilters}
                    loading={isFetching}
                />
            </div>

            {isError && error ? <>
                <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fadeIn">
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-red-600 dark:text-red-400 mb-4 font-semibold">
                            Error loading attendance data
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {error?.message || 'An unexpected error occurred'}
                        </p>
                        <Button onClick={() => refetch()} variant="outline-danger" className='rounded'>
                            Retry
                        </Button>
                    </div>
                </div>
            </> : isLoading || (isFetching && !allAttendance?.length) ?
                <>
                    <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg animate-fadeIn">
                        <LoadingIcon width={40} height={40} />
                        <p>Fetching attendance records</p>
                    </div>
                </> :
                <>
                    {/* Header Section */}
                    <div className="flex justify-between items-center my-3">
                        <div className="flex items-center gap-3">
                            <p className="text-sm text-blue-600 dark:text-gray-400">
                                <span className="font-semibold text-blue-900 dark:text-white">
                                    {allAttendance?.length || 0}
                                </span>
                                {' '}record{allAttendance?.length !== 1 ? 's' : ''} found
                            </p>
                            {hasActiveFilters && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-blue-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                                    Filtered
                                </span>
                            )}
                            {(isFetching) && (
                                <span className="inline-flex items-center text-sm text-green-600 dark:text-blue-400">
                                    Syncing...
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <Button
                            variant='accent'
                            className='rounded px-5'
                            onClick={handleExportCSV}
                            disabled={isLoading || isFetching || !allAttendance?.length}
                        >
                            Download
                        </Button>
                        <Button
                            className='rounded px-5'
                            variant='ghost'
                            onClick={() => refetch()}
                            loading={isFetching}
                            disabled={isLoading}
                        >
                            Refresh
                        </Button>
                    </div>

                    {/* AG Grid Table */}
                    <div
                        className="ag-theme-alpine dark:ag-theme-alpine-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden"
                        style={{ width: "100%", height: "1000px" }}
                    >
                        <AgGridReact
                            ref={gridRef}
                            {...gridOptions}
                            onGridReady={onGridReady}
                            loadingOverlayComponent={() => (
                                <div className="flex items-center justify-center h-full">
                                    <LoadingIcon width={40} height={40} />
                                    <p>Fetching attendance records</p>
                                </div>
                            )}
                            noRowsOverlayComponent={() => (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                                            No attendance records found
                                        </p>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm">
                                            {hasActiveFilters
                                                ? 'Try adjusting your filters or reset them to see all records'
                                                : 'Records will appear here once available'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    {allAttendance?.length > 0 && (
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center animate-fadeIn">
                            <span>Last updated: {new Date().toLocaleString()}</span>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-green-600 dark:text-green-400 font-medium">Live data</span>
                                </span>
                            </div>
                        </div>
                    )}
                </>}
        </div>
    );
};

export default AttendanceTable;