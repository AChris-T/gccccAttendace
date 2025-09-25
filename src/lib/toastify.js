import { toast } from 'react-toastify';

class ToastService {
  constructor() {
    this.activeToastId = null;
  }

  dismissActiveToast() {
    if (this.activeToastId !== null) {
      toast.dismiss(this.activeToastId);
      this.activeToastId = null;
    }
  }

  showToast(message, type = 'default', options = {}) {
    const toastOptions = {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      ...options,
    };

    this.dismissActiveToast();

    const toastHandlers = {
      success: toast.success,
      error: toast.error,
      info: toast.info,
      warning: toast.warning,
      default: toast,
    };

    const toastHandler = toastHandlers[type];
    const toastId = toastHandler(message, toastOptions);
    this.activeToastId = toastId;
    return toastId;
  }

  success(message, options) {
    return this.showToast(message, 'success', options);
  }

  error(message, options) {
    return this.showToast(message, 'error', options);
  }

  info(message, options) {
    return this.showToast(message, 'info', options);
  }

  warning(message, options) {
    return this.showToast(message, 'warning', options);
  }

  default(message, options) {
    return this.showToast(message, 'default', options);
  }

  dismiss() {
    this.dismissActiveToast();
  }
}

export const Toast = new ToastService();
