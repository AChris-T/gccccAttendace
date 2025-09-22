import { useEffect } from "react"
import { useAdminStore } from "../../../store/admin.store"
import { AnalyticsSkeletonLoader } from "../../skeleton"
import AdminMetric from "./AdminMetric"



const AdminMetrics = () => {
    const { getAdminAnalytics, adminAnalytics, loadingAdminAnalytics } = useAdminStore()

    useEffect(() => {
        getAdminAnalytics()
    }, [getAdminAnalytics])

    if (loadingAdminAnalytics) return <AnalyticsSkeletonLoader />

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {adminAnalytics?.map((data, i) => <AdminMetric key={data.name + i} data={data} />)}
        </div>
    )
}

export default AdminMetrics