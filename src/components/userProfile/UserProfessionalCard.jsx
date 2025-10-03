"use client";

import { useModal } from "../../hooks/useModal";
import InputForm from "../form/InputForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import { useUpdateProfile } from "../../queries/user.query";
import { EditIcon } from "../../icons";

export default function UserProfessionalCard() {
  const { user } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  // ✅ setup form with default values
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: user?.education || "",
      field_of_study: user?.field_of_study || "",
      occupation: user?.occupation || "",
    },
  });

  // ✅ mutation hook
  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => closeModal(),
  });

  // ✅ submit handler
  const handleSave = (data) => {
    updateProfile(data);
  };

  // ✅ edit handler
  const handleEdit = () => {
    reset({
      education: user?.education || "",
      field_of_study: user?.field_of_study || "",
      occupation: user?.occupation || "",
    });
    openModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 text-lg">Professional Information</h3>
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

        {/* Info Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Education</p>
            <p className="font-medium text-gray-800 dark:text-white/90">
              {user?.education || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Field of Study</p>
            <p className="font-medium text-gray-800 dark:text-white/90">
              {user?.field_of_study || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Occupation</p>
            <p className="font-medium text-gray-800 dark:text-white/90">
              {user?.occupation || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Modal for Editing */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Professional Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your education, field of study, or occupation details.
            </p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <InputForm
                  label="Education"
                  name="education"
                  type="text"
                  register={register}
                  error={errors.education?.message}
                />
                <InputForm
                  label="Field of Study"
                  name="field_of_study"
                  type="text"
                  register={register}
                  error={errors.field_of_study?.message}
                />
                <InputForm
                  label="Occupation"
                  name="occupation"
                  type="text"
                  register={register}
                  error={errors.occupation?.message}
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
