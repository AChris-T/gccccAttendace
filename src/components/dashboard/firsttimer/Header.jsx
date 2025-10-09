import Badge from '@/components/ui/Badge'

const Header = ({ firstTimerData }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {firstTimerData?.name?.split(' ').map(n => n[0])?.join('')}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {firstTimerData.name}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {firstTimerData.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge color={firstTimerData?.follow_up_status?.color} >{firstTimerData?.follow_up_status?.title}</Badge>
                </div>
            </div>
        </div>
    )
}

export default Header