import dayjs from 'dayjs';

export function downloadCSV(data, filename = 'data.csv') {
  if (!data || data.length === 0) {
    return;
  }

  // Extract headers from keys of the first object
  const headers = Object.keys(data[0]);

  // Convert rows
  const csvRows = [
    headers.join(','), // header row
    ...data.map((row) =>
      headers
        .map((field) => {
          let val = row[field] ?? '';
          // Escape quotes and commas properly
          if (typeof val === 'string') {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(',')
    ),
  ];

  // Create blob and download
  const blob = new Blob([csvRows.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export const formatDisplayDate = (date) => dayjs(date).format('DD MMM, YYYY');
export const getErrorMessage = (
  error,
  defaultMessage = 'Something went wrong'
) => {
  return error?.response?.data?.message || defaultMessage;
};
// Format header labels into a clean, readable format
const formatHeaderLabel = (key) => {
  return key
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

// Format cell values consistently
const formatCellValue = (value) => {
  if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '-';
  if (value === null || value === undefined || value === '') return '-';

  // Handle date strings like "2025-09-16 07:38:45"
  if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
    return new Date(value).toLocaleDateString();
  }

  return value;
};
// Utility to generate dynamic table headers and values
export const generateDynamicColumns = (data) => {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0]).map((key) => ({
    key,
    label: formatHeaderLabel(key),
    render: (row) => formatCellValue(row[key]),
  }));
};
