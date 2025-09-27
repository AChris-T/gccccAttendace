import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '../../ui/Badge';
import { Link } from "react-router-dom";
import Button from '../../ui/Button';
import { Toast } from '../../../lib/toastify';
import { useFirstTimers } from '../../../queries/firstTimer.query';
import { useFollowUpStatuses } from '../../../queries/followupstatus.query';

ModuleRegistry.registerModules([AllCommunityModule]);

const FirstTimersTable = () => {
    const { data: firstTimers, isLoading, isFetching, isError, error, refetch } = useFirstTimers();
    const { data: followupStatuses = [] } = useFollowUpStatuses()

    const gridRef = useRef(null);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        if (firstTimers) {
            setSelectedRowIds([]);
        }
    }, [firstTimers]);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
        suppressPaste: false,
        floatingFilter: true,
        editable: false,
        checkboxSelection: false,
        headerCheckboxSelection: false,
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

    // Column definitions with checkbox selection
    const columnDefs = useMemo(() => [
        {
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 50,
            pinned: 'left',
            lockPosition: true,
            suppressMenu: true,
            suppressSizeToFit: true,
            suppressResize: true,
            suppressMovable: true,
            editable: false,
            filter: false,
            sortable: false,
        },
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

    // Grid options with row selection
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
        loading: isLoading || isFetching,
        suppressColumnVirtualisation: false,
        suppressRowVirtualisation: false,
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
        stopEditingWhenCellsLoseFocus: true,
        rowSelection: 'multiple',
        suppressRowDeselection: false,
        suppressRowClickSelection: false,
        rowMultiSelectWithClick: true,
        enableRangeSelection: false,
        getRowId: (params) => params.data.id,
    }), [defaultColDef, columnDefs, firstTimers, isLoading, isFetching]);

    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
    }, []);

    // Handle selection changes
    const onSelectionChanged = useCallback((event) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedIds = selectedNodes.map(node => node.data.id);
        setSelectedRowIds(selectedIds);
    }, []);

    // Function to get selected row data (can be called externally)
    const getSelectedRowData = useCallback(() => {
        if (gridRef.current) {
            const selectedNodes = gridRef.current.getSelectedNodes();
            return selectedNodes.map(node => node.data);
        }
        return [];
    }, []);

    // Function to clear all selections
    const clearSelection = useCallback(() => {
        if (gridRef.current) {
            gridRef.current.deselectAll();
        }
    }, []);

    // Function to select specific rows by IDs
    const selectRowsByIds = useCallback((ids) => {
        if (gridRef.current) {
            gridRef.current.forEachNode((node) => {
                if (ids.includes(node.data.id)) {
                    node.setSelected(true);
                }
            });
        }
    }, []);

    const handleBulkAction = useCallback(() => {
        if (selectedRowIds.length === 0) {
            Toast.info('Please select at least one row');
            return;
        }
        console.log('Performing bulk action on IDs:', selectedRowIds, selectedStatus);
    }, [selectedRowIds, selectedStatus]);

    // Error state
    if (isError && error) {
        return (
            <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-center">
                    <div className="text-red-600 mb-2">Error loading data</div>
                    <Button onClick={() => refetch()} variant="outline-danger" className='rounded'>
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (isLoading || (isFetching && !firstTimers?.length)) {
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
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600 ">
                    <span>
                        {firstTimers?.length || 0} records found
                    </span>
                    <span className='mx-2'>
                        {selectedRowIds.length > 0 && (
                            <Badge color='warning'>{selectedRowIds.length} selected</Badge>
                        )}
                    </span>
                </p>
            </div>

            <div className="flex flex-wrap justify-between w-full gap-2 my-4">
                <div className='flex gap-2'>
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
                        onClick={() => refetch()}
                        loading={isFetching}
                    >
                        Refresh
                    </Button></div>
                <div className='flex gap-2'>
                    {selectedRowIds.length > 0 && (
                        <>
                            <Button
                                variant="outline-danger"
                                onClick={clearSelection}
                                className='rounded'
                            >
                                Clear
                            </Button>
                            <select
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                value={selectedStatus}
                                id="month-year"
                                className="block px-2 py-2 text-gray-700 dark:text-white/90 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                aria-label=""
                            >
                                {followupStatuses?.map((followupStatus) => (
                                    <option key={followupStatus?.id} value={followupStatus?.id}>
                                        {followupStatus?.title}
                                    </option>
                                )) || []}
                            </select>
                            <Button
                                variant="success"
                                className='rounded px-5'
                                onClick={handleBulkAction}
                            >
                                Update status
                            </Button>
                        </>
                    )}
                </div>
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
                    onSelectionChanged={onSelectionChanged}
                    loadingOverlayComponent="Loading..."
                    noRowsOverlayComponent="No first timers found"
                />
            </div>

            {firstTimers?.length > 0 && (<>
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>Last updated: {new Date().toLocaleString()}</span>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <span className={`text-green-500 `}>Live data</span>
                        </span>
                    </div>
                </div>
            </>)}
        </div>
    );
};
//  These functions are available for external use:
//     - getSelectedRowData(): Returns full data of selected rows
//     - clearSelection(): Clears all selections
//     - selectRowsByIds(ids): Selects rows by their IDs
//     - selectedRowIds: Array of currently selected IDs

// Export additional utilities if needed
export { FirstTimersTable };


export const useFirstTimersTableActions = (tableRef) => {
    const getSelectedRowData = useCallback(() => {
        if (tableRef.current) {
            const selectedNodes = tableRef.current.getSelectedNodes();
            return selectedNodes.map(node => node.data);
        }
        return [];
    }, [tableRef]);

    const clearSelection = useCallback(() => {
        if (tableRef.current) {
            tableRef.current.deselectAll();
        }
    }, [tableRef]);

    const selectRowsByIds = useCallback((ids) => {
        if (tableRef.current) {
            tableRef.current.forEachNode((node) => {
                if (ids.includes(node.data.id)) {
                    node.setSelected(true);
                }
            });
        }
    }, [tableRef]);

    return {
        getSelectedRowData,
        clearSelection,
        selectRowsByIds,
    };
};

export default FirstTimersTable;