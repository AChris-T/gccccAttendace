import React from 'react';
import Modal from '@/components/ui/Modal';
import { useSelectableList } from '@/hooks/useSelectableList';
import ListRender from '@/components/admin/formpage/ListRender';

export default function AdminPrayers({ items = [] }) {
  const {
    current,
    past,
    selectedIds,
    showDeleteModal,
    setShowDeleteModal,
    handleSelect,
    handleSelectAll,
    handleConfirmDelete,
    handleBulkMarkCompleted,
    updateFormMessages,
    deleteFormMessages,
  } = useSelectableList(items);

  return (
    <div className="space-y-8">
      {selectedIds.length > 0 && (
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Delete ({selectedIds.length})
          </button>
          <button
            onClick={handleBulkMarkCompleted}
            disabled={updateFormMessages.isLoading}
            className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50"
          >
            {updateFormMessages.isLoading
              ? 'Updating...'
              : `Mark Completed (${selectedIds.length})`}
          </button>
        </div>
      )}

      <section>
        <div className="flex mb-2  items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-white">
            Current Prayers
          </h4>
          {current.length > 0 && (
            <button
              onClick={() => handleSelectAll(current)}
              className="text-xs text-indigo-600"
            >
              {selectedIds.length === current.length
                ? 'Unselect All'
                : 'Select All'}
            </button>
          )}
        </div>
        {current.length ? (
          <ListRender
            list={current}
            selectedIds={selectedIds}
            onSelect={handleSelect}
          />
        ) : (
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            No current prayers.
          </p>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-white">
            Past Prayers
          </h4>
          {past.length > 0 && (
            <button
              onClick={() => handleSelectAll(past)}
              className="text-xs text-indigo-600"
            >
              {selectedIds.length === past.length
                ? 'Unselect All'
                : 'Select All'}
            </button>
          )}
        </div>
        {past.length ? (
          <ListRenderer
            list={past}
            selectedIds={selectedIds}
            onSelect={handleSelect}
          />
        ) : (
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            No past prayers.
          </p>
        )}
      </section>

      {/* Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        actionButton={
          <button
            onClick={handleConfirmDelete}
            disabled={deleteFormMessages.isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 disabled:opacity-50"
          >
            {deleteFormMessages.isLoading ? 'Deleting...' : 'Delete'}
          </button>
        }
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete {selectedIds.length} message
          {selectedIds.length > 1 ? 's' : ''}? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
