import { InfoField } from "@/components/dashboard/members/InfoField";
import { SectionCard } from "@/components/dashboard/members/SectionCard";
import { CalendarIcon2, CityIcon, MailIcon, MapPinIcon, PhoneIcon, UserIcon } from "@/icons";

export const PersonalInformation = ({ user }) => {
    return (
        <SectionCard
            title="Personal Information"
            description="Your basic profile and contact details"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoField icon={UserIcon} label="First Name" value={user.first_name} color="blue" />
                <InfoField icon={UserIcon} label="Last Name" value={user.last_name} color="purple" />
                <InfoField icon={MailIcon} label="Email Address" value={user.email} color="green" />
                <InfoField icon={PhoneIcon} label="Phone" value={user.phone_number} color="teal" />
                <InfoField icon={UserIcon} label="Gender" value={user.gender} color="pink" />
                <InfoField icon={CalendarIcon2} label="Date of Birth" value={user.date_of_birth} color="orange" />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    Location Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoField icon={MapPinIcon} label="Country" value={user.country} color="cyan" />
                    <InfoField icon={CityIcon} label="City/State" value={user.city_or_state} color="indigo" />
                    <InfoField icon={MapPinIcon} label="Address" value={user.address} color="blue" />
                </div>
            </div>
        </SectionCard>
    );
};