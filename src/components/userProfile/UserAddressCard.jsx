"use client";

import { useModal } from "../../hooks/useModal";
import InputForm from "../form/InputForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import { useUpdateProfile } from "../../queries/user.query";
import { EditIcon } from "../../icons";

export default function UserAddressCard() {
  const { user } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  // ✅ Form setup with correct default values
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: user?.country || "",
      city_or_state: user?.city_or_state || "",
      address: user?.address || "",
    },
  });

  // ✅ Mutation hook
  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => closeModal(),
  });

  // ✅ Handle form submit
  const handleSave = (data) => {
    updateProfile(data);
  };

  // ✅ When clicking edit, populate fields again
  const handleEdit = () => {
    reset({
      country: user?.country || "",
      city_or_state: user?.city_or_state || "",
      address: user?.address || "",
    });
    openModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Address
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Country
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.country || "N/A"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  City/State
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.city_or_state || "N/A"}
                </p>
              </div>

              <div className="lg:col-span-2">
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.address || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Edit Button */}
          <Button
            variant="neutral"
            size="md"
            className="flex lg:inline-flex lg:w-auto"
            onClick={handleEdit}
            startIcon={<EditIcon width={18} />}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* ✅ Address Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Address
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your address information to keep your profile up-to-date.
            </p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <InputForm
                  label="Country"
                  name="country"
                  type="text"
                  register={register}
                  error={errors.country?.message}
                />
                <InputForm
                  label="City/State"
                  name="city_or_state"
                  type="text"
                  register={register}
                  error={errors.city_or_state?.message}
                />
                <InputForm
                  label="Address"
                  name="address"
                  type="text"
                  register={register}
                  error={errors.address?.message}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" type="button" variant="outline-primary" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
