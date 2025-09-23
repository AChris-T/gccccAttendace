import { Toast } from '../lib/toastify';

export const getErrorDetails = (error) => ({
  status: error.response?.status,
  message:
    error.response?.data?.message ||
    error.response?.data?.data?.message ||
    error.message,
  error: error.response?.data || error,
});

export const handleApiError = (error, showToastError = true) => {
  const errorDetails = getErrorDetails(error);

  if (showToastError) {
    Toast.error(errorDetails.message);
  }

  return errorDetails;
};
