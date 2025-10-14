import Switch from '@/components/form/Switch'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { CheckIcon, TrashIcon } from '@/icons'
import { Toast } from '@/lib/toastify'
import { useUpdateFirstTimer } from '@/queries/firstTimer.query'

const Header = ({ firstTimerData, showToolbox, setShowToolbox, showProfile, setShowProfile }) => {
    const { mutate, isPending: isUpdateFirstTimerPending } = useUpdateFirstTimer()

    const handleUpdateFirstTimer = (avatar) => {
        mutate({
            id: firstTimerData.id,
            avatar,
            folder: 'firsttimers'
        })
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar
                            onError={(error) => {
                                Toast.error(error)
                            }}
                            size='3xl'
                            loading={isUpdateFirstTimerPending}
                            shape='square'
                            src={firstTimerData?.avatar || ''}
                            onUpload={handleUpdateFirstTimer}
                            name={firstTimerData?.initials || ''}
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {firstTimerData?.full_name || 'N/A'}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {firstTimerData?.email || 'No email provided'}
                        </p>
                        <div className='flex flex-wrap items-center gap-3 mt-2'>
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
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <Switch onChange={setShowToolbox} defaultChecked={showToolbox} label={'Show ToolBox'} />
                    <Switch onChange={setShowProfile} defaultChecked={showProfile} label={'Show Profile'} />
                </div>
            </div>
        </div>
    )
}

export default Header