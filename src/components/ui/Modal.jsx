import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Animated from '@/components/common/Animated';
import { CloseIcon } from '@/icons';

const Modal = ({
  isOpen,
  description = '',
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  closeOnOutsideClick = true,
  headerIcon = null
}) => {
  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (
        closeOnOutsideClick &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        handleClose();
      }
    },
    [closeOnOutsideClick, handleClose]
  );

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-99999  flex items-center justify-center bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm p-3"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <Animated
        ref={modalRef}
        animation="zoom-in"
        className={`relative w-full ${maxWidth} bg-white dark:bg-gray-800 rounded-lg shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-2 p-4 border-b shadow border-gray-200 dark:border-gray-700">

          {headerIcon &&
            <div className="shrink-0">
              {headerIcon}
            </div>
          }
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {title}
              </h2>
              {description && (
                <p className="text-sm text-gray-800 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="absolute top-1 right-1 z-10 bg-red-50 border-red-200 hover:bg-red-100 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm text-white shadow-2xl p-1 transition-all duration-300 hover:scale-110 border rounded-full"
            >
              <CloseIcon className=" text-red-400" />
            </button>
          </div>

        </div>

        {/* Content */}
        <div className="p-6 text-gray-700 dark:text-gray-300 max-h-[70vh] overflow-y-auto">{children}</div>
      </Animated>
    </div>,
    document.body
  );
};

export default Modal;
