import Button from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import SocialMediaForm from './SocialMediaForm';

const EditSocialModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  register,
  errors,
}) => (
  <Modal
    description="Update your social media links to stay connected."
    title={'Edit Social Media'}
    isOpen={isOpen}
    onClose={onClose}
  >
    <form className="space-y-5" onSubmit={onSubmit}>
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

export default EditSocialModal;
