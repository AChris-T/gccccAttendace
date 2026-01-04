import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAllAttendance } from '@/queries/attendance.query';
import { useServices } from '@/queries/service.query';
import { AttendanceIcon2, ExpandFullScreenIcon, FilterIcon, LeaderIcon2 } from '@/icons';
import AttendanceMarkAbsent from '@/components/admin/attendance/AttendanceMarkAbsent';
import AttendanceAssignment from '@/components/admin/attendance/AttendanceAssignment';
import AdminAttendanceFilter from '@/components/admin/attendance/AdminAttendanceFilter';
import ButtonSwitch from '@/components/ui/ButtonSwitch';
import { TableSkeletonLoader } from '@/components/skeleton';
import Message from '@/components/common/Message';
import { Link } from 'react-router-dom';
import ButtonCard from '@/components/ui/ButtonCard';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import AttendanceMarkPresent from '@/components/admin/attendance/AttendanceMarkPresent';

ModuleRegistry.registerModules([AllCommunityModule]);

const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 200;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 800;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const DEFAULT_FILTERS = {
    service_id: '',
    attendance_date: [],
    status: '',
    mode: ''
};

const AdminAttendanceTable = () => {
    const gridRef = useRef(null);
    const [isGridReady, setIsGridReady] = useState(false);
    const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);
    const [showFilter, setShowFilter] = useState(false);
    const { isOpen: isOpenMarkModal, openModal: openMarkModal, closeModal: closeMarkModal } = useModal();
    const { isOpen: isOpenMarkPresentModal, openModal: openMarkPresentModal, closeModal: closeMarkPresentModal } = useModal();
    const { isOpen: isOpenAssignModal, openModal: openAssignModal, closeModal: closeAssignModal } = useModal();

    const {
        data: allAttendance = [],
        isError,
        error,
        isLoading,
        refetch,
        isFetching
    } = useAllAttendance(activeFilters);

    const { data: services = [] } = useServices();

    const attendanceData = useMemo(() => {
        if (!allAttendance) return [];
        return Array.isArray(allAttendance) ? allAttendance : [];
    }, [allAttendance]);

    const tableHeight = useMemo(() => {
        if (attendanceData.length === 0) return MIN_TABLE_HEIGHT;
        const contentHeight = (attendanceData.length * ROW_HEIGHT) + HEADER_HEIGHT + PAGINATION_HEIGHT;
        return Math.min(Math.max(contentHeight, MIN_TABLE_HEIGHT), MAX_TABLE_HEIGHT);
    }, [attendanceData.length]);

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

    const StatusRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400 text-center">--</span>;
        const statusLower = value.toLowerCase();
        const colorMap = { present: 'success', absent: 'error' };
        const color = colorMap[statusLower] || 'default';
        return <Badge color={color}>{value}</Badge>;
    }, []);

    const LinkRenderer = useCallback(({ data }) => {
        if (!data?.user) return <span className="text-gray-400 text-center">--</span>;
        const user = data.user;
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        return (
            <Link
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline hover:text-blue-700 dark:hover:text-blue-300'
                to={`/dashboard/members/${user.id}`}
            >
                {fullName || 'N/A'}
            </Link>
        );
    }, []);

    const nameValueGetter = useCallback((params) => {
        const user = params.data?.user;
        if (!user) return 'N/A';
        return `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A';
    }, []);

    const ModeRenderer = useCallback(({ value }) => {
        if (!value) return <span className="text-gray-400 text-center">--</span>;
        const modeLower = value.toLowerCase();
        const colorMap = { onsite: 'primary', online: 'warning' };
        const color = colorMap[modeLower] || 'default';
        return <Badge color={color}>{value}</Badge>;
    }, []);

    const emailValueGetter = useCallback((params) => {
        return params.data?.user?.email || 'N/A';
    }, []);

    const phoneValueGetter = useCallback((params) => {
        return params.data?.user?.phone_number || 'N/A';
    }, []);

    const serviceValueGetter = useCallback((params) => {
        return params.data?.service?.name || 'N/A';
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
            pinned: 'left',
            valueGetter: nameValueGetter,
            cellRenderer: LinkRenderer,
            cellClass: 'font-medium',
        },
        {
            headerName: "Email",
            valueGetter: emailValueGetter,
            cellClass: 'text-blue-600 dark:text-blue-400',
        },
        {
            headerName: "Phone",
            valueGetter: phoneValueGetter,
        },
        {
            headerName: "Service",
            valueGetter: serviceValueGetter,
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
    ], [StatusRenderer, ModeRenderer, dateFormatter, LinkRenderer, nameValueGetter, emailValueGetter, phoneValueGetter, serviceValueGetter]);

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


    const autoSizeColumns = useCallback(() => {
        if (!gridRef.current) return;

        const allColumns = gridRef.current.getColumns?.() || gridRef.current.getAllDisplayedColumns?.();
        if (!allColumns || allColumns.length === 0) return;

        const allColumnIds = allColumns.map(col => col.getColId());
        gridRef.current.autoSizeColumns(allColumnIds, false);
    }, []);

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

    const handleExportCSV = useCallback(() => {
        if (!gridRef.current) return;
        const timestamp = new Date().toISOString().split('T')[0];
        gridRef.current?.exportDataAsCsv({
            fileName: `attendance-report-${timestamp}.csv`,
        });
    }, []);

    const handleRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    const hasActiveFilters = useMemo(() =>
        activeFilters.service_id ||
        activeFilters.attendance_date?.length > 0 ||
        activeFilters.status ||
        activeFilters.mode
        , [activeFilters]);

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
        <div className="w-full space-y-10">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                <ButtonSwitch
                    onChange={handleToggleFilter}
                    checked={showFilter}
                    color="pink"
                    type='button'
                    icon={<FilterIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Filter attendance record"
                >
                    Filter
                </ButtonSwitch>
                <ButtonCard
                    onClick={openMarkModal}
                    color="orange"
                    type='button'
                    icon={<AttendanceIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Mark attendance for absent members"
                >
                    Mark Attendance (Absent)
                </ButtonCard>
                <ButtonCard
                    onClick={openMarkPresentModal}
                    color="green"
                    type='button'
                    icon={<AttendanceIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Mark attendance for present members"
                >
                    Mark Attendance (Present)
                </ButtonCard>
                <ButtonCard
                    onClick={openAssignModal}
                    color="blue"
                    type='button'
                    icon={<LeaderIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                    description="Assign absent members to leaders for active followups"
                >
                    Assign Absent Members
                </ButtonCard>
            </div>

            {showFilter && (
                <div className='p-4 dark:bg-gray-800 bg-white shadow rounded-lg'>
                    <AdminAttendanceFilter
                        services={services}
                        initialFilters={activeFilters}
                        onApply={handleApplyFilters}
                        onReset={handleResetFilters}
                        loading={isFetching}
                    />
                </div>
            )}

            <Modal
                maxWidth='max-w-3xl'
                title={`Assign Absent Members`}
                description='Assign absent members for active followup'
                isOpen={isOpenAssignModal}
                onClose={closeAssignModal}
            >
                <AttendanceAssignment services={services} onClose={closeAssignModal} />
            </Modal>
            <Modal
                title={`Mark Attendance`}
                isOpen={isOpenMarkModal}
                description='Admin Mark Absent Members.'
                onClose={closeMarkModal}
            >
                <AttendanceMarkAbsent activeFilters={activeFilters} services={services} onClose={closeMarkModal} />
            </Modal>
            <Modal
                title={`Mark Attendance`}
                isOpen={isOpenMarkPresentModal}
                description='Admin Mark Present Members.'
                onClose={closeMarkPresentModal}
            >
                <AttendanceMarkPresent activeFilters={activeFilters} services={services} onClose={closeMarkPresentModal} />
            </Modal>

            <div className='space-y-3'>
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
                    <TableSkeletonLoader /> :
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
                                    <div class="w-12 h-12 border-4 border-gray-200  rounded-full"></div>
                                    <div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600  rounded-full animate-spin"></div>
                                </div>
                                <p class="text-gray-700 mt-4 font-medium">Loading attendance...</p>
                            </div>
                        </div>
                    `}
                                overlayNoRowsTemplate={`
                        <div class="flex items-center justify-center h-full bg-white">
                            <div class="text-center py-8">
                                <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p class="text-gray-500 text-lg font-medium mb-2">
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
                    </>}
            </div>
        </div>
    );
};

export default AdminAttendanceTable;