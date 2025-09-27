import { lazy, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const AdminQuestion = lazy(() =>
  import('../components/admin/formpage/AdminQuestion')
);
const AdminPrayers = lazy(() =>
  import('../components/admin/formpage/AdminPrayers')
);
const AdminTestimonials = lazy(() =>
  import('../components/admin/formpage/AdminTestimonials')
);

const FORM_TABS = Object.freeze([
  {
    id: 'question',
    label: 'Question',
    component: AdminQuestion,
    ariaLabel: 'Question form management',
  },
  {
    id: 'prayer',
    label: 'Prayer',
    component: AdminPrayers,
    ariaLabel: 'Prayer form management',
  },
  {
    id: 'testimony',
    label: 'Testimony',
    component: AdminTestimonials,
    ariaLabel: 'Testimony form management',
  },
]);

const DEFAULT_TAB = 'question';

export const useTabManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo(() => {
    const tabFromUrl = searchParams.get('tab');
    const validTab = FORM_TABS.find((tab) => tab.id === tabFromUrl);
    return validTab ? tabFromUrl : DEFAULT_TAB;
  }, [searchParams]);

  const activeTabData = useMemo(
    () => FORM_TABS.find((tab) => tab.id === activeTab) || FORM_TABS[0],
    [activeTab]
  );

  const updateTab = useCallback(
    (tabId) => {
      if (tabId === activeTab) return;

      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('tab', tabId);
          return next;
        },
        { replace: true }
      );
    },
    [activeTab, setSearchParams]
  );

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    const isValidTab = FORM_TABS.some((tab) => tab.id === tabFromUrl);

    if (!tabFromUrl || !isValidTab) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('tab', DEFAULT_TAB);
          return next;
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  return {
    activeTab,
    activeTabData,
    updateTab,
    tabs: FORM_TABS,
  };
};
