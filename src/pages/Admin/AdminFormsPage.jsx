import AdminPrayers from '../../components/admin/formpage/AdminPrayers';
import AdminQuestion from '../../components/admin/formpage/AdminQuestion';
import AdminTestimonials from '../../components/admin/formpage/AdminTestimonials';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const AdminFormsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const TABS = [
    { id: 'question', label: 'Question' },
    { id: 'prayer', label: 'Prayer' },
    { id: 'testimony', label: 'Testimony' },
  ];
  const DEFAULT_TAB = 'question';
  const activeTab = useMemo(() => {
    const tabFromUrl = searchParams.get('tab');
    const isValid = TABS.some((t) => t.id === tabFromUrl);
    return isValid ? tabFromUrl : DEFAULT_TAB;
  }, [searchParams]);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    const isValid = TABS.some((t) => t.id === tabFromUrl);
    if (!tabFromUrl || !isValid) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('tab', DEFAULT_TAB);
        return next;
      });
    }
  }, [searchParams, setSearchParams]);

  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('tab', tabId);
      return next;
    });
  };

  return (
    <>
      <PageMeta title="Admin | Forms | GCCC Ibadan" />
      <PageBreadcrumb pageTitle="Admin | Forms" />
      <div className="space-y-6">
        <ComponentCard title="All Forms">
          <div className="flex items-center gap-2 border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={
                  `px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ` +
                  (activeTab === tab.id
                    ? 'border-[#24244e] text-[#24244e]'
                    : 'border-transparent text-gray-500 hover:text-gray-700')
                }
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-4">
            {activeTab === 'question' && <AdminQuestion />}
            {activeTab === 'prayer' && <AdminPrayers />}
            {activeTab === 'testimony' && <AdminTestimonials />}
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default AdminFormsPage;
