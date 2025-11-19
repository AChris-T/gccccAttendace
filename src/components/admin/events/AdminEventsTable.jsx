import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Button from '@/components/ui/Button';
import { useGetAllEvent } from '@/queries/events.query';

ModuleRegistry.registerModules([AllCommunityModule]);

const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 25;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 900;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const AdminEventsTable = () => {
  const gridRef = useRef(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: apiRegistrations, refetch } = useGetAllEvent();

  const registrationData = useMemo(() => {
    if (!apiRegistrations?.data) return [];

    return apiRegistrations.data.map((p) => ({
      id: p.id,
      event: p.event,
      total: Number(p.total),
      feeding: p.feeding ? 'Yes' : 'No',
      feedingCost: p.feeding_cost,
      accommodation: p.accommodation ? 'Yes' : 'No',
      couples: p.couples ? 'Yes' : 'No',
      accommodationCost: p.couples_cost || '0.00',
      transportCost: p.transport_cost,
      transportation: `${p.transportation?.fro ? 'Fro' : ''} ${
        p.transportation?.to ? 'To' : ''
      }`.trim(),
      numDays: p.num_days,
      nights: p.nights,
      selectedDates: p.selected_dates?.join(', ') || '',
      status: p.transactions?.[0]?.status || 'N/A',
      paymentMethod: p.transactions?.[0]?.payment_method || 'N/A',
      reference: p.transactions?.[0]?.transaction_reference || 'N/A',
      paidAmount: Number(p.transactions?.[0]?.amount || 0),
      paymentDate: p.transactions?.[0]?.created_at,
      userName: `${p.user?.first_name || ''} ${p.user?.last_name || ''}`,
      userEmail: p.user?.email || 'No email',
      interestedInServing: p.interested_in_serving ? 'Yes' : 'No',
      integratedIntoUnit: p.integrated_into_a_unit ? 'Yes' : 'No',
      specifyUnit: p.specify_unit || '-',
      isStudent: p.is_student ? 'Yes' : 'No',
      institution: p.institution || '-',
    }));
  }, [apiRegistrations]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch().finally(() => setIsRefreshing(false));
  }, [refetch]);

  const tableHeight = useMemo(() => {
    if (registrationData.length === 0) return MIN_TABLE_HEIGHT;
    const contentHeight =
      registrationData.length * ROW_HEIGHT + HEADER_HEIGHT + PAGINATION_HEIGHT;
    return Math.min(
      Math.max(contentHeight, MIN_TABLE_HEIGHT),
      MAX_TABLE_HEIGHT
    );
  }, [registrationData.length]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
      floatingFilter: true,
      editable: false,
      minWidth: 100,
      autoHeaderHeight: true,
      wrapHeaderText: true,
    }),
    []
  );

  const amountValueFormatter = useCallback(
    (params) =>
      params.value === undefined || params.value === null
        ? '₦0'
        : `₦${Number(params.value).toLocaleString()}`,
    []
  );

  const dateValueFormatter = useCallback((params) => {
    if (!params.value) return '';
    const date = new Date(params.value);
    return isNaN(date.getTime()) ? params.value : date.toLocaleString();
  }, []);

  const StatusRenderer = useCallback((params) => {
    const value = params.value?.toLowerCase();
    const config = {
      success: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-400',
        dot: 'bg-green-500',
      },
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-800 dark:text-yellow-500',
        dot: 'bg-yellow-500',
      },
      failed: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-800 dark:text-red-400',
        dot: 'bg-red-500',
      },
    }[value] || {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-800 dark:text-gray-300',
      dot: 'bg-gray-500',
    };

    return (
      <div className="flex items-center justify-center">
        <span
          className={`inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
        >
          <span className={`w-2 h-2 mr-1 rounded-full ${config.dot}`}></span>
          {params.value}
        </span>
      </div>
    );
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        field: 'reference',
        headerName: 'Reference',
        maxWidth: 150,
        pinned: 'left',
        cellClass: 'text-blue-600 dark:text-blue-400 underline',
      },
      {
        field: 'userName',
        headerName: 'User Name',
        minWidth: 120,
        pinned: 'left',
      },
      { field: 'userEmail', headerName: 'Email', minWidth: 200 },
      { field: 'event', headerName: 'Event', minWidth: 180 },
      { field: 'feeding', headerName: 'Feeding', minWidth: 100 },
      {
        field: 'feedingCost',
        headerName: 'Feeding Cost',
        valueFormatter: amountValueFormatter,
      },
      { field: 'accommodation', headerName: 'Accommodation', minWidth: 120 },
      { field: 'couples', headerName: 'Couples', minWidth: 100 },
      { field: 'transportation', headerName: 'Transport', minWidth: 120 },

      { field: 'numDays', headerName: 'Days', minWidth: 80 },
      { field: 'nights', headerName: 'Nights', minWidth: 80 },
      {
        field: 'selectedDates',
        headerName: 'Dates',
        minWidth: 250,
        wrapText: true,
        autoHeight: true,
      },
      {
        field: 'paidAmount',
        headerName: 'Paid Amount',
        valueFormatter: amountValueFormatter,
      },
      { field: 'paymentMethod', headerName: 'Payment Method', minWidth: 120 },
      {
        field: 'paymentDate',
        headerName: 'Payment Date',
        valueFormatter: dateValueFormatter,
      },
      {
        field: 'interestedInServing',
        headerName: 'Interested in Serving',
        minWidth: 150,
      },
      {
        field: 'integratedIntoUnit',
        headerName: 'Integrated into Unit',
        minWidth: 150,
      },
      { field: 'specifyUnit', headerName: 'Specify Unit', minWidth: 150 },
      { field: 'isStudent', headerName: 'Student', minWidth: 100 },
      { field: 'institution', headerName: 'Institution', minWidth: 150 },
      { field: 'status', headerName: 'Status', cellRenderer: StatusRenderer },

      {
        field: 'total',
        headerName: 'Total',
        valueFormatter: amountValueFormatter,
        cellClass: 'text-blue-600 dark:text-blue-400 font-medium ',
      },
    ],
    [amountValueFormatter, dateValueFormatter, StatusRenderer]
  );

  const gridOptions = useMemo(
    () => ({
      pagination: true,
      paginationPageSize: DEFAULT_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZES,
      animateRows: true,
    }),
    []
  );

  const autoSizeColumns = useCallback(() => {
    if (!gridRef.current) return;
    const allColumns =
      gridRef.current.getAllDisplayedColumns?.() ||
      gridRef.current.getColumns?.();
    if (!allColumns?.length) return;
    const allColumnIds = allColumns.map((col) => col.getColId());
    gridRef.current.autoSizeColumns(allColumnIds, false);
  }, []);

  const onGridReady = useCallback(
    (params) => {
      gridRef.current = params.api;
      setIsGridReady(true);
      setTimeout(() => autoSizeColumns(), 100);
    },
    [autoSizeColumns]
  );

  useEffect(() => {
    if (isGridReady) setTimeout(() => autoSizeColumns(), 200);
  }, [isGridReady, registrationData, autoSizeColumns]);

  const handleExportCSV = useCallback(() => {
    if (!gridRef.current) return;
    const timestamp = new Date().toISOString().split('T')[0];
    gridRef.current.exportDataAsCsv({
      fileName: `registration-data-${timestamp}.csv`,
    });
  }, []);

  const getRowClass = useCallback((params) => {
    return params.node.rowIndex % 2 === 0
      ? 'bg-gray-50 dark:bg-gray-800'
      : 'bg-white dark:bg-gray-900';
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-3">
        <p className="text-sm text-green-600 dark:text-green-400">
          {registrationData.length} registration
          {registrationData.length !== 1 ? 's' : ''} found
        </p>

        <div className="flex gap-3">
          <Button variant="primary" onClick={handleExportCSV}>
            Download CSV
          </Button>
          <Button
            variant="ghost"
            onClick={handleRefresh}
            loading={isRefreshing}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div
        className="overflow-hidden border border-gray-200 rounded-lg ag-theme-alpine dark:border-gray-700"
        style={{ height: `${tableHeight}px` }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={registrationData}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          getRowClass={getRowClass}
        />
      </div>
    </div>
  );
};

export default AdminEventsTable;
