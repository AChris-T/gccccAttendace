import ComponentCard from "@/components/common/ComponentCard"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import PageMeta from "@/components/common/PageMeta"
import MemberProfile from "@/components/dashboard/members/MemberProfile"
import { MemberIcon } from "@/icons"
import { useParams } from "react-router-dom"

const MemberDetailsPage = () => {
    const { memberId } = useParams()
    return (
        <>
            <PageMeta title="Member | GCCC Ibadan" />
            <PageBreadcrumb icon={MemberIcon} pageTitle="Member" description={'Review and manage all core data for this member, including status, unit assignment, and communication logs.'} />
            <ComponentCard>
                <MemberProfile memberId={memberId} />
            </ComponentCard>
        </>
    )
}

export default MemberDetailsPage