import { SectionCard } from "@/components/dashboard/members/SectionCard";
import SocialLinkCard from "@/components/userProfile/meta/SocialLinkCard";
import { FacebookIcon2, InstagramIcon2, LinkedInIcon2, TwitterIcon2 } from "@/icons";

export const SocialMediaLinks = ({ socialLinks }) => {

    const socials = [
        { name: 'Facebook', icon: FacebookIcon2, key: 'facebook' },
        { name: 'X (Twitter)', icon: TwitterIcon2, key: 'twitter' },
        { name: 'LinkedIn', icon: LinkedInIcon2, key: 'linkedin' },
        { name: 'Instagram', icon: InstagramIcon2, key: 'instagram' },
    ];

    return (
        <SectionCard title="Social Media">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socials.map(({ name, icon: Icon, key, color }) => (
                    <SocialLinkCard
                        key={key}
                        Icon={Icon}
                        label={name}
                        color={color}
                        url={socialLinks[key]}
                    />
                ))}
            </div>
        </SectionCard>
    );
};
