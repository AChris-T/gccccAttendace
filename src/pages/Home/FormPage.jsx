import { useMemo } from 'react';
import QuestionForm from '../../components/Formpage/QuestionForm';
import PrayerForm from '../../components/Formpage/PrayerForm';
import TestimonyForm from '../../components/Formpage/TestimonyForm';
import Animated from '../../components/common/Animated';
import { Tabs } from '@/components/ui/tab/Tabs';
import useQueryParam from '@/hooks/useQueryParam';
import { PrayerIcon, QuestionIcon, TestimonyIcon } from '@/icons';

const TABS_CONFIG = [
  {
    key: 'question',
    label: 'Question',
    icon: QuestionIcon,
    image: '/images/forms/question2.png',
  },
  {
    key: 'prayer',
    label: 'Prayer Request',
    icon: PrayerIcon,
    image: '/images/forms/prayer2.png',
  },
  {
    key: 'testimony',
    label: 'Testimony',
    icon: TestimonyIcon,
    image: '/images/forms/testimony2.png',
  },
];

const DEFAULT_TAB = 'question';

const FORM_COMPONENTS = {
  question: QuestionForm,
  prayer: PrayerForm,
  testimony: TestimonyForm,
};

export default function FormPage() {
  const [activeTab, setActiveTab] = useQueryParam('tab', DEFAULT_TAB);

  const ActiveFormComponent = useMemo(() => {
    return FORM_COMPONENTS[activeTab] || FORM_COMPONENTS[DEFAULT_TAB];
  }, [activeTab]);

  const validatedTab = TABS_CONFIG.some(tab => tab.key === activeTab)
    ? activeTab
    : DEFAULT_TAB;

  return (
    <div className="min-h-screen flex items-center justify-center px-3">
      <div className="w-full md:max-w-xl md:mx-auto custom-scrollbar bg-white dark:bg-gray-900 shadow rounded-md p-6 transition-colors">
        <Tabs
          tabs={TABS_CONFIG}
          activeTab={validatedTab}
          onTabChange={setActiveTab}
          className="justify-center"
        />
        <Animated
          key={validatedTab}
          animation="slide-up"
        >

          <div
            role="tabpanel"
            id={`panel-${validatedTab}`}
            aria-labelledby={`tab-${validatedTab}`}
          >
            <ActiveFormComponent />
          </div>
        </Animated>
      </div>
    </div>
  );
}