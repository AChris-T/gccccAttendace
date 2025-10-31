import InputForm from '@/components/form/useForm/InputForm';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
} from '@/icons';

const SOCIAL_PLATFORMS = [
  { platform: 'facebook', Icon: FacebookIcon, label: 'Facebook' },
  { platform: 'twitter', Icon: TwitterIcon, label: 'X (Twitter)' },
  { platform: 'linkedin', Icon: LinkedInIcon, label: 'LinkedIn' },
  { platform: 'instagram', Icon: InstagramIcon, label: 'Instagram' },
];

const SocialMediaForm = ({ register, errors }) => (
  <div className="grid grid-cols-1 space-y-5">
    {SOCIAL_PLATFORMS.map(({ platform, Icon, label }) => (
      <div key={platform} className="relative">
        <div className="absolute right-3 top-9 z-10">
          <Icon width={18} height={18} />
        </div>
        <InputForm
          label={label}
          name={platform}
          type="url"
          placeholder={`https://${platform}.com/yourprofile`}
          register={register}
          error={errors[platform]?.message}
        />
      </div>
    ))}
  </div>
);

export default SocialMediaForm;
