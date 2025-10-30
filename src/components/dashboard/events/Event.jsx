import Animated from '@/components/common/Animated';
import UpcomingEvents from '@/components/dashboard/events/UpcomingEvents';
import OngoingEvents from '@/components/dashboard/events/OngoingEvents';
import PastEvents from '@/components/dashboard/events/PastEvents';
import { Tabs } from '@/components/ui/tab/Tabs';
import useQueryParam from '@/hooks/useQueryParam';
import { EventIcon } from '@/icons';
import React, { useMemo } from 'react';
import usePayment from '@/hooks/usePayment';

const TABS_CONFIG = [
  {
    key: 'upcoming',
    label: 'Upcoming Events',
    icon: EventIcon,
    image: '/images/forms/question2.png',
  },
  {
    key: 'ongoing',
    label: 'Ongoing Events',
    icon: EventIcon,
    image: '/images/forms/prayer2.png',
  },
  {
    key: 'past',
    label: 'Past Events',
    icon: EventIcon,
    image: '/images/forms/testimony2.png',
  },
];
const DEFAULT_TAB = 'upcoming';

const TAB_COMPONENTS = {
  upcoming: UpcomingEvents,
  ongoing: OngoingEvents,
  past: PastEvents,
};

export default function Event() {
  const [activeTab, setActiveTab] = useQueryParam('tab', DEFAULT_TAB);
  const { startPayment, isInitiating } = usePayment();

  const onEventSuccess = async (paymentPayload) => {
    if (!paymentPayload) return;
    try {
      await startPayment(paymentPayload);
    } catch (e) {
    }
  };

  const ActiveTabComponent = useMemo(() => {
    return TAB_COMPONENTS[activeTab] || TAB_COMPONENTS[DEFAULT_TAB];
  }, [activeTab]);
  const validatedTab = TABS_CONFIG.some((tab) => tab.key === activeTab)
    ? activeTab
    : DEFAULT_TAB;
  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-2 shadow dark:bg-gray-800 sm:p-5">
      <Tabs
        tabs={TABS_CONFIG}
        activeTab={validatedTab}
        onTabChange={setActiveTab}
        className="justify-center mb-5"
      />
      <Animated key={validatedTab} animation="slide-up">
        <div
          role="tabpanel"
          id={`panel-${validatedTab}`}
          aria-labelledby={`tab-${validatedTab}`}
          className="mx-auto max-w-[1200px]"
        >
          <ActiveTabComponent
            onSuccess={onEventSuccess}
            isPaying={isInitiating}
          />
        </div>
      </Animated>
    </div>
  );
}
