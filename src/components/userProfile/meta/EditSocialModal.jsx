import Button from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import SocialMediaForm from './SocialMediaForm';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/auth.store';
import { useUpdateProfile } from '@/queries/user.query';

const EditSocialModal = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
  const { mutateAsync, isPending } = useUpdateProfile();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facebook: user?.social_links?.facebook || '',
      twitter: user?.social_links?.twitter || '',
      linkedin: user?.social_links?.linkedin || '',
      instagram: user?.social_links?.instagram || '',
    },
  });

  const handleSave = async (data) => {
    try {
      await mutateAsync(data);
      onClose();
      reset()
    } catch (error) { }
  };

  return (
    <Modal
      description="Update your social media links to stay connected."
      title={'Edit Social Media'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="space-y-5" onSubmit={handleSubmit(handleSave)}>
        <SocialMediaForm register={register} errors={errors} />

        <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
          <Button
            className='flex-1'
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className='flex-1'
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}



export default EditSocialModal;
