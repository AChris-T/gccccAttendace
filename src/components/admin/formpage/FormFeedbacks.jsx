import FormCard from '@/components/admin/formpage/FormCard';
import { FollowupFeedbacksSkeletonLoader } from '@/components/skeleton';
import { Tabs } from '@/components/ui/tab/Tabs';
import useQueryParam from '@/hooks/useQueryParam';
import { PrayerIcon, QuestionIcon, TestimonyIcon } from '@/icons';
import { useMemo } from 'react';
import useFormMessagesSelection from '@/hooks/useFormMessagesSelection';

const FormFeedbacks = () => {
  const [activeTab, setActiveTab] = useQueryParam('tab', 'prayer');
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

  const tabs = useMemo(
    () => [
      { key: 'prayer', label: 'Prayers', icon: PrayerIcon },
      { key: 'question', label: 'Questions', icon: QuestionIcon },
      { key: 'testimony', label: 'Testimonies', icon: TestimonyIcon },
    ],
    []
  );

  return (
    <div className="max-w-5xl mx-auto shadow bg-white dark:bg-gray-800 p-2 sm:p-5 rounded-xl">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="justify-center"
      />
      {isLoading ? (
        <FollowupFeedbacksSkeletonLoader />
      ) : (
        <div className="space-y-5">
          {data.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedIds.length > 0
                    ? `${selectedIds.length} selected`
                    : 'Select items'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={selectedIds.length === 0 || isUpdating}
                  onClick={() => updateSelected(true)}
                  className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white disabled:opacity-50"
                >
                  Mark completed
                </button>
                <button
                  disabled={selectedIds.length === 0 || isDeleting}
                  onClick={deleteSelected}
                  className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white disabled:opacity-50"
                >
                  Delete
                </button>
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
            <p className="text-center text-gray-500 py-6">
              No {activeTab.toLowerCase()} available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FormFeedbacks;
