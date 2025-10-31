'use client';

import { useAuthStore } from '@/store/auth.store';
import { useUpdateProfile } from '@/queries/user.query';
import { Toast } from '@/lib/toastify';
import { useModal } from '@/hooks/useModal';
import { useMemo } from 'react';
import ProfileBanner from '@/components/userProfile/meta/ProfileBanner';
import ProfileAvatar from '@/components/userProfile/meta/ProfileAvatar';
import ProfileInfo from '@/components/userProfile/meta/ProfileInfo';
import SocialMediaSection from '@/components/userProfile/meta/SocialMediaSection';
import EditSocialModal from '@/components/userProfile/meta/EditSocialModal';
import { ROLE_CONFIGS } from '@/utils/data';

export default function UserMetaCard() {
  const { user, isAdmin, isLeader } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();
  const { mutateAsync, isPending } = useUpdateProfile();

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
        folder: 'users',
      });
      Toast.success('Avatar updated successfully');
    } catch (error) {
      Toast.error('Failed to update avatar');
    }
  };


  return (
    <>
      <div className="overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-colors mb-6">
        <ProfileBanner roleConfig={roleConfig} onEdit={openModal} />

        <div className="px-5 pb-5 lg:px-6 lg:pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-4">
            <ProfileAvatar
              user={user}
              roleConfig={roleConfig}
              onUpload={handleUpdateUserAvatar}
              isUploading={isPending}
            />
            <ProfileInfo user={user} />
          </div>

          <SocialMediaSection user={user} />
        </div>
      </div>

      <EditSocialModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
}
