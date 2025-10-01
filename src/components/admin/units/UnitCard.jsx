import useGlassmorphismTheme from "@/hooks/useGlassmorphismTheme";
import { useModal } from "../../../hooks/useModal";
import { AssignIcon, AttendanceIcon2, UserIcon, UserIcon2 } from "../../../icons"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal";

const UnitCard = ({ unit, index }) => {
    const { isOpen, openModal, closeModal } = useModal();
    const theme = useGlassmorphismTheme(index);

    return (
        <>
            <div className="flex justify-center">
                <div className="relative w-full transform transition-all duration-500 ease-out hover:scale-105 group">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>

                    {/* Main card with glassmorphism */}
                    <div className={`relative backdrop-blur-xl ${theme.cardBg} rounded-3xl border border-white/30 dark:border-white/20 shadow overflow-hidden`}>
                        {/* Header gradient overlay */}
                        <div className={`absolute top-0 left-0 right-0 h-32 ${theme.glassOverlay}`}></div>

                        {/* Content */}
                        <div className="relative p-6 space-y-5">
                            {/* Unit Title */}
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center mb-3">
                                    {/* <IconComponent className={`w-8 h-8 mr-3 ${theme.textPrimary}`} /> */}
                                    <h2 className={`text-2xl font-bold tracking-wide drop-shadow-sm ${theme.textPrimary}`}>
                                        {theme.name}
                                    </h2>
                                </div>
                                <div className={`h-1 w-16 bg-gradient-to-r ${theme.accentLine} rounded-full mx-auto`}></div>
                            </div>

                            {/* Leaders Section */}
                            <div className="space-y-4">
                                {/* Unit Leader */}
                                <div className={`${theme.leaderBg} rounded-xl p-4 border transition-all duration-300`}>
                                    <div className="flex items-center mb-2">
                                        {/* <Crown className="w-4 h-4 text-yellow-500 dark:text-yellow-400 mr-2" /> */}
                                        <span className={`${theme.leaderLabel} font-semibold text-xs uppercase tracking-wider`}>Unit Leader</span>
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 drop-shadow-sm ${theme.textPrimary}`}>{'unitData.leader.name'}</h3>
                                    <div className="space-y-1.5 text-sm">
                                        <div className={`flex items-center ${theme.textSecondary}`}>
                                            {/* <Mail className="w-3.5 h-3.5 mr-2 text-cyan-500 dark:text-cyan-400" /> */}
                                            <span className="drop-shadow-sm">emails</span>
                                        </div>
                                        <div className={`flex items-center ${theme.textSecondary}`}>
                                            {/* <Phone className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400" /> */}
                                            <span className="drop-shadow-sm">'phone number</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assistant Leader */}
                                <div className={`${theme.assistantBg} rounded-xl p-4 border transition-all duration-300`}>
                                    <div className="flex items-center mb-2">
                                        {/* <Shield className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" /> */}
                                        <span className={`${theme.assistantLabel} font-semibold text-xs uppercase tracking-wider`}>Assistant Leader</span>
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 drop-shadow-sm ${theme.textPrimary}`}>{'unitData.assistantLeader.name'}</h3>
                                    <div className="space-y-1.5 text-sm">
                                        <div className={`flex items-center ${theme.textSecondary}`}>
                                            {/* <Mail className="w-3.5 h-3.5 mr-2 text-cyan-500 dark:text-cyan-400" /> */}
                                            <span className="drop-shadow-sm">{'unitData.assistantLeader.email'}</span>
                                        </div>
                                        <div className={`flex items-center ${theme.textSecondary}`}>
                                            {/* <Phone className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400" /> */}
                                            <span className="drop-shadow-sm">{'unitData.assistantLeader.phone'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Members Count */}
                            <div className={`${theme.membersBg} rounded-xl p-4 border`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <UserIcon2 className={`w-5 h-5 mr-2 ${theme.textPrimary}`} />
                                        <span className={`font-semibold drop-shadow-sm ${theme.textPrimary}`}>Total Members</span>
                                    </div>
                                    <div className={`text-2xl font-bold drop-shadow-sm ${theme.textPrimary}`}>
                                        {20}
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Actions Button */}
                            {/* <div className="pt-2">
                                <button
                                    onClick={toggleActions}
                                    className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border backdrop-blur-sm ${isDarkMode
                                        ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30'
                                        : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900 border-gray-900/20 hover:border-gray-900/30'
                                        }`}
                                >
                                    <Settings className="w-4 h-4" />
                                    <span>Actions</span>
                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                            </div> */}

                            {/* Action Buttons - Collapsible */}
                            {/* <div className={`
                  transition-all duration-500 ease-in-out overflow-hidden
                  ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                                <div className="grid grid-cols-2 gap-2 pt-4">
                                    <button
                                        onClick={() => handleAction('edit')}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg text-sm"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                        <span>Edit</span>
                                    </button>

                                    <button
                                        onClick={() => handleAction('delete')}
                                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg text-sm"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Delete</span>
                                    </button>

                                    <button
                                        onClick={() => handleAction('assign-leader')}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 shadow-lg text-sm"
                                    >
                                        <Crown className="w-3.5 h-3.5" />
                                        <span>Leader</span>
                                    </button>

                                    <button
                                        onClick={() => handleAction('assign-assistant')}
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 shadow-lg text-sm"
                                    >
                                        <Shield className="w-3.5 h-3.5" />
                                        <span>Asst.</span>
                                    </button>

                                    <button
                                        onClick={() => handleAction('assign-members')}
                                        className="col-span-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg text-sm"
                                    >
                                        <UserPlus className="w-3.5 h-3.5" />
                                        <span>Assign Members</span>
                                    </button>
                                </div>
                            </div> */}
                        </div>

                        {/* Decorative elements */}
                        <div className={`absolute top-3 right-3 w-16 h-16 bg-gradient-to-br ${theme.gradient} opacity-10 rounded-full blur-xl`}></div>
                        <div className={`absolute bottom-3 left-3 w-12 h-12 bg-gradient-to-br ${theme.gradient} opacity-15 rounded-full blur-lg`}></div>
                    </div>
                </div>
            </div>



            {/* <div className="relative border shadow flex flex-col items-center rounded-[20px] w-full mx-auto p-4 bg-white bg-clip-border shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                <div className="relative flex w-full justify-center rounded-xl bg-cover" >
                    <GradientCard height="h-[70px]" index={index}>
                        <p className="text-white text-xl font-semibold">{unit?.name} Unit</p>
                    </GradientCard>
                </div>
                <div className="mb-5 mt-10 flex flex-wrap gap-4">
                    <div className="flex flex-col items-center">
                        <h4 className="text-xl font-bold text-navy-500 dark:text-white">
                            Adela Parkson
                        </h4>
                        <p className="text-sm font-normal text-gray-500">Unit Leader</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h4 className="text-xl font-bold text-navy-500 dark:text-white">
                            Adela Parkson
                        </h4>
                        <p className="text-sm font-normal text-gray-500">Unit Leader</p>
                    </div>
                </div>
                <div className="my-5 flex flex-wrap items-center gap-4">
                    <Button title="Assign Leader, Assistant Leader and Members" onClick={openModal} size="sm" className="rounded shadow" variant="outline-success">Members <span className="font-semibold">{unit?.members_count}</span> <AttendanceIcon2 />  </Button>

                    <Button title="Assign Leader, Assistant Leader and Members" onClick={openModal} size="sm" className="rounded shadow" variant="outline-primary" startIcon={<AssignIcon />}>Assign <UserIcon />  </Button>
                </div>
            </div> */}

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Edit Address
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Update your details to keep your profile up-to-date.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="px-2 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline-primary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button size="sm">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default UnitCard