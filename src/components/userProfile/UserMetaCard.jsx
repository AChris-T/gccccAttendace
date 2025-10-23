"use client";

import { ShieldIcon, StarIcon, UsersIcon } from "@/icons";
import { useAuthStore } from "@/store/auth.store";
import { useUpdateProfile } from "@/queries/user.query";
import { Toast } from "@/lib/toastify";
import { useModal } from "@/hooks/useModal";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import ProfileBanner from "@/components/userProfile/meta/ProfileBanner";
import ProfileAvatar from "@/components/userProfile/meta/ProfileAvatar";
import ProfileInfo from "@/components/userProfile/meta/ProfileInfo";
import SocialMediaSection from "@/components/userProfile/meta/SocialMediaSection";
import EditSocialModal from "@/components/userProfile/meta/EditSocialModal";

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
        onSubmit={handleSubmit(handleSave)}
        isPending={isPending}
        register={register}
        errors={errors}
      />
    </>
  );
}