import { useModal } from "../../hooks/useModal";
import { EditIcon } from "../../icons";
import { useAuthStore } from "../../store/auth.store";
import InputForm from "../form/InputForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";


export default function UserInfoCard() {
  const { user } = useAuthStore()
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    closeModal();
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.first_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.last_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.phone_number}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Unit
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.unit || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <Button variant="neutral" size="md" className="flex lg:inline-flex lg:w-auto" onClick={openModal} startIcon={<EditIcon width={18} />}> Edit</Button>

      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <InputForm label='Facebook' type='text' />
                  </div>

                  <div>
                    <InputForm label='X.com' type='text' />
                  </div>

                  <div>
                    <InputForm label='Linkedin' type='text' />
                  </div>

                  <div>
                    <InputForm label='Instagram' type='text' />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <InputForm label='First Name' type='text' />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <InputForm label='Last Name' type='text' />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <InputForm label='Email Address' type='email' />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <InputForm label='Phone' type='text' />
                  </div>

                  <div className="col-span-2">
                    <InputForm label='Bio' type='text' />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline-primary" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
