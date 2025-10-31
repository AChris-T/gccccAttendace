import { useState } from 'react';
import Button from './Button';
import Modal from './modal/Modal';

export const DeleteConfirmation = ({
  onConfirm,
  onCancel,
  title = 'Delete Confirmation',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isOpen = false,
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      description={message}
      size="sm"
    >
      <div className="p-4">
        <div className="flex items-center gap-3 p-4 mb-5 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-200">
          <svg
            className="w-5 h-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">
            This action cannot be undone. All associated data will be
            permanently deleted.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const useDeleteConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const open = (item = null) => {
    setItemToDelete(item);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setItemToDelete(null);
  };

  return {
    isOpen,
    itemToDelete,
    open,
    close,
  };
};

export default DeleteConfirmation;
