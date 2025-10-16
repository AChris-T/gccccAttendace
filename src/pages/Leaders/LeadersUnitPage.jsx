import UnitDisplay from "@/components/leaders/units/UnitDisplay"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const LeadersUnitPage = () => {
    return (
        <>
            <PageMeta title="Leaders: Units | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Leaders: Units" description={'Create, and manage all units and their members'} />
            <ComponentCard>
                <UnitDisplay />
            </ComponentCard>
        </>
    )
}
export default LeadersUnitPage