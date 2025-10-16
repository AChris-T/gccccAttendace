import { Suspense, useCallback } from 'react';
import { useTabManagement } from '../../hooks/useTabManagement';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import { TabButton } from '../../components/admin/forms/tabs/TabButton';
import { TabContentErrorBoundary } from '../../components/admin/forms/tabs/TabContentErrorBoundary';
import { TabContentLoader } from '../../components/skeleton';
import { MessageIcon } from '@/icons';

const AdminFormsPage = () => {
  const {
    activeTab,
    activeTabData,
    updateTab,
    tabs,
    categorized,
    isLoading,
    isError,
    error,
  } = useTabManagement();
  const handleKeyDown = useCallback(
    (event, tabId) => {
      const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
      let nextIndex;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          updateTab(tabs[nextIndex].id);
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          updateTab(tabs[nextIndex].id);
          break;
        case 'Home':
          event.preventDefault();
          updateTab(tabs[0].id);
          break;
        case 'End':
          event.preventDefault();
          updateTab(tabs[tabs.length - 1].id);
          break;
        default:
          break;
      }
    },
    [tabs, updateTab]
  );

  const ActiveComponent = activeTabData.component;
  const itemsForActiveTab = categorized[activeTab] || [];
  const typeForActiveTab = activeTab;

  return (
    <>
      <PageMeta title="Admin: Forms | GCCC Ibadan" />
      <PageBreadcrumb icon={MessageIcon} pageTitle="Admin: Forms" description={'Manage all submitted forms - Questions, Testimony and Prayer.'} />
      <ComponentCard >
        <div className="border-b border-gray-200">
          <nav
            className="flex items-center gap-1"
            role="tablist"
            aria-label="Form management tabs"
          >
            {tabs.map((tab) => (
              <div key={tab.id} onKeyDown={(e) => handleKeyDown(e, tab.id)}>
                <TabButton
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={updateTab}
                />
              </div>
            ))}
          </nav>
        </div>
        <div
          className="pt-6"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
        >
          <TabContentErrorBoundary tabId={activeTab}>
            <Suspense fallback={<TabContentLoader />}>
              <ActiveComponent
                items={itemsForActiveTab}
                isLoading={isLoading}
                isError={isError}
                error={error}
                type={typeForActiveTab}
              />
            </Suspense>
          </TabContentErrorBoundary>
        </div>
      </ComponentCard>
    </>
  );
};

export default AdminFormsPage;