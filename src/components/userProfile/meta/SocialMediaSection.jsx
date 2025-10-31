import SocialLinkCard from './SocialLinkCard';
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon2,
} from '@/icons';

const SOCIAL_PLATFORMS = [
  {
    platform: 'facebook',
    Icon: FacebookIcon,
    label: 'Facebook',
    color:
      'hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-300 dark:hover:border-blue-600',
  },
  {
    platform: 'twitter',
    Icon: TwitterIcon2,
    label: 'X (Twitter)',
    color:
      'hover:bg-gray-50 dark:hover:bg-gray-500/10 hover:border-gray-400 dark:hover:border-gray-600',
  },
  {
    platform: 'linkedin',
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    color:
      'hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500',
  },
  {
    platform: 'instagram',
    Icon: InstagramIcon,
    label: 'Instagram',
    color:
      'hover:bg-pink-50 dark:hover:bg-pink-500/10 hover:border-pink-300 dark:hover:border-pink-600',
  },
];

const SocialMediaSection = ({ user }) => (
  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/60">
    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
      Social Media
    </h5>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {SOCIAL_PLATFORMS.map(({ platform, Icon, label, color }) => (
        <SocialLinkCard
          key={platform}
          Icon={Icon}
          label={label}
          color={color}
          url={user?.social_links?.[platform]}
        />
      ))}
    </div>
  </div>
);

export default SocialMediaSection;
