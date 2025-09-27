import { useAdminAnalytics } from "../../../queries/admin.query"
import { AnalyticsSkeletonLoader } from "../../skeleton"
import AdminMetric from "./AdminMetric"

const AdminMetrics = () => {
    const { data: adminAnalytics = [], isLoading } = useAdminAnalytics()

    if (isLoading) return <AnalyticsSkeletonLoader />

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {adminAnalytics?.map((data, i) => <AdminMetric key={data.name + i} data={data} />)}
        </div>
    )
}

export default AdminMetrics