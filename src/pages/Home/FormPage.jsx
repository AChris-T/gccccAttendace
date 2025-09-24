import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuestionForm from '../../components/Formpage/QuestionForm';
import PrayerForm from '../../components/Formpage/PrayerForm';
import TestimonyForm from '../../components/Formpage/TestimonyForm';
import Animated from '../../components/common/Animated';

const TABS_CONFIG = [
  {
    id: 'question',
    name: 'Question',
    image: '/images/forms/qes.png',
    component: QuestionForm
  },
  {
    id: 'prayer',
    name: 'Prayer Request',
    image: '/images/forms/newPrayer.png',
    component: PrayerForm
  },
  {
    id: 'testimony',
    name: 'Testimony',
    image: '/images/forms/Ttestimony.png',
    component: TestimonyForm
  },
];

const DEFAULT_TAB = 'question';

export default function FormPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  const activeTabConfig = useMemo(
    () => TABS_CONFIG.find(tab => tab.id === activeTab) || TABS_CONFIG[0],
    [activeTab]
  );

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    const validTabFromUrl = TABS_CONFIG.find(tab => tab.id === tabFromUrl);

    if (validTabFromUrl) {
      setActiveTab(validTabFromUrl.id);
    } else if (tabFromUrl && !validTabFromUrl) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('tab', DEFAULT_TAB);
        return newParams;
      });
    } else if (!tabFromUrl) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('tab', DEFAULT_TAB);
        return newParams;
      });
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('tab', tabId);
      return newParams;
    });
  }, [activeTab, setSearchParams]);

  const renderActiveForm = useCallback(() => {
    const ActiveComponent = activeTabConfig.component;
    return <ActiveComponent />;
  }, [activeTabConfig.component]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full mx-2 md:max-w-xl md:mx-auto h-[80vh] custom-scrollbar overflow-y-auto bg-white shadow rounded-md p-6 mt-20 mb-20 md:mt-20 lg:mt-20">

        {/* Tab Image Header */}
        <Animated
          animation="fade-down"
          duration={0.5}
          easing="ease-out"
          className="mb-4 flex justify-center"
        >
          <img
            src={activeTabConfig.image}
            alt={`${activeTabConfig.name} icon`}
            className="h-32 w-xl object-contain"
            loading="lazy"
          />
        </Animated>

        {/* Tab Navigation */}
        <nav className="flex space-x-0 border-b" role="tablist">
          {TABS_CONFIG.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                className={`px-2 md:px-6 py-2 -mb-px font-medium border-b-2 focus:outline-none transition-colors duration-200 hover:text-[#1a1a40] ${isActive
                  ? 'border-[#24244e] text-[#24244e] font-medium'
                  : 'border-transparent text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.name}
              </button>
            );
          })}
        </nav>

        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <Animated
            key={activeTab}
            animation="slide-up"
            duration={0.5}
            easing="ease-out"
            className="mt-6"
          >
            {renderActiveForm()}
          </Animated>
        </div>
      </div>
    </div>
  );
}