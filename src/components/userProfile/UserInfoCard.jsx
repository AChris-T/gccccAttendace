import { useModal } from '../../hooks/useModal';
import {
  EditIcon,
  UserIcon,
  EmailIcon,
  PhoneIcon,
  GenderIcon,
  CalendarIcon,
  LocationIcon,
  MapIcon,
} from '../../icons';
import { useAuthStore } from '../../store/auth.store';
import Button from '../ui/Button';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '../../queries/user.query';
import PersonalInfoGrid from '@/components/userProfile/info/PersonalInfoGrid';
import LocationSection from '@/components/userProfile/info/LocationSection';
import EditInfoModal from '@/components/userProfile/info/EditInfoModal';

export default function UserInfoCard() {
  const { user, setUser } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      gender: user?.gender || '',
      date_of_birth: user?.date_of_birth || '',
      bio: user?.bio || '',
      address: user?.address || '',
      city_or_state: user?.city_or_state || '',
      country: user?.country || '',
    },
  });

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: (res) => {
      if (res?.data?.user) {
        setUser(res.data.user);
      } else if (res?.data) {
        setUser(res.data);
      }

      setTimeout(() => {
        closeModal();
      }, 500);
    },
  });

  const handleSave = (data) => {
    updateProfile(data);
  };

  const handleEdit = () => {
    reset({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      gender: user?.gender || '',
      date_of_birth: user?.date_of_birth || '',
      bio: user?.bio || '',
      address: user?.address || '',
      city_or_state: user?.city_or_state || '',
      country: user?.country || '',
    });
    openModal();
  };

  const personalInfo = [
    {
      label: 'First Name',
      value: user?.first_name,
      icon: UserIcon,
      colorClass: 'text-blue-600 dark:text-blue-400',
      bgClass: 'bg-blue-50 dark:bg-blue-500/10',
      gradientClass:
        'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
    },
    {
      label: 'Last Name',
      value: user?.last_name,
      icon: UserIcon,
      colorClass: 'text-indigo-600 dark:text-indigo-400',
      bgClass: 'bg-indigo-50 dark:bg-indigo-500/10',
      gradientClass:
        'from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700',
    },
    {
      label: 'Email Address',
      value: user?.email,
      icon: EmailIcon,
      colorClass: 'text-violet-600 dark:text-violet-400',
      bgClass: 'bg-violet-50 dark:bg-violet-500/10',
      gradientClass:
        'from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700',
    },
    {
      label: 'Phone',
      value: user?.phone_number,
      icon: PhoneIcon,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 dark:bg-emerald-500/10',
      gradientClass:
        'from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700',
    },
    {
      label: 'Gender',
      value: user?.gender
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : null,
      icon: GenderIcon,
      colorClass: 'text-purple-600 dark:text-purple-400',
      bgClass: 'bg-purple-50 dark:bg-purple-500/10',
      gradientClass:
        'from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
    },
    {
      label: 'Date of Birth',
      value: user?.date_of_birth,
      icon: CalendarIcon,
      colorClass: 'text-pink-600 dark:text-pink-400',
      bgClass: 'bg-pink-50 dark:bg-pink-500/10',
      gradientClass:
        'from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700',
    },
  ];

  const locationInfo = [
    {
      label: 'Country',
      value: user?.country,
      icon: LocationIcon,
      colorClass: 'text-cyan-600 dark:text-cyan-400',
      bgClass: 'bg-cyan-50 dark:bg-cyan-500/10',
      gradientClass:
        'from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700',
    },
    {
      label: 'City/State',
      value: user?.city_or_state,
      icon: MapIcon,
      colorClass: 'text-teal-600 dark:text-teal-400',
      bgClass: 'bg-teal-50 dark:bg-teal-500/10',
      gradientClass:
        'from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700',
    },
  ];

  return (
    <>
      <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-colors mb-6">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60 lg:px-6 lg:pt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your basic profile and contact details
            </p>
          </div>
          <Button
            variant="neutral"
            size="sm"
            className="flex items-center gap-2 transition-all hover:scale-105"
            onClick={handleEdit}
            startIcon={<EditIcon width={18} />}
          >
            {' '}
          </Button>
        </div>

        {/* Personal Info Section */}
        <div className="px-5 py-5 lg:px-6 lg:py-6">
          <PersonalInfoGrid items={personalInfo} />
        </div>

        {/* Location Section */}
        <div className="px-5 pb-5 lg:px-6 lg:pb-6">
          <LocationSection
            locationInfo={locationInfo}
            address={user?.address}
            LocationIcon={LocationIcon}
          />
        </div>
      </div>

      {/* Modal */}
      <EditInfoModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit(handleSave)}
        register={register}
        errors={errors}
        isPending={isPending}
        watch={watch}
      />
    </>
  );
}
