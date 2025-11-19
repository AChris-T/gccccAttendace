import toast from 'react-hot-toast';

class ToastService {
  activeToastId = null;

  // ---- Helpers ----
  dismissActiveToast() {
    if (this.activeToastId) {
      toast.dismiss(this.activeToastId);
      this.activeToastId = null;
    }
  }

  getHandler(type) {
    const map = {
      success: toast.success,
      error: toast.error,
      loading: toast.loading,
      default: toast,
    };
    return map[type] || map.default;
  }

  // ---- Core Toast ----
  showToast(message, type = 'default', options = {}) {
    this.dismissActiveToast();

    const handler = this.getHandler(type);

    const toastId = handler(message, {
      position: 'top-center',
      duration: 5000,
      ...options,
    });

    this.activeToastId = toastId;
    return toastId;
  }

  // ---- Convenience methods ----
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
}

export const Toast = new ToastService();
