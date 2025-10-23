import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
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
    <form className="flex flex-col" onSubmit={onSubmit}>
      <div className="px-2 overflow-y-auto custom-scrollbar">
        <SocialMediaForm register={register} errors={errors} />
      </div>

      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button
          size="sm"
          type="button"
          variant="outline-primary"
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          type="submit"
          loading={isPending}
          disabled={isPending}
          className="min-w-[120px]"
        >
          Save Changes
        </Button>
      </div>
    </form>
  </Modal>
);

export default EditSocialModal;
