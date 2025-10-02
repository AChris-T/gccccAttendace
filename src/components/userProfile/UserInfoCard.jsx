"use client";

import { useModal } from "../../hooks/useModal";
import { EditIcon } from "../../icons";
import { useAuthStore } from "../../store/auth.store";
import InputForm from "../form/InputForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../../queries/profile.query";

export default function UserInfoCard() {
  const { user, setUser } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      gender: user?.gender || "",
      date_of_birth: user?.date_of_birth || "",
      bio: user?.bio || "",
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
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      gender: user?.gender || "",
      date_of_birth: user?.date_of_birth || "",
      bio: user?.bio || "",
    });
    openModal();
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
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.first_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.last_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.phone_number}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Gender
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.gender || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Date of Birth
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.date_of_birth || "N/A"}
              </p>
            </div>
          </div>
        </div>

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

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
            <div className="custom-scrollbar px-2 pb-3">
              <div className="mt-3">

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <InputForm
                    label="First Name"
                    name="first_name"
                    type="text"
                    register={register}
                    error={errors.first_name?.message}
                  />

                  <InputForm
                    label="Last Name"
                    name="last_name"
                    type="text"
                    register={register}
                    error={errors.last_name?.message}
                  />

                  <div>
                    <InputForm
                      label="Email Address"
                      name="email"
                      type="email"
                      register={register}
                      error={errors.email?.message}
                      disabled
                    />
                  </div>

                  <div>
                    <InputForm
                      label="Phone Number"
                      name="phone_number"
                      type="text"
                      register={register}
                      error={errors.phone_number?.message}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                      Gender
                    </label>
                    <select
                      {...register("gender")}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                    {errors.gender && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  {/* ✅ Date of Birth */}
                  <div>
                    <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register("date_of_birth")}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90"
                    />
                    {errors.date_of_birth && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.date_of_birth.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                type="button"
                variant="outline-primary"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button size="sm" type="submit" loading={isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
