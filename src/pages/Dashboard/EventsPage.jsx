import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const EventsPage = () => {
    return (
        <>
            <PageMeta title="Events | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Events" />
            <div className="space-y-6">
                <ComponentCard title="Events">
                    <img className="w-full rounded" src="/images/site.jpg" alt="site in progress" />
                </ComponentCard>
            </div>
        </>
    )
}

export default EventsPage