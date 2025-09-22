import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Global variable to track active toast ID
let activeToastId = null;

const dismissActiveToast = () => {
  if (activeToastId !== null) {
    toast.dismiss(activeToastId);
    activeToastId = null;
  }
};

const showToast = (message, type = 'default', options = {}) => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    ...options,
  };

  // Dismiss any existing toast
  dismissActiveToast();

  const toastHandlers = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warning,
    default: toast,
  };

  const toastHandler = toastHandlers[type];
  const toastId = toastHandler(message, toastOptions);
  activeToastId = toastId;
  return toastId;
};

const dismissToast = () => {
  dismissActiveToast();
};

// Export as utility functions
export { showToast, dismissToast };

// Or as a single object export
export default {
  show: showToast,
  dismiss: dismissToast,
};
