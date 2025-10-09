import { useFirstTimer } from '@/queries/firstTimer.query';
import Message from '@/components/common/Message';
import { FirstTimerProfileSkeleton } from '@/components/skeleton';
import PersonalInformation from '@/components/dashboard/firsttimer/PersonalInformation';
import VisitInformation from '@/components/dashboard/firsttimer/VisitInformation';
import SpiritualInformation from '@/components/dashboard/firsttimer/SpiritualInformation';
import NotesAdditionalInformation from '@/components/dashboard/firsttimer/NotesAdditionalInformation';
import FeedbackTimeline from '@/components/dashboard/timeline/Timeline';
import LocationContact from '@/components/dashboard/firsttimer/LocationContact';
import FollowupDetails from '@/components/dashboard/firsttimer/FollowupDetails';
import ToolBox from '@/components/dashboard/firsttimer/ToolBox';
import Header from '@/components/dashboard/firsttimer/Header';


const FirstTimerProfile = ({ firstTimerId }) => {
    const { data: firstTimerData = {}, isLoading, isError, error } = useFirstTimer(firstTimerId)

    if (isError) return <Message data={error?.data} variant='error' />
    if (isLoading) return <FirstTimerProfileSkeleton />

    return (
        <div className="min-h-screen">
            <Header firstTimerData={firstTimerData} />

            <ToolBox firstTimerData={firstTimerData} />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div className="lg:col-span-1 space-y-6">
                    <PersonalInformation firstTimerData={firstTimerData} />
                    <LocationContact firstTimerData={firstTimerData} />
                    <VisitInformation firstTimerData={firstTimerData} />
                    <SpiritualInformation firstTimerData={firstTimerData} />
                    <FollowupDetails firstTimerData={firstTimerData} />
                    <NotesAdditionalInformation firstTimerData={firstTimerData} />
                </div>
                <FeedbackTimeline />
            </div>
        </div>
    );
};

export default FirstTimerProfile;