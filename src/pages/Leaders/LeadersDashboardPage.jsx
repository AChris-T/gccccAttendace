import AssignedAbsentMembers from "@/components/dashboard/assigned/AssignedAbsentMembers";
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import { useGetAssignedAbsentees } from "@/queries/user.query";
import { TableSkeletonLoader } from "@/components/skeleton";
import UnitsDetails from "@/components/leaders/UnitsDetails";


const AssignedAbsentMembersSection = ({ data, isLoading }) => {
    if (isLoading) return <TableSkeletonLoader />;
    return <AssignedAbsentMembers assignedAbsentMembers={data} />;
};

const LeadersDashboardPage = () => {
    const { data, isLoading } = useGetAssignedAbsentees();

    return (
        <>
            <PageMeta title="Leaders: Dashboard | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Leaders: Dashboard" description={'Track your unit`s participation, manage current tasks, and monitor team follow-up status at a glance.'} />
            <ComponentCard>
                <UnitsDetails />
                <AssignedAbsentMembersSection
                    data={data}
                    isLoading={isLoading}
                />
            </ComponentCard>
        </>
    )
}

export default LeadersDashboardPage