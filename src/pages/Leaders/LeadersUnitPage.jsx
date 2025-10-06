import UnitCards from "../../components/admin/units/UnitDisplay"
// import UnitDisplay from "../../components/admin/units/UnitDisplay"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const LeadersUnitPage = () => {
    return (
        <>
            <PageMeta title="Leaders | Units | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Leaders | Units" />
            <div className="space-y-6">
                <ComponentCard title="Units" desc="Manage all units and their members">
                    <UnitCards />
                </ComponentCard>
            </div>
        </>
    )
}
export default LeadersUnitPage