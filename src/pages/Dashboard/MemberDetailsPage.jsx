import ComponentCard from "@/components/common/ComponentCard"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import PageMeta from "@/components/common/PageMeta"
import MemberProfile from "@/components/dashboard/members/MemberProfile"
import { useParams } from "react-router-dom"

const MemberDetailsPage = () => {
    const { memberId } = useParams()
    return (
        <>
            <PageMeta title="Member | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Member" />
            <div className="space-y-6">
                <ComponentCard title="Member's details">
                    <MemberProfile memberId={memberId} />
                </ComponentCard>
            </div>
        </>
    )
}

export default MemberDetailsPage