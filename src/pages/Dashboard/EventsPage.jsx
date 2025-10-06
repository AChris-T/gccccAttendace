import EventsDisplay from "@/components/dashboard/events/EventsDisplay"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"

const EventsPage = () => {
    return (
        <>
            <PageMeta title="Events | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Events" />
            <div className="space-y-6">
                <ComponentCard title="Events" desc="Join us for life - changing encounters and spiritual growth opportunities">
                    <EventsDisplay />
                </ComponentCard>
            </div>
        </>
    )
}

export default EventsPage