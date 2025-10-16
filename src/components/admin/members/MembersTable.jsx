import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Link } from "react-router-dom";
import { useMembers } from '@/queries/member.query';
import Button from '@/components/ui/Button';
import Message from '@/components/common/Message';

ModuleRegistry.registerModules([AllCommunityModule]);

const MembersTable = () => {
    const { data: members, isLoading, refetch, isError, error, isFetching } = useMembers();
    const gridRef = useRef(null);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
        suppressPaste: false,
        floatingFilter: true,
        editable: false,
        minWidth: 100,
    }), []);

    const LinkRenderer = useCallback(({ value }) => {
        if (!value) return null;
        return (
            <Link
                target="_blank"
                to={`/dashboard/members/${value}`}
                className="text-blue-600 hover:text-blue-800 underline"
                rel="noopener noreferrer"
            >
                {value}
            </Link>
        );
    }, []);

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

    const columnDefs = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            cellRenderer: LinkRenderer,
            width: 80,
            pinned: 'left',
            cellClass: 'font-medium',
            editable: false,
        },
        {
            field: "first_name",
            headerName: "First Name",
            width: 180,
            cellClass: 'font-medium',
        },
        {
            field: "last_name",
            headerName: "Last Name",
            width: 180,
            cellClass: 'font-medium',
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            width: 130,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            cellClass: 'text-blue-600',
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 90,
        },
        {
            field: "address",
            headerName: "Address",
            width: 200,
        },
        {
            field: "date_of_birth",
            headerName: "Date of Birth",
            width: 130,
            valueFormatter: dateValueFormatter,
        },
        {
            field: "community",
            headerName: "Community",
            width: 130,
        },
        {
            field: "worker",
            headerName: "Worker",
            width: 130,
        },
    ], [LinkRenderer, dateValueFormatter]);

    // Grid options - FIXED: Removed rowData from here
    const gridOptions = useMemo(() => ({
        pagination: true,
        paginationPageSize: 200,
        paginationPageSizeSelector: [25, 50, 100, 200],
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
    }), []);

    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
        params.api.sizeColumnsToFit();
    }, []);

    const handleExportCSV = useCallback(() => {
        if (gridRef.current) {
            const timestamp = new Date().toISOString().split('T')[0];
            gridRef.current.exportDataAsCsv({
                fileName: `members-report-${timestamp}.csv`,
            });
        }
    }, []);

    // Error state
    if (isError) {
        return (
            <div className="w-full">
                <Message variant='error' data={error?.data} />
                <div className="mt-4">
                    <Button
                        size='sm'
                        variant='primary'
                        onClick={() => refetch()}
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    // Loading state - FIXED: Better loading condition
    if (isLoading && !members?.length) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading members...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">
                            {members?.length || 0}
                        </span>
                        {' '}record{members?.length !== 1 ? 's' : ''} found
                    </p>
                    {isFetching && (
                        <span className="inline-flex items-center text-sm text-blue-600">
                            Syncing...
                        </span>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap w-full gap-3 mb-4">
                <Button
                    size='sm'
                    variant='primary'
                    onClick={handleExportCSV}
                    disabled={!members?.length || isLoading}
                >
                    Export CSV
                </Button>
                <Button
                    size='sm'
                    variant='neutral'
                    onClick={() => refetch()}
                    loading={isFetching}
                    disabled={isLoading}
                >
                    Refresh
                </Button>
            </div>

            {/* AG Grid Table */}
            <div
                className="ag-theme-alpine border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                style={{ width: "100%", height: "1000px" }}
            >
                <AgGridReact
                    ref={gridRef}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowData={members}
                    {...gridOptions}
                    onGridReady={onGridReady}
                    loading={isLoading || isFetching}
                    loadingOverlayComponent={() => (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-600 mt-2">Loading members...</p>
                            </div>
                        </div>
                    )}
                    noRowsOverlayComponent={() => (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="text-gray-500 text-lg font-medium mb-2">
                                    No members found
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Members will appear here once available
                                </p>
                            </div>
                        </div>
                    )}
                />
            </div>

            {/* Footer */}
            {members?.length > 0 && (
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>Last updated: {new Date().toLocaleString()}</span>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-600 font-medium">Live data</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembersTable;