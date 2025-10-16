import { SectionCard } from "@/components/dashboard/members/SectionCard";
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
                {socials.map(({ name, icon: Icon, key }) => (
                    <div key={key} className="flex items-center gap-3 text-gray-400 dark:text-gray-600">
                        <Icon className="w-5 h-5" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{name}</p>
                            <p className="text-sm">{socialLinks[key] || 'Not linked'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};
