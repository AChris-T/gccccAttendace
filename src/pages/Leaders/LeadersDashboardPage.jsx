import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import UnitsDetails from "@/components/leaders/UnitsDetails";

const LeadersDashboardPage = () => {

    return (
        <>
            <PageMeta title="Leaders: Dashboard | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Leaders: Dashboard" description={'Track your unit`s participation, manage current tasks, and monitor team follow-up status at a glance.'} />
            <ComponentCard>
                <UnitsDetails />
            </ComponentCard>
        </>
    )
}

export default LeadersDashboardPage