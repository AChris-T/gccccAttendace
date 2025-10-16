import { FollowupCard } from '@/components/admin/followups/FollowupCard';
import FormCard from '@/components/admin/formpage/FormCard';
import { FollowupFeedbacksSkeletonLoader } from '@/components/skeleton';
import { Tabs } from '@/components/ui/tab/Tabs';
import useQueryParam from '@/hooks/useQueryParam';
import { PrayerIcon, QuestionIcon, TestimonyIcon } from '@/icons';
import { useAllFormMessages } from '@/queries/form.query';
import { useMemo } from 'react';

const FormFeedbacks = () => {
  const [activeTab, setActiveTab] = useQueryParam('tab', 'prayer');
  const { data = [], isLoading } = useAllFormMessages(activeTab);

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
          {data.length > 0 ? (
            data.map((person) => <FormCard key={person.id} person={person} />)
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
