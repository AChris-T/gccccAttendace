import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const LeadersDashboardPage = () => {
    return (
        <>
            <PageMeta title="Leaders: Dashboard | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Leaders: Dashboard" />
            <div className="space-y-6">
                <ComponentCard title="Leaders" >
                </ComponentCard>
            </div>
        </>
    )
}

export default LeadersDashboardPage