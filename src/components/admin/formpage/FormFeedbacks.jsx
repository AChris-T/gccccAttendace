import FormCard from '@/components/admin/formpage/FormCard';
import { FormsSkeleton } from '@/components/skeleton';
import { Tabs } from '@/components/ui/tab/Tabs';
import useQueryParam from '@/hooks/useQueryParam';
import { PrayerIcon, QuestionIcon, TestimonyIcon } from '@/icons';
import { useMemo } from 'react';
import useFormMessagesSelection from '@/hooks/useFormMessagesSelection';
import { EmptyState } from '@/components/common/EmptyState';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { DeleteConfirmation } from '@/components/ui/DeleteConfirmation';

const FormFeedbacks = () => {
  const [activeTab, setActiveTab] = useQueryParam('tab', 'prayer');
  const { isOpen: isOpenDeleteModal, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const {
    data = [],
    isLoading,
    selectedIds,
    isAllSelected,
    isIndeterminate,
    toggleSelect,
    toggleSelectAll,
    isUpdating,
    isDeleting,
    updateSelected,
    deleteSelected,
  } = useFormMessagesSelection(activeTab);

  const handleDelete = async () => {
    await deleteSelected()
    closeDeleteModal()
  }

  const tabs = useMemo(
    () => [
      { key: 'prayer', label: 'Prayers', icon: PrayerIcon },
      { key: 'question', label: 'Questions', icon: QuestionIcon },
      { key: 'testimony', label: 'Testimonies', icon: TestimonyIcon },
    ],
    []
  );

  return (
    <>
      <div className="max-w-5xl mx-auto shadow bg-white dark:bg-gray-800 p-2 sm:p-5 rounded-xl">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="justify-center mb-5"
        />
        {isLoading ? (
          <FormsSkeleton />
        ) : (
          <div className="space-y-5">
            {data.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="inline-flex cursor-pointer items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 rounded py-1">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    id='forms'
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                  <label htmlFor='forms' className="text-base cursor-pointer text-gray-700 dark:text-gray-300">
                    {selectedIds.length > 0
                      ? `${selectedIds.length} selected`
                      : 'Select all items'}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant='success'
                    size='sm'
                    loading={isUpdating}
                    disabled={selectedIds.length === 0 || isUpdating}
                    onClick={() => updateSelected(true)}
                  >
                    Mark completed
                  </Button>
                  <Button
                    size='sm'
                    variant='danger'
                    disabled={selectedIds.length === 0}
                    loading={isDeleting}
                    onClick={openDeleteModal}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
            {data.length > 0 ? (
              data.map((person) => (
                <FormCard
                  key={person.id}
                  person={person}
                  selected={selectedIds.includes(person.id)}
                  onToggleSelect={(checked) => toggleSelect(person.id, checked)}
                />
              ))
            ) : (
              <EmptyState title={`No ${activeTab.toLowerCase()} available`} />
            )}
          </div>
        )}
      </div>
      <Modal
        title={`Delete`}
        isOpen={isOpenDeleteModal}
        onClose={closeDeleteModal}
      >
        <DeleteConfirmation />
        <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
          <Button
            type="button"
            variant="ghost"
            onClick={closeDeleteModal}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button className="flex-1" loading={isDeleting} size='sm' variant='danger' onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default FormFeedbacks;
