import Switch from '@/components/form/Switch'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { CheckIcon, TrashIcon, UserIcon } from '@/icons'
import { Toast } from '@/lib/toastify'
import { useUpdateFirstTimer } from '@/queries/firstTimer.query'
import { Link } from 'react-router-dom'

const Header = ({ firstTimerData, showToolbox, setShowToolbox, showProfile, setShowProfile }) => {
    const { mutateAsync, isPending: isUpdateFirstTimerPending } = useUpdateFirstTimer()

    const handleUpdateFirstTimer = async (avatar) => {
        try {
            await mutateAsync({
                id: firstTimerData.id,
                secondary_avatar: avatar,
                folder: 'firsttimers'
            });
        } catch (error) { }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start">
                <div>
                    <Avatar
                        onError={(error) => {
                            Toast.error(error)
                        }}
                        size='3xl'
                        loading={isUpdateFirstTimerPending}
                        shape='square'
                        src={firstTimerData?.secondary_avatar || ''}
                        onUpload={handleUpdateFirstTimer}
                        name={firstTimerData?.initials || ''}
                    />
                </div>
                <div className="space-y-2">
                    <Switch onChange={setShowToolbox} defaultChecked={showToolbox} label={'Show ToolBox'} />
                    <Switch onChange={setShowProfile} defaultChecked={showProfile} label={'Show Profile'} />
                </div>
            </div>
            <div className='space-y-3 mt-3'>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {firstTimerData?.full_name || 'N/A'}
                </h1>
                <Link to={`mailto:${firstTimerData?.email}`} className="hover:underline text-sm block text-gray-500 dark:text-gray-400">
                    {firstTimerData?.email || 'No email provided'}
                </Link>
                <div className='flex flex-wrap items-center gap-3 md:gap-5'>
                    {firstTimerData?.follow_up_status && (
                        <Badge
                            size='md'
                            color={firstTimerData.follow_up_status.color}
                        >
                            {firstTimerData.follow_up_status.title}
                        </Badge>
                    )}
                    {firstTimerData?.status === 'deactivated' && (
                        <Badge
                            startIcon={<TrashIcon />}
                            size='md'
                            color='error'
                        >
                            Deactivated
                        </Badge>
                    )}
                    {firstTimerData?.status === 'active' && (
                        <Badge
                            startIcon={<CheckIcon />}
                            size='md'
                            color='success'
                        >
                            Active
                        </Badge>
                    )}
                    {firstTimerData?.assigned_to_member && <Badge color='primary' size="md">
                        <UserIcon width={15} height={15} /> {firstTimerData?.assigned_to_member?.full_name}
                    </Badge>}
                </div>
            </div>
        </div>
    )
}

export default Header