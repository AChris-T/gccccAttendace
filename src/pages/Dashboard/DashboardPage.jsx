import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import PageMeta from '../../components/common/PageMeta'

const DashboardPage = () => {
  return (
    <>
      <PageMeta title="Dashboard | GCCC Ibadan" />
      <PageBreadcrumb pageTitle="Dashboard" />
      <div className="space-y-6">
        <ComponentCard title="Dashboard">
          <img className="w-full rounded" src="/images/site.jpg" alt="site in progress" />
        </ComponentCard>
      </div>
    </>
  )
}

export default DashboardPage