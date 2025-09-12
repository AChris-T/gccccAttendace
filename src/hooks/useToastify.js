import { toast } from 'react-toastify';
import { useCallback, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const useToastify = () => {
  const activeToastIdRef = useRef(null);

  const dismissActiveToast = useCallback(() => {
    if (activeToastIdRef.current !== null) {
      toast.dismiss(activeToastIdRef.current);
      activeToastIdRef.current = null;
    }
  }, []);

  const showToast = useCallback(
    (message, type = 'default', options = {}) => {
      const toastOptions = {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        ...options,
      };

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
      activeToastIdRef.current = toastId;
      return toastId;
    },
    [dismissActiveToast]
  );

  const dismiss = useCallback(() => {
    dismissActiveToast();
  }, [dismissActiveToast]);

  return {
    showToast,
    dismiss,
  };
};

export default useToastify;
