import toast from 'react-hot-toast';

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
      position: 'top-center',
      duration: 5000,
      ...options,
    };

    this.dismissActiveToast();

    const toastHandlers = {
      success: toast.success,
      error: toast.error,
      loading: toast.loading,
      default: toast,
    };

    const toastHandler = toastHandlers[type] || toast;
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

  loading(message, options) {
    return this.showToast(message, 'loading', options);
  }

  default(message, options) {
    return this.showToast(message, 'default', options);
  }

  dismiss() {
    this.dismissActiveToast();
  }

  promise(promise, messages, options = {}) {
    this.dismissActiveToast();
    const toastId = toast.promise(
      promise,
      {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Error occurred',
      },
      { position: 'top-right', ...options }
    );
    this.activeToastId = toastId;
    return toastId;
  }
}

export const Toast = new ToastService();
