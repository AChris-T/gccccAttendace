import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import { PersonalInformation } from '@/components/dashboard/members/PersonalInformation';
import { ProfessionalInformation } from '@/components/dashboard/members/ProfessionalInformation';
import { ProfileHeader } from '@/components/dashboard/members/ProfileHeader';
import { SocialMediaLinks } from '@/components/dashboard/members/SocialMediaLinks';
import { UnitInformation } from '@/components/dashboard/members/UnitInformation';
import { ProfileHeaderSkeleton } from '@/components/skeleton';
import { useMember } from '@/queries/member.query';
import { useState } from 'react';

const MemberProfile = ({ memberId }) => {
    const { data: userData, isLoading, isError, error } = useMember(memberId)
    const [showToolbox, setShowToolbox] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    if (isError) return <Message data={error?.data} />
    return (
        <div className="space-y-6">
            {isLoading ? <ProfileHeaderSkeleton /> :
                <>
                    <ProfileHeader
                        user={userData}
                        onToggleToolbox={setShowToolbox}
                        onToggleProfile={setShowProfile}
                        showToolbox={showToolbox}
                        showProfile={showProfile}
                    />

                    {showProfile && (
                        <Animated animation='fade-up' duration={0.7}>
                            <SocialMediaLinks socialLinks={userData.social_links} />
                            <PersonalInformation user={userData} />
                            <ProfessionalInformation user={userData} />
                            <UnitInformation user={userData} />
                        </Animated>
                    )}

                    {showToolbox && (
                        <Animated animation='fade-up' duration={0.7}>
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Toolbox</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Additional tools and actions will appear here</p>
                            </div>
                        </Animated>
                    )}
                </>}
        </div>
    );
};

export default MemberProfile;