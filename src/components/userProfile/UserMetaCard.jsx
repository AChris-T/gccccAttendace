"use client";

import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useAuthStore } from "../../store/auth.store";
import InputForm from "../form/InputForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  EditIcon,
  CameraIcon,
} from "../../icons";
import { useUploadAvatar, useUpdateProfile } from "../../queries/user.query";
import { useForm } from "react-hook-form";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user, setUser } = useAuthStore();
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();

  const [file, setFile] = useState(null);

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
      bio: user?.bio || "",
    },
  });

  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile({
    onSuccess: (res) => {
      setUser(res?.data || user);
      closeModal();
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const preview = URL.createObjectURL(selectedFile);
    setFile(preview);

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    uploadAvatar(formData, {
      onSuccess: (data) => {
        setFile(data?.avatar_url || preview);
        setUser({ ...user, avatar_url: data?.avatar_url });
      },
    });
  };

  const normalizeUrl = (value, platform) => {
    if (!value) return "";
    if (value.startsWith("http")) return value;

    const handle = value.replace(/^@/, "").replace(/^https?:\/\//, "").trim();
    switch (platform) {
      case "facebook":
        return `https://facebook.com/${handle}`;
      case "twitter":
        return `https://twitter.com/${handle}`;
      case "linkedin":
        return `https://linkedin.com/in/${handle}`;
      case "instagram":
        return `https://instagram.com/${handle}`;
      default:
        return `https://${handle}`;
    }
  };


  const handleSave = (data) => {
    const formattedData = {
      ...data,
      facebook: normalizeUrl(data.facebook, "facebook"),
      twitter: normalizeUrl(data.twitter, "twitter"),
      linkedin: normalizeUrl(data.linkedin, "linkedin"),
      instagram: normalizeUrl(data.instagram, "instagram"),
    };

    updateProfile(formattedData, {
      onSuccess: () => {
        setUser({
          ...user,
          ...formattedData,
        });

        closeModal();
      },
    });
  };


  const handleEdit = () => {
    reset({
      facebook: user?.facebook || "",
      twitter: user?.twitter || "",
      linkedin: user?.linkedin || "",
      instagram: user?.instagram || "",
      bio: user?.bio || "",
    });
    openModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="relative w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 group">
              <img
                key={user?.avatar_url || file}
                src={file || user?.avatar_url || "/images/user/owner.jpg"}
                alt="user"
                className="object-cover w-full h-full"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
              >
                <CameraIcon className="text-white w-6 h-6" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs rounded-full">
                  Uploading...
                </div>
              )}
            </div>

            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.first_name} {user?.last_name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email || "N/A"}
                </p>

              </div>
            </div>

            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              {["facebook", "twitter", "linkedin", "instagram"].map((platform) => {
                const url = user?.[platform];
                const Icon =
                  platform === "facebook"
                    ? FacebookIcon
                    : platform === "twitter"
                      ? TwitterIcon
                      : platform === "linkedin"
                        ? LinkedInIcon
                        : InstagramIcon;

                return (
                  <a
                    key={platform}
                    href={url || "#"}
                    target={url ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-gray-300 bg-white shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Icon />
                  </a>
                );
              })}
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
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div
          className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your social media links and bio.
            </p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <InputForm label="Facebook" name="facebook" type="text" register={register} error={errors.facebook?.message} />
                <InputForm label="X.com" name="twitter" type="text" register={register} error={errors.twitter?.message} />
                <InputForm label="LinkedIn" name="linkedin" type="text" register={register} error={errors.linkedin?.message} />
                <InputForm label="Instagram" name="instagram" type="text" register={register} error={errors.instagram?.message} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline-primary" type="button" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
