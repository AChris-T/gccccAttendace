import Animated from '@/components/common/Animated';
import { EmptyState } from '@/components/common/EmptyState';
import Message from '@/components/common/Message';
import ToolBox from '@/components/dashboard/firsttimer/ToolBox';
import MemberToolbox from '@/components/dashboard/members/MemberToolbox';
import { PersonalInformation } from '@/components/dashboard/members/PersonalInformation';
import { ProfessionalInformation } from '@/components/dashboard/members/ProfessionalInformation';
import { ProfileHeader } from '@/components/dashboard/members/ProfileHeader';
import { SocialMediaLinks } from '@/components/dashboard/members/SocialMediaLinks';
import { UnitInformation } from '@/components/dashboard/members/UnitInformation';
import FeedbackTimeline from '@/components/dashboard/timeline/FeedbackTimeline';
import { ProfileHeaderSkeleton } from '@/components/skeleton';
import { useMember } from '@/queries/member.query';
import { useState } from 'react';

const MemberProfile = ({ memberId }) => {
    const { data: memberData, isLoading, isError, error } = useMember(memberId)
    const [showToolbox, setShowToolbox] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    if (isError) return <Message data={error?.data} />
    const isActive = memberData?.status !== 'deactivated';

    return (
        <div className="space-y-6">
            {isLoading ? <ProfileHeaderSkeleton /> :
                <>
                    <ProfileHeader
                        user={memberData}
                        onToggleToolbox={setShowToolbox}
                        onToggleProfile={setShowProfile}
                        showToolbox={showToolbox}
                        showProfile={showProfile}
                    />
                    {showProfile && (
                        <Animated animation='fade-up' duration={0.7}>
                            <SocialMediaLinks socialLinks={memberData.social_links} />
                            <PersonalInformation user={memberData} />
                            <ProfessionalInformation user={memberData} />
                            <UnitInformation user={memberData} />
                        </Animated>
                    )}
                    {showToolbox && (
                        <Animated animation='fade-up' duration={0.7}>
                            <MemberToolbox memberData={memberData} />
                        </Animated>
                    )}
                    {isActive ? <Animated animation='fade-up'> <FeedbackTimeline /></Animated> : <EmptyState title='Followup deactivated' />}
                </>}
        </div>
    );
};

export default MemberProfile;