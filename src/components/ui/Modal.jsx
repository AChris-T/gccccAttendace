import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg", actionButton, displayFooter = true }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        style={{ backdropFilter: "blur(1.5px)" }}
        className="fixed inset-0 z-[1000000] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className="fixed inset-0 bg-opacity-50 transition-opacity  h-full w-full bg-gray-400/50 backdrop-blur-[32px]" />
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ translateY: -50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1, transition: { delay: 0.1 } }}
          exit={{ translateY: -50, opacity: 0 }}
        >
          {/* Modal container */}
          <div
            ref={modalRef}
            className={`relative z-50 ${maxWidth} w-full bg-white rounded-lg shadow-xl transform transition-all`}
          >
            {/* Modal header */}

            <div className="p-[10px] border-b border-gray-100 flex justify-end items-center">
              {/* Close button */}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close"
              >
                <CloseIcon width='24' height="24" />
              </button>
            </div>



            {/* Modal body */}
            <div className="px-6 break-words whitespace-normal max-h-[85vh] overflow-auto">
              {title ?
                <div className="mb-1 text-center">
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                </div>
                : null
              }
              {children}
            </div>

            {/* footer  */}
            {displayFooter ?
              <div className="flex justify-end space-x-2 px-6 py-5">
                {actionButton && actionButton}
                <button
                  onClick={onClose}
                  className="px-4 py-2 border shadow border-gray-300 rounded text-gray-700 hover:bg-gray-100 "
                >
                  Cancel
                </button>
              </div>
              : null
            }
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
