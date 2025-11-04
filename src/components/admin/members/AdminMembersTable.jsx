import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Link } from "react-router-dom";
import { useMembers } from '@/queries/member.query';
import Button from '@/components/ui/Button';
import Message from '@/components/common/Message';
import { TableSkeletonLoader } from '@/components/skeleton';
import { ExpandFullScreenIcon, FilterIcon } from '@/icons';
import CreateMembers from '@/components/admin/members/CreateMembers';
import EditMembersPanel from '@/components/admin/members/MembersFilterPanel';
import DeleteMembers from '@/components/admin/members/DeleteMembers';
import ButtonSwitch from '@/components/ui/ButtonSwitch';

ModuleRegistry.registerModules([AllCommunityModule]);

const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 200;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 800;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const DEFAULT_FILTERS = {
  date_of_birth: [],
  birth_month: null,
  community: null
};

const AdminMembersTable = () => {
  const gridRef = useRef(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);
  const { data: members, isLoading, refetch, isError, error, isFetching } = useMembers(activeFilters);

  const memberData = useMemo(() => {
    if (!members) return [];
    return Array.isArray(members) ? members : [];
  }, [members]);

  const tableHeight = useMemo(() => {
    if (memberData.length === 0) return MIN_TABLE_HEIGHT;

    const contentHeight = (memberData.length * ROW_HEIGHT) + HEADER_HEIGHT + PAGINATION_HEIGHT;
    return Math.min(Math.max(contentHeight, MIN_TABLE_HEIGHT), MAX_TABLE_HEIGHT);
  }, [memberData.length]);

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

  const LinkRenderer = useCallback(({ value }) => {
    if (!value) return null;
    return (
      <Link
        target="_blank"
        to={`/dashboard/members/${value}`}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
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
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const columnDefs = useMemo(() => [
    {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      pinned: 'left',
      lockPosition: true,
      suppressMenu: true,
      suppressMovable: true,
    },
    {
      field: "id",
      headerName: "ID",
      cellRenderer: LinkRenderer,
      pinned: 'left',
      cellClass: 'font-medium',
      editable: false,
      suppressAutoSize: false,
    },
    {
      field: "full_name",
      headerName: "Name",
      pinned: 'left',
      cellClass: 'font-medium',
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
    },
    {
      field: "email",
      headerName: "Email",
      cellClass: 'text-blue-600 dark:text-blue-400',
    },
    {
      field: "gender",
      headerName: "Gender",
    },
    {
      field: "address",
      headerName: "Address",
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      valueFormatter: dateValueFormatter,
    },
    {
      field: "community",
      headerName: "Community",
    },
    {
      field: "worker",
      headerName: "Worker",
    },
  ], [LinkRenderer, dateValueFormatter]);

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
    rowMultiSelectWithClick: false,
    enableFillHandle: true,
    enableCellTextSelection: true,
    ensureDomOrder: true,
  }), []);

  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) return;

    const selectedRows = gridRef.current.getSelectedRows();
    const ids = selectedRows.map(row => row.id).filter(Boolean);
    setSelectedIds(ids);
  }, []);

  const handleClearSelection = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.deselectAll();
    }
    setSelectedIds([]);
  }, []);

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
    if (isGridReady && memberData.length > 0) {
      setTimeout(() => {
        autoSizeColumns();
      }, 150);
    }
  }, [memberData, isGridReady, autoSizeColumns]);

  const handleExportCSV = useCallback(() => {
    if (!gridRef.current) return;

    const timestamp = new Date().toISOString().split('T')[0];
    gridRef.current.exportDataAsCsv({
      fileName: `members-report-${timestamp}.csv`,
      onlySelected: selectedIds.length > 0,
    });
  }, [selectedIds]);

  const handleRefresh = useCallback(() => {
    refetch();
    handleClearSelection();
  }, [refetch, handleClearSelection]);

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

  const hasActiveFilters = useMemo(() =>
    activeFilters.birth_month ||
    activeFilters.date_of_birth?.length > 0 ||
    activeFilters.community
    , [activeFilters]);


  if (isError) {
    return (
      <Message
        className={'max-w-md'}
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
    <>
      <div className="w-full space-y-10">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <ButtonSwitch
            onChange={handleToggleFilter}
            checked={showFilter}
            color="pink"
            type='button'
            icon={<FilterIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
            description="Filter church members data"
          >
            Filter
          </ButtonSwitch>
          <CreateMembers />
        </div>

        {showFilter &&
          <div className='max-w-xl p-4 dark:bg-gray-800 bg-white shadow rounded-lg'>
            <EditMembersPanel
              initialFilters={activeFilters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              loading={isFetching}
            />
          </div>
        }

        <div className="space-y-3">
          {/* Header Section */}
          <div className="flex items-center gap-5 flex-wrap">
            <p className="text-sm text-green-600 dark:text-green-400">
              <span className="font-semibold text-green-500 dark:text-green-500">
                {memberData.length}
              </span>
              {' '}Record{memberData.length !== 1 ? 's' : ''} found
            </p>

            {hasActiveFilters && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                Filtered
              </span>
            )}

            {selectedIds.length > 0 && (
              <p className="text-sm text-blue-600 dark:text-blue-400">
                <span className="font-semibold">
                  {selectedIds.length}
                </span>
                {' '}Selected
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-between w-full">
            <div className='flex flex-wrap gap-3'>
              <Button
                variant='primary'
                onClick={handleExportCSV}
                disabled={!memberData.length || isLoading}
              >
                {selectedIds.length > 0
                  ? `Export Selected (${selectedIds.length})`
                  : 'Export CSV'}
              </Button>
              <Button
                variant='ghost'
                onClick={handleRefresh}
                loading={isFetching}
                disabled={isLoading}
              >
                Refresh
              </Button>

              {selectedIds.length > 0 &&
                <DeleteMembers selectedIds={selectedIds}
                  onClearSelection={handleClearSelection} />
              }
            </div>
            <div>
              <Button
                variant='light'
                onClick={autoSizeColumns}
                disabled={!memberData.length || isLoading}
              >
                <ExpandFullScreenIcon className='h-4 w-4 md:h-5 md:w-5' />
              </Button>
            </div>
          </div>

          {isLoading && !memberData.length ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <div
                className={`ag-theme-alpine border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-colors`}
                style={{ width: "100%", height: `${tableHeight}px` }}
              >
                <AgGridReact
                  ref={gridRef}
                  defaultColDef={defaultColDef}
                  columnDefs={columnDefs}
                  rowData={memberData}
                  gridOptions={gridOptions}
                  onGridReady={onGridReady}
                  onSelectionChanged={onSelectionChanged}
                  suppressLoadingOverlay={false}
                  suppressNoRowsOverlay={false}
                  overlayLoadingTemplate={`
                                    <div class="flex items-center justify-center h-full">
                                        <div class="text-center">
                                            <div class="relative inline-block">
                                                <div class="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                                                <div class="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                                            </div>
                                            <p class="text-gray-700 mt-4 font-medium">Loading members...</p>
                                        </div>
                                    </div>
                                `}
                  overlayNoRowsTemplate={`
                                    <div class="flex items-center justify-center h-full bg-white">
                                        <div class="text-center py-8">
                                            <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <p class="text-gray-500 text-lg font-medium mb-2">
                                                No members found
                                            </p>
                                            <p class="text-gray-400 text-sm">
                                                Members will appear here once available
                                            </p>
                                        </div>
                                    </div>
                                `}
                />
              </div>

              {/* Footer with Dark Mode Support */}
              {memberData.length > 0 && (
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMembersTable;