import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { useMemberStore } from "../../../store/member.store";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Link } from "react-router-dom";
import Button from '../../ui/Button';
import Alert from '../../ui/Alert';

ModuleRegistry.registerModules([AllCommunityModule]);

const MembersTable = () => {
    const { fetchMembers, loading, error, members, bulkUpdate, loadingBulkUpdate } = useMemberStore();
    const gridRef = useRef(null);
    const [editingMode, setEditingMode] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [changedRows, setChangedRows] = useState(new Map());

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    // Custom Date Cell Editor Component
    const CustomDateCellEditor = useCallback((props) => {
        const { value, onValueChange, eventKey } = props;
        const inputRef = useRef(null);
        const [currentValue, setCurrentValue] = useState('');

        useEffect(() => {
            if (value) {
                let dateValue = value;
                if (typeof value === 'string') {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        dateValue = date.toISOString().split('T')[0];
                    } else {
                        dateValue = value.includes('T') ? value.split('T')[0] : value;
                    }
                }
                setCurrentValue(dateValue);
            }
        }, [value]);

        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                if (eventKey && eventKey.length === 1) {
                    inputRef.current.value = eventKey;
                    setCurrentValue(eventKey);
                }
            }
        }, [eventKey]);

        const handleChange = (e) => {
            const newValue = e.target.value;
            setCurrentValue(newValue);
            onValueChange(newValue);
        };

        return (
            <input
                ref={inputRef}
                type="date"
                value={currentValue}
                onChange={handleChange}
                className="w-full h-full border-none outline-none px-2"
                style={{ fontSize: '14px' }}
            />
        );
    }, []);

    // Default column configuration
    const defaultColDef = useMemo(() => ({
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
        suppressPaste: false,
        floatingFilter: true,
        editable: editingMode,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        singleClickEdit: true,
        minWidth: 100,
    }), [editingMode]);


    const LinkRenderer = useCallback(({ value }) => {
        if (!value) return null;
        return (
            <Link
                target="_blank"
                to={`/dashboard/member/${value}`}
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
            cellEditor: 'agTextCellEditor',
        },
        {
            field: "last_name",
            headerName: "Last Name",
            width: 180,
            cellClass: 'font-medium',
            cellEditor: 'agTextCellEditor',
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            width: 130,
            cellEditor: 'agTextCellEditor',
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            cellClass: 'text-blue-600',
            cellEditor: 'agTextCellEditor',
            cellEditorParams: {
                maxLength: 100
            }
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 90,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Male', 'Female', 'Other']
            }
        },
        {
            field: "address",
            headerName: "Address",
            width: 200,
            cellEditor: 'agTextCellEditor',
        },
        {
            field: "date_of_birth",
            headerName: "Date of Birth",
            width: 130,
            cellEditor: CustomDateCellEditor,
            valueFormatter: dateValueFormatter,
        },
        {
            field: "community",
            headerName: "Community",
            width: 130,
            cellEditor: 'agTextCellEditor',
        },
        {
            field: "worker",
            headerName: "Worker",
            width: 130,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Yes', 'No']
            }
        },
    ],
        [
            LinkRenderer,
            CustomDateCellEditor,
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
        loading: loading,
        suppressColumnVirtualisation: false,
        suppressRowVirtualisation: false,
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
        editType: 'fullRow',
        suppressClickEdit: !editingMode,
        stopEditingWhenCellsLoseFocus: true,
        rowSelection: 'multiple',
        suppressRowDeselection: false,
        rowMultiSelectWithClick: true,
        enableFillHandle: true,
        undoRedoCellEditing: true,
        undoRedoCellEditingLimit: 20,
    }), [defaultColDef, columnDefs, members, loading, editingMode]);

    // Event handlers
    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
        params.api.sizeColumnsToFit();
    }, []);

    const onCellValueChanged = useCallback((params) => {
        if (!editingMode) return;

        const { data, oldValue, newValue, colDef } = params;

        if (oldValue !== newValue) {
            const originalData = members.find(item => item.id === data.id);
            const updatedData = {
                ...originalData,
                ...data,
                [colDef.field]: newValue,
                updated_at: new Date().toISOString()
            };

            setChangedRows(prev => new Map(prev.set(data.id, updatedData)));
            setHasChanges(true);
        }
    }, [editingMode, members]);

    const toggleEditingMode = useCallback(() => {
        if (editingMode && hasChanges) {
            const confirm = window.confirm('You have unsaved changes. Do you want to save them?');
            if (confirm) {
                handleSaveChanges();
                return;
            } else {
                setChangedRows(new Map());
                setHasChanges(false);
                gridRef.current?.forEachNode(node => {
                    node?.setRowStyle(null);
                });
                fetchMembers();
            }
        }
        setEditingMode(prev => !prev);
    }, [editingMode, hasChanges]);

    const handleSaveChanges = useCallback(async () => {
        if (!hasChanges || changedRows.size === 0) return;

        try {
            const updates = Array.from(changedRows.values());

            await bulkUpdate({ members: updates });

            setChangedRows(new Map());
            setHasChanges(false);
            setEditingMode(false);

        } catch (error) { }

    }, [hasChanges, changedRows, bulkUpdate, fetchMembers]);

    const handleCancelChanges = useCallback(() => {
        setChangedRows(new Map());
        setHasChanges(false);
        setEditingMode(false);

        fetchMembers();
    }, [fetchMembers]);

    if (error) return <Alert onClick={fetchMembers} variant='error' message={error} />

    if (loading && !members?.length) {
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
            {/* Header with controls */}
            <div className="">
                <p className="text-sm text-gray-600">
                    {members?.length || 0} members found
                    {hasChanges && (
                        <span className="ml-2 text-amber-600 font-medium">
                            • {changedRows.size} unsaved changes
                        </span>
                    )}
                </p>
                <div className="flex flex-wrap w-full gap-3 my-4">
                    {/* Editing controls */}
                    {editingMode ? (
                        <>
                            <Button
                                variant='success'
                                className='rounded px-5'
                                onClick={handleSaveChanges}
                                loading={loadingBulkUpdate}
                                disabled={!hasChanges}
                            >
                                Save Changes ({changedRows.size})
                            </Button>
                            <Button
                                variant='outline-danger'
                                className='rounded px-5'
                                onClick={handleCancelChanges}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant='outline-success'
                            className='rounded px-5'
                            onClick={toggleEditingMode}
                        >
                            Edit Table
                        </Button>
                    )}

                    {/* Export/Refresh controls */}
                    <Button
                        variant='outline-primary'
                        className='rounded px-5'
                        onClick={() => gridRef.current?.exportDataAsCsv()}
                        disabled={editingMode}
                    >
                        Export CSV
                    </Button>
                    <Button
                        className='rounded px-5'
                        variant='outline-light'
                        onClick={() => fetchMembers()}
                        loading={loading}
                        disabled={editingMode && hasChanges}
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Editing mode indicator */}
            {editingMode && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-800 font-medium">Editing Mode Active</span>
                        <span className="text-blue-600 text-sm">
                            • Click on cells to edit •
                        </span>
                    </div>
                </div>
            )}

            {/* AG Grid Table */}
            <div
                className="ag-theme-alpine border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                style={{ width: "100%", height: "1000px" }}
            >
                <AgGridReact
                    ref={gridRef}
                    {...gridOptions}
                    onGridReady={onGridReady}
                    onCellValueChanged={onCellValueChanged}
                    loadingOverlayComponent="Loading members..."
                    noRowsOverlayComponent="No members found"
                />
            </div>

            {/* Footer */}
            {members?.length > 0 && (
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>Last updated: {new Date().toLocaleString()}</span>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${editingMode ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                            {editingMode ? 'Editing mode' : 'Live data'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembersTable;