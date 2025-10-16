"use client";

import { useModal } from "../../hooks/useModal";
import {
  EditIcon,
  UserIcon,
  EmailIcon,
  PhoneIcon,
  GenderIcon,
  CalendarIcon,
  LocationIcon,
  MapIcon
} from "../../icons";
import { useAuthStore } from "../../store/auth.store";
import InputForm from "../form/useForm/InputForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../../queries/user.query";

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

  const personalInfo = [
    {
      label: "First Name",
      value: user?.first_name,
      icon: UserIcon,
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-500/10",
      gradientClass: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700"
    },
    {
      label: "Last Name",
      value: user?.last_name,
      icon: UserIcon,
      colorClass: "text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-50 dark:bg-indigo-500/10",
      gradientClass: "from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700"
    },
    {
      label: "Email Address",
      value: user?.email,
      icon: EmailIcon,
      colorClass: "text-violet-600 dark:text-violet-400",
      bgClass: "bg-violet-50 dark:bg-violet-500/10",
      gradientClass: "from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700"
    },
    {
      label: "Phone",
      value: user?.phone_number,
      icon: PhoneIcon,
      colorClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50 dark:bg-emerald-500/10",
      gradientClass: "from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700"
    },
    {
      label: "Gender",
      value: user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : null,
      icon: GenderIcon,
      colorClass: "text-purple-600 dark:text-purple-400",
      bgClass: "bg-purple-50 dark:bg-purple-500/10",
      gradientClass: "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700"
    },
    {
      label: "Date of Birth",
      value: user?.date_of_birth,
      icon: CalendarIcon,
      colorClass: "text-pink-600 dark:text-pink-400",
      bgClass: "bg-pink-50 dark:bg-pink-500/10",
      gradientClass: "from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700"
    },
  ];

  const locationInfo = [
    {
      label: "Country",
      value: user?.country,
      icon: LocationIcon,
      colorClass: "text-cyan-600 dark:text-cyan-400",
      bgClass: "bg-cyan-50 dark:bg-cyan-500/10",
      gradientClass: "from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700"
    },
    {
      label: "City/State",
      value: user?.city_or_state,
      icon: MapIcon,
      colorClass: "text-teal-600 dark:text-teal-400",
      bgClass: "bg-teal-50 dark:bg-teal-500/10",
      gradientClass: "from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700"
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
            size="md"
            className="flex items-center gap-2 transition-all hover:scale-105"
            onClick={handleEdit}
            startIcon={<EditIcon width={18} />}
          >
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </div>

        {/* Personal Info Section */}
        <div className="px-5 py-5 lg:px-6 lg:py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:gap-5">
            {personalInfo.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.label}
                  className="group relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${field.gradientClass} transition-transform group-hover:scale-110 flex-shrink-0`}>
                      <Icon
                        width={18}
                        height={18}
                        className="text-white"
                        fill="currentColor"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1.5 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {field.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 break-words">
                        {field.value || (
                          <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location Section */}
        <div className="px-5 pb-5 lg:px-6 lg:pb-6">
          <div className="p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800/50">
            <h4 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
              <LocationIcon width={18} height={18} className="text-gray-500" />
              Location Information
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
              {locationInfo.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.label} className="flex items-start gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${field.gradientClass} flex-shrink-0`}>
                      <Icon
                        width={16}
                        height={16}
                        className="text-white"
                        fill="currentColor"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {field.label}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                        {field.value || (
                          <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Address */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700/60">
              <p className="mb-1.5 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Address
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                {user?.address || (
                  <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                    No address provided
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700">
                <EditIcon width={24} className="text-white" fill="currentColor" />
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Edit Personal Information
                </h4>
              </div>
            </div>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7 pl-0.5">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
            <div className="px-2 pb-3 custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <InputForm
                  label="First Name"
                  name="first_name"
                  type="text"
                  placeholder="Enter your first name"
                  register={register}
                  error={errors.first_name?.message}
                />

                <InputForm
                  label="Last Name"
                  name="last_name"
                  type="text"
                  placeholder="Enter your last name"
                  register={register}
                  error={errors.last_name?.message}
                />

                <InputForm
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  register={register}
                  error={errors.email?.message}
                  disabled
                />

                <InputForm
                  label="Phone Number"
                  name="phone_number"
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  register={register}
                  error={errors.phone_number?.message}
                  disabled
                />

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register("date_of_birth")}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.date_of_birth && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.date_of_birth.message}
                    </p>
                  )}
                </div>
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
        </div>
      </Modal>
    </>
  );
}