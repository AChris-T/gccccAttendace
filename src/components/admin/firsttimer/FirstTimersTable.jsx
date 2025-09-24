
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useEffect, useRef } from 'react';
import { useFirstTimerStore } from "../../../store/firstTimer.store";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '../../ui/Badge';
import { Link } from "react-router-dom";
import Button from '../../ui/Button';

ModuleRegistry.registerModules([AllCommunityModule]);

const FirstTimersTable = () => {
    const { fetchFirstTimers, loading, error, firstTimers } = useFirstTimerStore();
    const gridRef = useRef(null);

    useEffect(() => {
        fetchFirstTimers();
    }, [fetchFirstTimers]);

    // Default column configuration with editing capabilities
    const defaultColDef = useMemo(() => ({
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
        suppressPaste: false,
        floatingFilter: true,
        editable: false,
    }), []);

    // Custom cell renderers
    const BadgeRenderer = useCallback(({ value }) => {
        if (!value || typeof value !== 'object') return null;
        return <Badge color={value?.color}>{value?.title}</Badge>;
    }, []);

    const LinkRenderer = useCallback(({ value }) => {
        if (!value) return null;
        return (
            <Link
                target="_blank"
                to={`/dashboard/first-timer/${value}`}
                className="text-blue-600 hover:text-blue-800 underline"
                rel="noopener noreferrer"
            >
                {value}
            </Link>
        );
    }, []);

    // Value formatter for member name
    const memberNameFormatter = useCallback((params) => {
        return params?.value?.name || '';
    }, []);

    // Date value formatter to ensure consistent display
    const dateValueFormatter = useCallback((params) => {
        if (!params.value) return '';
        const date = new Date(params.value);
        if (isNaN(date.getTime())) return params.value;
        return date.toLocaleDateString();
    }, []);

    // Column definitions with editing capabilities
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
            field: "name",
            headerName: "Name",
            width: 150,
            cellClass: 'font-medium',
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            cellClass: 'text-blue-600',
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            width: 130,
        },
        {
            field: "date_of_visit",
            headerName: "Date of Visit",
            width: 120,
            valueFormatter: dateValueFormatter,
        },
        {
            field: "invited_by",
            headerName: "Invited By",
            width: 130,
        },
        {
            field: "assigned_to_member",
            headerName: "Assigned To",
            valueFormatter: memberNameFormatter,
            width: 130,
            editable: false,
        },
        {
            field: "follow_up_status",
            headerName: "Follow-up Status",
            cellRenderer: BadgeRenderer,
            width: 140,
            filter: false,
            editable: false,
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 90,
        },
        {
            field: "notes",
            headerName: "Notes",
            width: 200,
            cellClass: 'text-wrap',
            autoHeight: true,
        },
        {
            field: "week_ending",
            headerName: "Week Ending",
            width: 120,
            valueFormatter: dateValueFormatter,
        },
    ], [LinkRenderer, memberNameFormatter, dateValueFormatter]);

    // Grid options
    const gridOptions = useMemo(() => ({
        pagination: true,
        paginationPageSize: 200,
        paginationPageSizeSelector: [25, 50, 100, 200],
        suppressDragLeaveHidesColumns: true,
        animateRows: true,
        suppressCellFocus: false,
        defaultColDef,
        columnDefs,
        rowData: firstTimers,
        loading: loading,
        suppressColumnVirtualisation: false,
        suppressRowVirtualisation: false,
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
        stopEditingWhenCellsLoseFocus: true,
    }), [defaultColDef, columnDefs, firstTimers, loading]);

    // Event handlers
    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
    }, []);


    // Error state
    if (error) return <Alert onClick={fetchMembers} variant='error' message={error} />

    // Loading state
    if (loading && !firstTimers?.length) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading first timers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header with controls */}
            <p className="text-sm text-gray-600">
                {firstTimers?.length || 0} records found
            </p>
            <div className="flex w-full gap-5 my-4">
                <Button
                    variant='outline-primary'
                    className='rounded px-5'
                    onClick={() => gridRef.current?.exportDataAsCsv()}
                >
                    Export CSV
                </Button>
                <Button
                    className='rounded px-5'
                    variant='outline-dark'
                    onClick={() => fetchFirstTimers()}
                    loading={loading}
                >
                    Refresh
                </Button>
            </div>

            {/* AG Grid Table */}
            <div
                className="ag-theme-alpine border border-gray-200 rounded-lg shadow-sm overflow-x-auto"
                style={{ width: "100%", height: "1000px" }}
            >
                <AgGridReact
                    ref={gridRef}
                    {...gridOptions}
                    onGridReady={onGridReady}
                    loadingOverlayComponent="Loading..."
                    noRowsOverlayComponent="No first timers found"
                />
            </div>

            {/* Footer */}
            {firstTimers?.length > 0 && (
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

export default FirstTimersTable;