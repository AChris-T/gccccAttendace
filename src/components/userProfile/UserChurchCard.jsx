import { useAuthStore } from '@/store/auth.store';
import { CommunityIcon, EditIcon, WorkerIcon } from '@/icons';
import InfoField from '@/components/userProfile/church/InfoField';
import UserUnitsDetails from '@/components/userProfile/UserUnitsDetials';
import Button from '@/components/ui/Button';
import { useModal } from '@/hooks/useModal';
import { useForm } from 'react-hook-form';
import Modal from '@/components/ui/modal/Modal';
import SingleSelectForm from '@/components/form/useForm/SingleSelectForm';
import { communityArray } from '@/utils/data';
import { useUpdateProfile } from '@/queries/user.query';
import { useMemo } from 'react';

const FIELD_CONFIG = [
  {
    label: 'Community',
    key: 'community',
    icon: CommunityIcon,
  },
  {
    label: 'Worker',
    key: 'worker',
    icon: WorkerIcon,
  },
];

export default function UserChurchCard() {
  const { user, userUnitsDetails } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      reset()
      closeModal()
    },
  });

  const communityOptions = useMemo(() => {
    if (!communityArray) return [];
    return communityArray?.map(community => ({
      value: community,
      text: community
    }));
  }, [communityArray]);

  const fields = FIELD_CONFIG.map((field) => ({
    ...field,
    value: user?.[field.key],
  }));


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      community: user?.community || ''
    }
  });

  const handleSave = (data) => {
    if (!data.community) {
      setError('community', {
        type: 'manual',
        message: 'Please select a community'
      });
      return;
    }
    updateProfile(data);
  };


  return (
    <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60 lg:px-6 lg:pt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Unit Information
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your church roles and assignments
          </p>
        </div>

        <Button
          variant="neutral"
          onClick={openModal}
        >
          <EditIcon width={16} height={16} className="text-gray-700 dark:text-gray-300" />
        </Button>
      </div>

      <div className="px-5 py-5 lg:px-6 lg:py-6 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {fields.map((field) => (
            <InfoField key={field.label} field={field} value={field.value} />
          ))}
        </div>
        <UserUnitsDetails userUnits={userUnitsDetails} />
      </div>


      <Modal
        description="Update your community"
        title={'Edit'}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <form className="space-y-5" onSubmit={handleSubmit(handleSave)}>
          <div className="grid grid-cols-1">
            <SingleSelectForm
              label="Select Community"
              name="community"
              expandParent
              options={communityOptions}
              register={register}
              setValue={setValue}
              placeholder="Select a community..."
              searchable
              error={errors.community?.message}
            />
          </div>

          <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              onClick={closeModal}
              disabled={isPending}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={isPending}
              disabled={isPending}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

