"use client";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  EditIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
} from "@/icons";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/auth.store";
import { useUpdateProfile } from "@/queries/user.query";
import Button from "@/components/ui/Button";
import { Toast } from "@/lib/toastify";
import Badge from "@/components/ui/Badge";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import InputForm from "@/components/form/useForm/InputForm";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

const SOCIAL_PLATFORMS = [
  {
    platform: "facebook",
    Icon: FacebookIcon,
    label: "Facebook",
    color: "hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-300 dark:hover:border-blue-600",
  },
  {
    platform: "twitter",
    Icon: TwitterIcon,
    label: "X (Twitter)",
    color: "hover:bg-gray-50 dark:hover:bg-gray-500/10 hover:border-gray-400 dark:hover:border-gray-600",
  },
  {
    platform: "linkedin",
    Icon: LinkedInIcon,
    label: "LinkedIn",
    color: "hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500",
  },
  {
    platform: "instagram",
    Icon: InstagramIcon,
    label: "Instagram",
    color: "hover:bg-pink-50 dark:hover:bg-pink-500/10 hover:border-pink-300 dark:hover:border-pink-600",
  },
];

const ROLE_CONFIGS = {
  admin: {
    label: "Admin",
    color: "error",
    icon: ShieldIcon,
    bgClass: "from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950",
  },
  leader: {
    label: "Leader",
    color: "warning",
    icon: StarIcon,
    bgClass: "from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800",
  },
  member: {
    label: "Member",
    color: "primary",
    icon: UsersIcon,
    bgClass: "from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700",
  },
};

const ProfileBanner = ({ roleConfig, onEdit }) => (
  <div className={`h-24 bg-gradient-to-br ${roleConfig.bgClass} relative overflow-hidden`}>
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
    <div className="absolute top-4 right-4">
      <Button
        variant="neutral"
        size="sm"
        onClick={onEdit}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-lg"
      >
        <EditIcon width={16} className="text-gray-700 dark:text-gray-300" />
      </Button>
    </div>
  </div>
);

