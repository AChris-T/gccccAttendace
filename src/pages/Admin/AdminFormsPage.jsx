import { Suspense, useCallback } from 'react';
import { useTabManagement } from '../../hooks/useTabManagement';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import { TabButton } from '../../components/admin/forms/tabs/TabButton';
import { TabContentErrorBoundary } from '../../components/admin/forms/tabs/TabContentErrorBoundary';
import { TabContentLoader } from '../../components/skeleton';

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
      <PageMeta title="Admin | Forms | GCCC Ibadan" />
      <PageBreadcrumb pageTitle="Admin | Forms" />

      <div className="space-y-6">
        <ComponentCard title="All Forms">
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
      </div>
    </>
  );
};

export default AdminFormsPage;

// const AdminFormsPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const TABS = [
//     { id: 'question', label: 'Question' },
//     { id: 'prayer', label: 'Prayer' },
//     { id: 'testimony', label: 'Testimony' },
//   ];
//   const DEFAULT_TAB = 'question';
//   const activeTab = useMemo(() => {
//     const tabFromUrl = searchParams.get('tab');
//     const isValid = TABS.some((t) => t.id === tabFromUrl);
//     return isValid ? tabFromUrl : DEFAULT_TAB;
//   }, [searchParams]);

//   useEffect(() => {
//     const tabFromUrl = searchParams.get('tab');
//     const isValid = TABS.some((t) => t.id === tabFromUrl);
//     if (!tabFromUrl || !isValid) {
//       setSearchParams((prev) => {
//         const next = new URLSearchParams(prev);
//         next.set('tab', DEFAULT_TAB);
//         return next;
//       });
//     }
//   }, [searchParams, setSearchParams]);

//   const handleTabClick = (tabId) => {
//     if (tabId === activeTab) return;
//     setSearchParams((prev) => {
//       const next = new URLSearchParams(prev);
//       next.set('tab', tabId);
//       return next;
//     });
//   };

//   return (
//     <>
//       <PageMeta title="Admin | Forms | GCCC Ibadan" />
//       <PageBreadcrumb pageTitle="Admin | Forms" />
//       <div className="space-y-6">
//         <ComponentCard title="All Forms">
//           <div className="flex items-center gap-2 border-b border-gray-200">
//             {TABS.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => handleTabClick(tab.id)}
//                 className={
//                   `px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ` +
//                   (activeTab === tab.id
//                     ? 'border-[#24244e] text-[#24244e]'
//                     : 'border-transparent text-gray-500 hover:text-gray-700')
//                 }
//                 aria-current={activeTab === tab.id ? 'page' : undefined}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <div className="pt-4">
//             {activeTab === 'question' && <AdminQuestion />}
//             {activeTab === 'prayer' && <AdminPrayers />}
//             {activeTab === 'testimony' && <AdminTestimonials />}
//           </div>
//         </ComponentCard>
//       </div>
//     </>
//   );
// };

// export default AdminFormsPage;
