import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Button from '@/components/ui/Button';
import Message from '@/components/common/Message';
import { TableSkeletonLoader } from '@/components/skeleton';
import { ExpandFullScreenIcon, TrashIcon, EditIcon } from '@/icons';
import {
  useAttendanceRecords,
  useDeleteAttendanceRecords,
} from '@/queries/attendancerecord.query';
import CreateAttendanceRecord from './CreateAttendanceRecord';
import EditAttendanceRecord from './EditAttendanceRecord';
import {
  useDeleteConfirmation,
  DeleteConfirmation,
} from '@/components/ui/DeleteConfirmation';

ModuleRegistry.registerModules([AllCommunityModule]);

const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 100;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 800;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const AttendanceTable = () => {
  const { data, isLoading, refetch, isError, error, isFetching } =
    useAttendanceRecords();
  const deleteRecords = useDeleteAttendanceRecords({
    onSuccess: () => {
      deleteConfirmation.close();
      refetch();
    },
  });
  const gridRef = useRef(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const deleteConfirmation = useDeleteConfirmation();

  // Extract the data safely
  const attendanceData = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [];
  }, [data]);

  // Dynamic table height
  const tableHeight = useMemo(() => {
    if (attendanceData.length === 0) return MIN_TABLE_HEIGHT;
    const contentHeight =
      attendanceData.length * ROW_HEIGHT + HEADER_HEIGHT + PAGINATION_HEIGHT;
    return Math.min(
      Math.max(contentHeight, MIN_TABLE_HEIGHT),
      MAX_TABLE_HEIGHT
    );
  }, [attendanceData.length]);

  // Default column definition
  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
      floatingFilter: true,
      editable: false,
      minWidth: 100,
    }),
    []
  );

  // Date formatter
  const dateFormatter = useCallback((params) => {
    if (!params.value) return '';
    const date = new Date(params.value);
    if (isNaN(date)) return params.value;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  // Column definitions
  const columnDefs = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        pinned: 'left',
        cellClass: 'font-medium',
      },
      { field: 'service_day_desc', headerName: 'Service Day', pinned: 'left' },
      {
        field: 'service_date',
        headerName: 'Service Date',
        valueFormatter: dateFormatter,
      },
      { field: 'male', headerName: 'Male' },
      { field: 'female', headerName: 'Female' },
      { field: 'children', headerName: 'Children' },
      {
        field: 'total_attendance',
        headerName: 'Total Attendance',
        cellClass: 'font-semibold text-blue-600',
      },
      {
        field: 'created_at',
        headerName: 'Created At',
        valueFormatter: dateFormatter,
      },
      {
        headerName: 'Actions',
        field: 'id',
        pinned: 'right',
        width: 150,
        cellRenderer: (params) => {
          const rowData = params.data;

          return (
            <div className="flex items-center justify-center w-full h-full gap-3 py-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingRecord(rowData);
                }}
                className="p-1 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
                title="Edit record"
              >
                <EditIcon className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(rowData.id);
                }}
                className="p-1 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"
                title="Delete record"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    [dateFormatter, deleteRecords, refetch]
  );

  // Grid options
  const gridOptions = useMemo(
    () => ({
      pagination: true,
      paginationPageSize: DEFAULT_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZES,
      animateRows: true,
      rowSelection: 'multiple',
      suppressRowDeselection: false,
      rowMultiSelectWithClick: true,
      enableCellTextSelection: true,
      ensureDomOrder: true,
    }),
    []
  );

  // Auto-size columns
  const autoSizeColumns = useCallback(() => {
    if (!gridRef.current) return;
    const allColumns =
      gridRef.current.getColumns?.() ||
      gridRef.current.getAllDisplayedColumns?.();
    if (!allColumns) return;
    const ids = allColumns.map((c) => c.getColId());
    gridRef.current.autoSizeColumns(ids, false);
  }, []);

  const onGridReady = useCallback(
    (params) => {
      gridRef.current = params.api;
      setIsGridReady(true);
      setTimeout(autoSizeColumns, 100);
    },
    [autoSizeColumns]
  );

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;
    const selectedRows = gridRef.current.getSelectedRows();
    setSelectedRows(selectedRows);
  }, []);

  useEffect(() => {
    if (isGridReady && attendanceData.length > 0) {
      setTimeout(autoSizeColumns, 150);
    }
  }, [attendanceData, isGridReady, autoSizeColumns]);

  // Export CSV
  const handleExportCSV = useCallback(() => {
    if (!gridRef.current) return;
    const timestamp = new Date().toISOString().split('T')[0];
    gridRef.current.exportDataAsCsv({
      fileName: `attendance-report-${timestamp}.csv`,
    });
  }, []);

  // Refresh
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Delete multiple records
  const handleDeleteSelected = useCallback(() => {
    if (selectedRows.length === 0) return;
    const ids = selectedRows.map((row) => row.id);
    deleteConfirmation.open(ids);
  }, [selectedRows, deleteConfirmation]);

  // Handle single record delete
  const handleDelete = useCallback(
    (id) => {
      deleteConfirmation.open([id]);
    },
    [deleteConfirmation]
  );

  // Confirm delete
  const confirmDelete = useCallback(() => {
    if (deleteConfirmation.itemToDelete) {
      deleteRecords.mutate(deleteConfirmation.itemToDelete);
    }
  }, [deleteConfirmation.itemToDelete, deleteRecords]);

  // Error handling
  if (isError) {
    return (
      <Message
        className="max-w-md"
        variant="error"
        data={error?.data}
        actionButton={
          <Button
            variant="outline-danger"
            onClick={handleRefresh}
            className="mt-2"
            loading={isFetching}
          >
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CreateAttendanceRecord onSuccess={refetch} />
      </div>

      <div className="w-full mt-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-green-600 dark:text-green-400">
            <span className="font-semibold text-green-500 dark:text-green-500">
              {attendanceData.length}
            </span>{' '}
            record{attendanceData.length !== 1 ? 's' : ''} found
          </p>
          {selectedRows.length > 0 && (
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <span className="font-semibold">{selectedRows.length}</span>{' '}
              record
              {selectedRows.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-between w-full gap-3">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={handleExportCSV}
              disabled={!attendanceData.length || isLoading}
            >
              Export CSV
            </Button>
            <Button
              variant="ghost"
              onClick={handleRefresh}
              loading={isFetching}
              disabled={isLoading}
            >
              Refresh
            </Button>
            {/*     {selectedRows.length > 0 && (
              <Button
                variant="outline-danger"
                onClick={handleDeleteSelected}
                loading={deleteRecords.isPending}
                disabled={isLoading}
              >
                <TrashIcon className="w-4 h-4 md:h-5 md:w-5" />
                Delete Selected ({selectedRows.length})
              </Button>
            )} */}
          </div>
          <Button
            variant="light"
            onClick={autoSizeColumns}
            disabled={!attendanceData.length || isLoading}
          >
            <ExpandFullScreenIcon className="w-4 h-4 md:h-5 md:w-5" />
          </Button>
        </div>

        {/* Table */}
        {isLoading && !attendanceData.length ? (
          <TableSkeletonLoader />
        ) : (
          <div
            className="overflow-hidden border border-gray-200 rounded-lg shadow-sm ag-theme-alpine dark:border-gray-700"
            style={{ width: '100%', height: `${tableHeight}px` }}
          >
            <AgGridReact
              ref={gridRef}
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              rowData={attendanceData}
              gridOptions={gridOptions}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
            />
          </div>
        )}

        {/* Footer */}
        {attendanceData.length > 0 && (
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Last updated: {new Date().toLocaleString()}</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-medium text-green-600 dark:text-green-400">
                Live data
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onConfirm={confirmDelete}
        onCancel={deleteConfirmation.close}
        isLoading={deleteRecords.isLoading}
        title="Delete Record?"
        message="Are you sure you want to delete this record? This action cannot be undone."
        confirmText={deleteRecords.isLoading ? 'Deleting...' : 'Delete Record'}
      />

      {/* Edit Record Modal */}
      {editingRecord && (
        <EditAttendanceRecord
          key={editingRecord?.id} // Force re-render when editing a different record
          isOpen={!!editingRecord}
          onClose={() => setEditingRecord(null)}
          record={editingRecord}
          onSuccess={(updatedRecord) => {
            // Update the local state with the updated record
            if (updatedRecord) {
              setEditingRecord(updatedRecord);
            }
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default AttendanceTable;