const ProfileAvatar = ({ user, roleConfig, onUpload, isUploading }) => {
  const RoleIcon = roleConfig.icon;

  return (
    <div className="relative flex-shrink-0">
      <Avatar
        onError={(error) => Toast.error(error)}
        loading={isUploading}
        onUpload={onUpload}
        size="2xl"
        src={user?.avatar || ""}
        name={user?.initials || ""}
        className="ring-4 ring-white dark:ring-gray-800 shadow-xl"
      />
      <div
        className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br ${roleConfig.bgClass} flex items-center justify-center ring-4 ring-white dark:ring-gray-800`}
      >
        <RoleIcon width={16} height={16} className="text-white" />
      </div>
    </div>
  );
};

const ProfileInfo = ({ user, roleConfig }) => (
  <div className="flex-1 min-w-0 text-center sm:text-left">
    <div className="mb-1">
      <h4 className="text-2xl font-bold  text-gray-900 dark:text-white mb-1 tracking-tight break-words">
        {user?.full_name}
      </h4>
    </div>
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
      <Badge variant="solid" size="sm" color={roleConfig.color} className="font-semibold">
        {roleConfig.label}
      </Badge>
      {user?.memberUnits?.length > 0 && (
        <>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          {user.memberUnits.map((unit) => (
            <Badge key={unit.id || unit.name} variant="solid" size="sm" color="light">
              {unit.name}
            </Badge>
          ))}
        </>
      )}
    </div>
  </div>
);

const SocialLinkCard = ({ Icon, label, color, url }) => {
  const isActive = !!url;

  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onClick={(e) => !url && e.preventDefault()}
      className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive
        ? `border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 ${color} cursor-pointer`
        : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 cursor-not-allowed opacity-60"
        }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-transform ${isActive ? "group-hover:scale-110" : ""
          }`}
      >
        <Icon
          width={20}
          height={20}
          className={isActive ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
          {label}
        </p>
        <p
          className={`text-xs ${isActive ? "text-gray-900 dark:text-gray-200 font-semibold" : "text-gray-400 dark:text-gray-600"
            } truncate`}
        >
          {isActive ? "Connected" : "Not linked"}
        </p>
      </div>
      {isActive && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
    </a >
  );
};

const SocialMediaSection = ({ user }) => (
  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/60">
    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Social Media</h5>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {SOCIAL_PLATFORMS.map(({ platform, Icon, label, color }) => (
        <SocialLinkCard
          key={platform}
          Icon={Icon}
          label={label}
          color={color}
          url={user?.[platform]}
        />
      ))}
    </div>
  </div>
);

const SocialMediaForm = ({ register, errors }) => (
  <div className="grid grid-cols-1 gap-5">
    {SOCIAL_PLATFORMS.map(({ platform, Icon, label }) => (
      <div key={platform} className="relative">
        <div className="absolute left-3 top-[38px] z-10">
          <Icon width={18} height={18} className="text-gray-400" />
        </div>
        <InputForm
          label={label}
          name={platform}
          type="url"
          placeholder={`https://${platform}.com/yourprofile`}
          register={register}
          error={errors[platform]?.message}
          className="pl-11"
        />
      </div>
    ))}
  </div>
);

const EditSocialModal = ({ isOpen, onClose, roleConfig, onSubmit, isPending, register, errors }) => (
  <Modal description="Update your social media links to stay connected." title={'Edit Social Media'} isOpen={isOpen} onClose={onClose}>
    <form className="flex flex-col" onSubmit={onSubmit}>
      <div className="px-2 overflow-y-auto custom-scrollbar">
        <SocialMediaForm register={register} errors={errors} />
      </div>

      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button size="sm" type="button" variant="outline-primary" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button size="sm" type="submit" disabled={isPending} className="min-w-[120px]">
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
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
);

export default function UserMetaCard() {
  const { user, isAdmin, isLeader, setUser } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();
  const { mutateAsync, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facebook: user?.facebook || "",
      twitter: user?.twitter || "",
      linkedin: user?.linkedin || "",
      instagram: user?.instagram || "",
    },
  });

  const roleConfig = useMemo(() => {
    if (isAdmin) return ROLE_CONFIGS.admin;
    if (isLeader) return ROLE_CONFIGS.leader;
    return ROLE_CONFIGS.member;
  }, [isAdmin, isLeader]);

  const handleUpdateUserAvatar = async (avatar) => {
    try {
      await mutateAsync({
        id: user?.id,
        avatar,
        folder: "users",
      });
      Toast.success("Avatar updated successfully");
    } catch (error) {
      Toast.error("Failed to update avatar");
    }
  };

  const handleEdit = () => {
    reset({
      facebook: user?.facebook || "",
      twitter: user?.twitter || "",
      linkedin: user?.linkedin || "",
      instagram: user?.instagram || "",
    });
    openModal();
  };

  const handleSave = async (data) => {
    try {
      const response = await mutateAsync(data);

      if (response?.data?.user) {
        setUser(response.data.user);
      } else if (response?.data) {
        setUser(response.data);
      }

      Toast.success("Social links updated successfully");
      closeModal();
    } catch (error) {
      Toast.error("Failed to update social links");
    }
  };

  return (
    <>
      <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-colors mb-6">
        <ProfileBanner roleConfig={roleConfig} onEdit={handleEdit} />

        <div className="px-5 pb-5 lg:px-6 lg:pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-4">
            <ProfileAvatar
              user={user}
              roleConfig={roleConfig}
              onUpload={handleUpdateUserAvatar}
              isUploading={isPending}
            />
            <ProfileInfo user={user} roleConfig={roleConfig} />
          </div>

          <SocialMediaSection user={user} />
        </div>
      </div>

      <EditSocialModal
        isOpen={isOpen}
        onClose={closeModal}
        roleConfig={roleConfig}
        onSubmit={handleSubmit(handleSave)}
        isPending={isPending}
        register={register}
        errors={errors}
      />
    </>
  );
}