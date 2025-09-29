import UnitDisplay from "../../components/admin/units/UnitDisplay"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const AdminUnitAndLeaderPage = () => {
    return (
        <>
            <PageMeta title="Admin | Units & Leader | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin | Units & Leader" />
            <div className="space-y-6">
                <ComponentCard title="Units & Leader">
                    <UnitDisplay />
                </ComponentCard>
            </div>
        </>
    )
}
export default AdminUnitAndLeaderPage