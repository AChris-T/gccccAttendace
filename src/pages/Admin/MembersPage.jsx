import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import BasicTable from '../../components/table/BasicTable'

const MembersPage = () => {
    return (
        <>
            <PageMeta title="Members | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Members" />
            <div className="space-y-6">
                <ComponentCard title="All Members">
                    <BasicTable />
                </ComponentCard>
            </div>
        </>
    )
}

export default MembersPage