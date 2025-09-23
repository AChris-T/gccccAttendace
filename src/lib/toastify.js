// utils/toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let activeToastId = null;

const dismissActiveToast = () => {
  if (activeToastId !== null) {
    toast.dismiss(activeToastId);
    activeToastId = null;
  }
};

const createToastMethod =
  (toastType) =>
  (message, options = {}) => {
    const defaultOptions = {
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

    // Get the appropriate toast method
    const toastMethod = toast[toastType] || toast;

    // Show the toast and store its ID
    const toastId = toastMethod(message, defaultOptions);
    activeToastId = toastId;

    return toastId;
  };

// Create the Toast object with all methods
export const Toast = {
  success: createToastMethod('success'),
  error: createToastMethod('error'),
  info: createToastMethod('info'),
  warning: createToastMethod('warning'),
  warn: createToastMethod('warning'), // Alias for warning
  default: createToastMethod('default'),

  // Additional utility methods
  dismiss: () => {
    dismissActiveToast();
  },

  dismissAll: () => {
    toast.dismiss();
    activeToastId = null;
  },

  // For backwards compatibility
  show: (message, type = 'default', options = {}) => {
    return Toast[type]
      ? Toast[type](message, options)
      : Toast.default(message, options);
  },
};

// Named export for backwards compatibility
export const showToast = Toast.show;
export const dismissToast = Toast.dismiss;
