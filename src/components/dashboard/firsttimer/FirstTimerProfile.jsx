import { useFirstTimer } from '@/queries/firstTimer.query';
import Message from '@/components/common/Message';
import { FirstTimerProfileSkeleton } from '@/components/skeleton';
import PersonalInformation from '@/components/dashboard/firsttimer/PersonalInformation';
import VisitInformation from '@/components/dashboard/firsttimer/VisitInformation';
import SpiritualInformation from '@/components/dashboard/firsttimer/SpiritualInformation';
import NotesAdditionalInformation from '@/components/dashboard/firsttimer/NotesAdditionalInformation';
import FeedbackTimeline from '@/components/dashboard/timeline/FeedbackTimeline';
import LocationContact from '@/components/dashboard/firsttimer/LocationContact';
import FollowupDetails from '@/components/dashboard/firsttimer/FollowupDetails';
import ToolBox from '@/components/dashboard/firsttimer/ToolBox';
import Header from '@/components/dashboard/firsttimer/Header';
import { EmptyState } from '@/components/common/EmptyState';
import { useState } from 'react';
import Animated from '@/components/common/Animated';

const INFORMATION_SECTIONS = [
    PersonalInformation,
    LocationContact,
    VisitInformation,
    SpiritualInformation,
    FollowupDetails,
    NotesAdditionalInformation,
];

const InformationPanel = ({ firstTimerData }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {INFORMATION_SECTIONS.map((Section, index) => (
            <Section key={index} firstTimerData={firstTimerData} />
        ))}
    </div>
);

const FirstTimerProfile = ({ firstTimerId }) => {
    const [showToolbox, setShowToolbox] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const {
        data: firstTimerData = {},
        isLoading,
        isError,
        error
    } = useFirstTimer(firstTimerId);

    if (isError) {
        return <Message data={error?.data} variant="error" />;
    }

    const isActive = firstTimerData?.status !== 'deactivated';

    return (
        <div className="space-y-6">
            {isLoading ? <FirstTimerProfileSkeleton /> :
                <>
                    <Header
                        showToolbox={showToolbox}
                        setShowToolbox={setShowToolbox}
                        showProfile={showProfile}
                        setShowProfile={setShowProfile}
                        firstTimerData={firstTimerData}
                    />
                    {showToolbox && <Animated animation='fade-up' duration={0.7}><ToolBox firstTimerData={firstTimerData} /></Animated>}
                    {showProfile && <Animated animation='fade-up'> <InformationPanel firstTimerData={firstTimerData} /></Animated>}
                    {isActive ? <Animated animation='fade-up'> <FeedbackTimeline /></Animated> : <EmptyState title='Followup deactivated' />}
                </>
            }
        </div>
    );
};

export default FirstTimerProfile;