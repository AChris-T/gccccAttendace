import { InfoField } from "@/components/dashboard/members/InfoField";
import { SectionCard } from "@/components/dashboard/members/SectionCard";
import UserUnitsDetails from "@/components/userProfile/UserUnitsDetials";
import { BriefcaseIcon, UsersIcon } from "@/icons";

export const UnitInformation = ({ user }) => {
    return (
        <SectionCard
            title="Unit Information"
            description="Your church roles and assignments"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InfoField icon={UsersIcon} label="Community" value={user.community} />
                <InfoField icon={BriefcaseIcon} label="Worker" value={user.worker} />
            </div>

            <UserUnitsDetails userUnits={user?.units} />
        </SectionCard>
    );
};