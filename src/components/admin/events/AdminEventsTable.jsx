import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Button from '@/components/ui/Button';
import {
  AlertTriangleIcon,
  CalendarIcon,
  CalendarIcon2,
  ExpandFullScreenIcon,
  MailIcon,
  UserCheckIcon,
} from '@/icons';
import ModalForm from '@/components/ui/modal/ModalForm';

ModuleRegistry.registerModules([AllCommunityModule]);

const DUMMY_PAYMENTS = Array.from({ length: 50 }, (_, i) => ({
  _id: `pay_${i + 1000}`,
  reference: `ref_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  amount: [5000, 10000, 15000, 20000, 25000][Math.floor(Math.random() * 5)],
  status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)],
  paymentMethod: ['card', 'transfer', 'bank', 'ussd', 'wallet'][
    Math.floor(Math.random() * 5)
  ],
  paymentDate: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString(),
  user: {
    _id: `user_${i + 1}`,
    name: [
      'John Doe',
      'Jane Smith',
      'Michael Johnson',
      'Emily Davis',
      'Robert Wilson',
      'Sarah Brown',
      'David Lee',
      'Jennifer Taylor',
      'James Anderson',
      'Lisa Thomas',
    ][i % 10],
    email: `user${i + 1}@example.com`,
  },
  event: {
    _id: `event_${(i % 3) + 1}`,
    title: ['Annual Conference 2023', 'Tech Summit', 'Leadership Workshop'][
      i % 3
    ],
  },
}));

const PAGINATION_PAGE_SIZES = [25, 50, 100, 200];
const DEFAULT_PAGE_SIZE = 25;
const MIN_TABLE_HEIGHT = 400;
const MAX_TABLE_HEIGHT = 800;
const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 60;

const AdminEventsTable = () => {
  const gridRef = useRef(null);
  const [isGridReady, setIsGridReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const paymentData = useMemo(() => DUMMY_PAYMENTS, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  const handleReferenceClick = useCallback((record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  }, []);

  const tableHeight = useMemo(() => {
    if (paymentData.length === 0) return MIN_TABLE_HEIGHT;
    const contentHeight =
      paymentData.length * ROW_HEIGHT + HEADER_HEIGHT + PAGINATION_HEIGHT;
    return Math.min(
      Math.max(contentHeight, MIN_TABLE_HEIGHT),
      MAX_TABLE_HEIGHT
    );
  }, [paymentData.length]);

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

  const dateValueFormatter = useCallback((params) => {
    if (!params.value) return '';
    const date = new Date(params.value);
    return isNaN(date.getTime())
      ? params.value
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  }, []);

  const amountValueFormatter = useCallback(
    (params) =>
      params.value === undefined || params.value === null
        ? '₦0'
        : `₦${Number(params.value).toLocaleString()}`,
    []
  );

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
          className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
        >
          <span className={`w-2 h-2 mr-1.5 rounded-full ${config.dot}`}></span>
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
        pinned: 'left',
        cellRenderer: (params) => (
          <button
            className="text-blue-600 hover:underline dark:text-blue-400"
            onClick={() => handleReferenceClick(params.data)}
          >
            {params.value}
          </button>
        ),
      },
      {
        field: 'user.name',
        headerName: 'User',
        valueGetter: (params) => params.data?.user?.name || 'N/A',
      },
      {
        field: 'event.title',
        headerName: 'Event',
        valueGetter: (params) => params.data?.event?.title || 'N/A',
      },
      {
        field: 'amount',
        headerName: 'Amount',
        valueFormatter: amountValueFormatter,
      },
      {
        field: 'paymentDate',
        headerName: 'Payment Date',
        valueFormatter: dateValueFormatter,
      },
      {
        field: 'status',
        headerName: 'Status',
        cellRenderer: StatusRenderer,
      },
      {
        field: 'paymentMethod',
        headerName: 'Method',
      },
    ],
    [
      handleReferenceClick,
      amountValueFormatter,
      dateValueFormatter,
      StatusRenderer,
    ]
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
  }, [isGridReady, paymentData, autoSizeColumns]);

  const handleExportCSV = useCallback(() => {
    if (!gridRef.current) return;
    const timestamp = new Date().toISOString().split('T')[0];
    gridRef.current.exportDataAsCsv({
      fileName: `event-payments-${timestamp}.csv`,
    });
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 ">
        <p className="text-sm text-green-600 dark:text-green-400">
          {paymentData.length} payment{paymentData.length !== 1 ? 's' : ''}{' '}
          found
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

      {/* Table */}
      <div
        className="overflow-hidden border border-gray-200 rounded-lg ag-theme-alpine dark:border-gray-700"
        style={{ height: `${tableHeight}px` }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={paymentData}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
        />
      </div>

      {/* Beautiful Modal */}
      {isModalOpen && selectedRecord && (
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Payment Details"
        >
          <div className="space-y-6 rounded-lg bg-gray-50 dark:bg-gray-900/20">
            {/* Reference */}
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reference:{' '}
                <span className="text-blue-600">
                  {selectedRecord.reference}
                </span>
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedRecord.status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : selectedRecord.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedRecord.status}
              </span>
            </div>

            {/* User Section */}
            <div>
              <h4 className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
                User Information
              </h4>
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <UserCheckIcon className="w-4 h-4 text-blue-500" />
                  <span>{selectedRecord.user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-blue-500" />
                  <span>{selectedRecord.user.email}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h4 className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
                Payment Information
              </h4>
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon2 className="w-4 h-4 text-purple-500" />
                  <span>₦{selectedRecord.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangleIcon className="w-4 h-4 text-purple-500" />
                  <span>{selectedRecord.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-purple-500" />
                  <span>
                    {new Date(selectedRecord.paymentDate).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div>
              <h4 className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
                Event Details
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <span>{selectedRecord.event.title}</span>
              </div>
            </div>
          </div>
        </ModalForm>
      )}
    </div>
  );
};

export default AdminEventsTable;
