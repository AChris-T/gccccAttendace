import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Link } from "react-router-dom";
import Button from '../../ui/Button';
import { useMembers } from '../../../queries/member.query';
import Message from '../../common/Message';

ModuleRegistry.registerModules([AllCommunityModule]);

const MembersTable = () => {
    const { data: members = [], isLoading, refetch, isError, error, isFetching } = useMembers()
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

    // Date formatter
    const dateValueFormatter = useCallback((params) => {
        if (!params.value) return '';
        const date = new Date(params.value);
        if (isNaN(date.getTime())) return params.value;
        return date.toLocaleDateString();
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
    ],
        [
            LinkRenderer,
            dateValueFormatter
        ]);

    // Grid options with performance optimizations
    const gridOptions = useMemo(() => ({
        pagination: true,
        paginationPageSize: 200,
        paginationPageSizeSelector: [25, 50, 100, 200],
        suppressDragLeaveHidesColumns: true,
        animateRows: true,
        suppressCellFocus: false,
        defaultColDef,
        columnDefs,
        rowData: members,
        loading: isLoading || isFetching,
        suppressColumnVirtualisation: false,
        suppressRowVirtualisation: false,
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
        rowSelection: 'multiple',
        suppressRowDeselection: false,
        rowMultiSelectWithClick: true,
        enableFillHandle: true,
    }), [defaultColDef, columnDefs, members, isLoading, isFetching]);

    // Event handlers
    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
        params.api.sizeColumnsToFit();
    }, []);


    if (isError) return <Message variant='error' data={error?.data} />

    if (isLoading || isFetching && !members?.length) {
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
            <p className="text-sm text-gray-600">
                {members?.length || 0} records found
            </p>
            <div className="flex flex-wrap w-full gap-3 my-4">
                <Button
                    size='sm'
                    variant='primary'
                    onClick={() => gridRef.current?.exportDataAsCsv()}
                >
                    Export CSV
                </Button>
                <Button
                    size='sm'
                    variant='neutral'
                    onClick={() => refetch()}
                    loading={isLoading || isFetching}
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
                    {...gridOptions}
                    onGridReady={onGridReady}
                    loadingOverlayComponent="Loading members..."
                    noRowsOverlayComponent="No members found"
                />
            </div>

            {members?.length > 0 && (
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>Last updated: {new Date().toLocaleString()}</span>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <span className={`text-green-500 `}>Live data</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembersTable;