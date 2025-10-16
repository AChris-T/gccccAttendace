"use client";

import { useModal } from "../../hooks/useModal";
import InputForm from "../form/useForm/InputForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import { useUpdateProfile } from "../../queries/user.query";
import { EditIcon, EducationIcon, StudyIcon, OccupationIcon } from "@/icons";

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

  const professionalFields = [
    {
      label: "Education",
      value: user?.education,
      icon: EducationIcon,
      colorClass: "text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-50 dark:bg-indigo-500/10",
      gradientClass: "from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700"
    },
    {
      label: "Field of Study",
      value: user?.field_of_study,
      icon: StudyIcon,
      colorClass: "text-violet-600 dark:text-violet-400",
      bgClass: "bg-violet-50 dark:bg-violet-500/10",
      gradientClass: "from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700"
    },
    {
      label: "Occupation",
      value: user?.occupation,
      icon: OccupationIcon,
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-500/10",
      gradientClass: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700"
    }
  ];

  return (
    <>
      <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-colors mb-6">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/60 lg:px-6 lg:pt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Professional Information
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your educational and career details
            </p>
          </div>
          <Button
            variant="neutral"
            size="md"
            className="flex items-center gap-2 transition-all hover:scale-105"
            onClick={handleEdit}
            startIcon={<EditIcon width={18} />}
          >
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </div>

        {/* Info Display */}
        <div className="px-5 py-5 lg:px-6 lg:py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            {professionalFields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.label}
                  className="group relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${field.gradientClass} transition-transform group-hover:scale-110`}>
                      <Icon
                        width={20}
                        height={20}
                        className="text-white"
                        fill="currentColor"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {field.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 break-words">
                        {field.value || (
                          <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                            Not specified
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Decorative element */}
                  {field.value && (
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${field.bgClass} rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal description="Update your education, field of study, or occupation details." title={'Edit Professional Information'} isOpen={isOpen} onClose={closeModal}>
        <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <InputForm
                label="Education"
                name="education"
                type="text"
                placeholder="e.g., Bachelor's Degree"
                register={register}
                error={errors.education?.message}
              />
              <InputForm
                label="Field of Study"
                name="field_of_study"
                type="text"
                placeholder="e.g., Computer Science"
                register={register}
                error={errors.field_of_study?.message}
              />
              <InputForm
                label="Occupation"
                name="occupation"
                type="text"
                placeholder="e.g., Software Engineer"
                register={register}
                error={errors.occupation?.message}
                className="lg:col-span-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              type="button"
              variant="outline-primary"
              onClick={closeModal}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isPending}
              className="min-w-[120px]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}