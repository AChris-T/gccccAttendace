
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { useFirstTimerStore } from "../../../store/firstTimer.store";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Badge from '../../ui/Badge';
import { Link } from "react-router-dom";
import Button from '../../ui/Button';

ModuleRegistry.registerModules([AllCommunityModule]);

const FirstTimersTable = () => {
    const { fetchFirstTimers, loading, error, firstTimers, updateFirstTimer } = useFirstTimerStore();
    const gridRef = useRef(null);
    const [editingMode, setEditingMode] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [changedRows, setChangedRows] = useState(new Map());

    useEffect(() => {
        fetchFirstTimers();
    }, [fetchFirstTimers]);

    // Custom Date Cell Editor Component to fix date preservation issue
    const CustomDateCellEditor = useCallback((props) => {
        const { value, onValueChange, eventKey, charPress } = props;
        const inputRef = useRef(null);
        const [currentValue, setCurrentValue] = useState('');

        useEffect(() => {
            // Format existing date value properly
            if (value) {
                let dateValue = value;
                if (typeof value === 'string') {
                    // Handle different date formats
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

    // Default column configuration with editing capabilities
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
    }), [editingMode]);

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

    // Editable cell renderer for follow-up status
    const EditableStatusRenderer = useCallback(({ value, data, node }) => {
        if (!editingMode) {
            return <BadgeRenderer value={value} />;
        }

        const statusOptions = [
            { title: 'Contacted', color: 'green' },
            { title: 'Not Contacted', color: 'red' },
            { title: 'Integrated', color: 'blue' },
            { title: 'Visiting', color: 'yellow' },
            { title: 'Opt-out', color: 'gray' },
            { title: 'Invited Again', color: 'purple' },
            { title: 'Second Timer', color: 'orange' },
            { title: 'Third Timer', color: 'pink' },
            { title: 'Fourth Timer', color: 'indigo' },
            { title: 'Unknown', color: 'gray' }
        ];

        return (
            <select
                value={value?.title || ''}
                onChange={(e) => {
                    const newStatus = statusOptions.find(opt => opt.title === e.target.value);
                    const updatedData = { ...data, follow_up_status: newStatus };

                    // Update the node data
                    node.setData(updatedData);

                    // Track changes
                    setChangedRows(prev => new Map(prev.set(data.id, updatedData)));
                    setHasChanges(true);
                }}
                className="w-full p-2 border border-gray-300 rounded text-xs"
            >
                <option value="">Select Status</option>
                {statusOptions.map(option => (
                    <option key={option.title} value={option.title}>
                        {option.title}
                    </option>
                ))}
            </select>
        );
    }, [editingMode]);

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
            field: "phone_number",
            headerName: "Phone Number",
            width: 130,
            cellEditor: 'agTextCellEditor',
        },
        {
            field: "date_of_visit",
            headerName: "Date of Visit",
            width: 120,
            cellEditor: CustomDateCellEditor,
            valueFormatter: dateValueFormatter,
        },
        {
            field: "invited_by",
            headerName: "Invited By",
            width: 130,
            cellEditor: 'agTextCellEditor',
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
            cellRenderer: EditableStatusRenderer,
            width: 140,
            filter: false,
            editable: false,
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
            field: "notes",
            headerName: "Notes",
            width: 200,
            cellClass: 'text-wrap',
            autoHeight: true,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true,
            cellEditorParams: {
                maxLength: 500,
                rows: 4,
                cols: 50
            }
        },
        {
            field: "week_ending",
            headerName: "Week Ending",
            width: 120,
            cellEditor: CustomDateCellEditor,
            valueFormatter: dateValueFormatter,
        },
    ], [LinkRenderer, EditableStatusRenderer, memberNameFormatter, CustomDateCellEditor, dateValueFormatter]);

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
        editType: 'fullRow',
        suppressClickEdit: !editingMode,
        stopEditingWhenCellsLoseFocus: true,
    }), [defaultColDef, columnDefs, firstTimers, loading, editingMode]);

    // Event handlers
    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;
    }, []);

    // Enhanced cell value changed handler with better data preservation
    const onCellValueChanged = useCallback((params) => {
        if (!editingMode) return;

        const { data, oldValue, newValue, colDef } = params;

        if (oldValue !== newValue) {
            // Create a deep copy of the original data to preserve unchanged fields
            const originalData = firstTimers.find(item => item.id === data.id);
            const updatedData = {
                ...originalData, // Start with original data
                ...data, // Apply current changes
                [colDef.field]: newValue // Ensure the changed field is updated
            };

            // Track changes with preserved data
            setChangedRows(prev => new Map(prev.set(data.id, updatedData)));
            setHasChanges(true);

            // Add visual indicator for changed rows
            params.node.setRowStyle({ backgroundColor: '#fff3cd' });
        }
    }, [editingMode, firstTimers]);

    // Row data update event to preserve data integrity
    const onRowDataUpdated = useCallback(() => {
        // Ensure changed rows maintain their visual indicators
        if (hasChanges && gridRef.current) {
            gridRef.current.forEachNode(node => {
                if (changedRows.has(node.data.id)) {
                    node.setRowStyle({ backgroundColor: '#fff3cd' });
                }
            });
        }
    }, [hasChanges, changedRows]);

    // Toggle editing mode with improved state management
    const toggleEditingMode = useCallback(() => {
        if (editingMode && hasChanges) {
            const confirm = window.confirm('You have unsaved changes. Do you want to save them?');
            if (confirm) {
                handleSaveChanges();
                return;
            } else {
                // Reset changes and refresh data
                setChangedRows(new Map());
                setHasChanges(false);
                // Remove visual indicators
                gridRef.current?.forEachNode(node => {
                    node.setRowStyle(null);
                });
                fetchFirstTimers();
            }
        }
        setEditingMode(prev => !prev);
    }, [editingMode, hasChanges]);

    // Enhanced save changes function
    const handleSaveChanges = useCallback(async () => {
        if (!hasChanges || changedRows.size === 0) return;

        try {
            const updates = Array.from(changedRows.values());
            console.log(updates)

            // Individual updates with proper error handling
            // const updatePromises = updates.map(async (updatedRow) => {
            //     try {
            //         await updateFirstTimer(updatedRow.id, updatedRow);
            //         return { success: true, id: updatedRow.id };
            //     } catch (error) {
            //         console.error(`Failed to update row ${updatedRow.id}:`, error);
            //         return { success: false, id: updatedRow.id, error };
            //     }
            // });

            // const results = await Promise.allSettled(updatePromises);
            // const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
            // const failed = results.filter(r => r.status === 'rejected' || !r.value.success);

            // if (failed.length > 0) {
            //     alert(`${successful.length} records updated successfully. ${failed.length} failed to update.`);
            // } else {
            //     alert('All changes saved successfully!');
            // }

            // // Clear changes and refresh
            // setChangedRows(new Map());
            // setHasChanges(false);
            // setEditingMode(false);

            // // Remove visual indicators
            // gridRef.current?.forEachNode(node => {
            //     node.setRowStyle(null);
            // });

            // // Refresh data
            // fetchFirstTimers();

        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes. Please try again.');
        }
    }, [hasChanges, changedRows, updateFirstTimer, fetchFirstTimers]);

    // Cancel changes
    const handleCancelChanges = useCallback(() => {
        setChangedRows(new Map());
        setHasChanges(false);
        setEditingMode(false);

        // Remove visual indicators and refresh data
        gridRef.current?.forEachNode(node => {
            node.setRowStyle(null);
        });

        fetchFirstTimers();
    }, [fetchFirstTimers]);

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Error loading data</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                    <button
                        onClick={() => fetchFirstTimers()}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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
            <div className="">
                <p className="text-sm text-gray-600">
                    {firstTimers?.length || 0} records found
                    {hasChanges && (
                        <span className="ml-2 text-amber-600 font-medium">
                            • {changedRows.size} unsaved changes
                        </span>
                    )}
                </p>
                <div className="flex w-full gap-5 my-4">
                    {/* Editing controls */}
                    {editingMode ? (
                        <>
                            <Button
                                variant='success'
                                className='rounded px-5'
                                onClick={handleSaveChanges}
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
                        onClick={() => fetchFirstTimers()}
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
                            Click on cells to edit • Changed rows are highlighted
                        </span>
                    </div>
                </div>
            )}

            {/* AG Grid Table */}
            <div
                className="ag-theme-alpine border border-gray-200 rounded-lg shadow-sm overflow-x-auto"
                style={{ width: "100%", height: "1000px" }}
            >
                <AgGridReact
                    ref={gridRef}
                    {...gridOptions}
                    onGridReady={onGridReady}
                    onCellValueChanged={onCellValueChanged}
                    onRowDataUpdated={onRowDataUpdated}
                    loadingOverlayComponent="Loading..."
                    noRowsOverlayComponent="No first timers found"
                />
            </div>

            {/* Footer */}
            {firstTimers?.length > 0 && (
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>Last updated: {new Date().toLocaleString()}</span>
                    <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${editingMode ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                        {editingMode ? 'Editing mode' : 'Live data'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default FirstTimersTable;