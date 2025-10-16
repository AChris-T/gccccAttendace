import { InfoField } from "@/components/dashboard/members/InfoField";
import { SectionCard } from "@/components/dashboard/members/SectionCard";
import { BookIcon, BriefcaseIcon, GraduationCapIcon } from "@/icons";

export const ProfessionalInformation = ({ user }) => {
    return (
        <SectionCard
            title="Professional Information"
            description="Your educational and career details"
        >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InfoField icon={GraduationCapIcon} label="Education" value={user.education} color="blue" />
                <InfoField icon={BookIcon} label="Field of Study" value={user.field_of_study} color="purple" />
                <InfoField icon={BriefcaseIcon} label="Occupation" value={user.occupation} color="blue" />
            </div>
        </SectionCard>
    );
};
