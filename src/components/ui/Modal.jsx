import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Animated from "@/components/common/Animated";
import { CloseIcon } from "@/icons";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
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
    <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 z-[1000000] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
      <Animated
        ref={modalRef}
        animation='zoom-in'
        className={`relative ${maxWidth} w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden p-5 md:p-8`}
      >
        <div className="relative border-b border-gray-100 text-gray-900 dark:text-gray-200 pb-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="absolute -top-5 -right-5 z-10 bg-red-50 border-red-200 shadow-2xl hover:bg-red-100 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-1 transition-all duration-300 hover:scale-110 border"
          >
            <CloseIcon className=" text-red-400" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[90vh] overflow-y-auto text-gray-700">
          {children}
        </div>
      </Animated>
    </div>,
    document.body
  );
};

export default Modal;
