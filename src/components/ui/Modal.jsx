import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../../components/ui/Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
  actionButton,
  displayFooter = true,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000000] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div
            ref={modalRef}
            className={`relative ${maxWidth} w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden`}
          >
            {/* Header */}
            {title && (
              <div className="px-6 py-4 border-b border-gray-100 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5 max-h-[90vh] overflow-y-auto text-gray-700">
              {children}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 overflow-y-auto text-gray-700 flex gap-4 justify-end">
              <Button size="md" variant="outline-danger" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
