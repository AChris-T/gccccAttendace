import { AttendanceIcon2, DeleteIcon, EditIcon, EmailIcon, GenderIcon, PhoneIcon, UnitIcon, VerticalDotsIcon } from "../../../icons"
import { useState, useMemo, useCallback } from "react";
import { useAuthStore } from "@/store/auth.store";
import { assistantGradients, avatarGradients, gradients } from "@/utils/data";
import { formatDate } from "@/utils/helper";
import Button from "@/components/ui/Button";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/modal/Modal";
import { useDeleteUnit } from "@/queries/unit.query";
import { EmptyState } from "@/components/common/EmptyState";
import EditUnit from "@/components/leaders/units/EditUnit";
import { DeleteConfirmation } from "@/components/ui/DeleteConfirmation";
import Avatar from "@/components/ui/Avatar";

const UnitHeader = ({ unit, index, hasPermission, onMenuToggle, isMenuOpen }) => (
    <div className={`bg-gradient-to-r ${gradients[index]} p-6 relative`}>
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-3">
                    <UnitIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{unit.name}</h2>
            </div>

            {hasPermission && (
                <MenuButton
                    isOpen={isMenuOpen}
                    onToggle={onMenuToggle}
                />
            )}
        </div>
    </div>
);

const MenuButton = ({ isOpen, onToggle }) => (
    <div className="relative">
        <button
            onClick={onToggle}
            className="p-0 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            aria-label="Unit options menu"
        >
            <VerticalDotsIcon />
        </button>
    </div>
);

const MenuDropdown = ({ isAdmin, onEdit, onDelete, onClose }) => (
    <>
        <div
            className="fixed inset-0 z-10"
            onClick={onClose}
            aria-hidden="true"
        />
        <div className="absolute top-12 right-7 mt-2 w-40 bg-white dark:bg-gray-700 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden">
            <button
                onClick={onEdit}
                className="border-b border-gray-100 dark:border-gray-600 w-full flex items-center gap-3 p-3 text-left transition-colors duration-150 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
                <EditIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Edit Unit</span>
            </button>
            {isAdmin && (
                <button
                    onClick={onDelete}
                    className="w-full flex items-center gap-3 p-3 text-left transition-colors duration-150 text-red-600 dark:text-red-400 hover:bg-gray-300 dark:hover:bg-red-900/20 border-gray-100 dark:border-gray-600 border-b"
                >
                    <DeleteIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete Unit</span>
                </button>
            )}
        </div>
    </>
);

const LeaderInfo = ({ leader, title }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <Avatar src={leader?.avatar} name={leader?.initials} size="sm" />
        <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{title}</p>
            <p className="text-gray-900 dark:text-white font-semibold truncate">{leader?.full_name}</p>
        </div>
    </div>
);

const MembersCount = ({ count, onClick, hasPermission }) => (
    <div
        onClick={hasPermission ? onClick : null}
        className={`${hasPermission ? 'cursor-pointer' : 'cursor-not-allowed'} relative  flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30`}
        role="button"
        tabIndex={0}
    >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm">
                <AttendanceIcon2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Members</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{count}</p>
            </div>
        </div>
    </div>
);

const MembersList = ({ members }) => (
    <div>
        {members?.length ? (
            members.map((member, index) => (
                <div key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm hover:shadow-lg 
                 border border-gray-100 dark:border-gray-700 transition-all duration-300 
                   overflow-hidden mb-2">
                    {/* Gradient Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-purple-500/10 
                      dark:from-blue-400/5 dark:to-purple-400/5 rounded-full blur-2xl 
                      group-hover:scale-150 transition-transform duration-500 z-0" />

                    {/* Number Badge */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-purple-600 
                      rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-xs sm:text-sm">{index + 1}</span>
                    </div>

                    <div className="relative z-10 ml-6 sm:ml-8">
                        {/* Name */}
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 
                       group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {member.first_name} {member.last_name}
                        </h3>

                        {/* Contact Information */}
                        <div className="space-y-2">
                            {/* Email */}
                            <a
                                href={`mailto:${member?.email}`}
                                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 
                       hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 
                       group/link w-fit"
                            >
                                <span className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg 
                           group-hover/link:bg-blue-100 dark:group-hover/link:bg-blue-900/40 
                           transition-colors duration-200">
                                    <EmailIcon />
                                </span>
                                <span className="truncate max-w-[200px] sm:max-w-none">{member?.email}</span>
                            </a>

                            {/* Phone */}
                            <a
                                href={`tel:${member?.phone_number}`}
                                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 
                       hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 
                       group/link w-fit"
                            >
                                <span className="p-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg 
                           group-hover/link:bg-green-100 dark:group-hover/link:bg-green-900/40 
                           transition-colors duration-200">
                                    <PhoneIcon />
                                </span>
                                <span>{member?.phone_number}</span>
                            </a>

                            {/* Gender */}
                            {member?.gender && (
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    <span className="p-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <GenderIcon gender={member?.gender} />
                                    </span>
                                    <span className="capitalize">{member?.gender}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <EmptyState />
        )}
    </div>
);

// Main component
const UnitCard = ({ unit, index }) => {
    const { isAdmin } = useAuthStore();
    const { mutate, isPending, isSuccess } = useDeleteUnit();
    const { isOpen: isOpenDeleteModal, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
    const { isOpen: isOpenShowMemberModal, openModal: openShowMemberModal, closeModal: closeShowMemberModal } = useModal();
    const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useModal();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Memoized values
    const hasPermission = useMemo(
        () => unit?.isLeader || unit?.isAssistantLeader || isAdmin,
        [unit?.isLeader, unit?.isAssistantLeader, isAdmin]
    );

    const isDisabled = useMemo(
        () => !unit?.isLeader && !unit?.isAssistantLeader && !isAdmin,
        [unit?.isLeader, unit?.isAssistantLeader, isAdmin]
    );

    const cardClassName = useMemo(
        () => `${isDisabled ? 'grayscale cursor-not-allowed' : ''} bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700`,
        [isDisabled]
    );

    // Callbacks
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleEdit = useCallback(() => {
        closeMenu();
        openEditModal();
    }, [closeMenu, openEditModal]);

    const handleDelete = useCallback(() => {
        closeMenu();
        openDeleteModal();
    }, [closeMenu, openDeleteModal]);

    const handleDeleteConfirm = useCallback(() => {
        if (!hasPermission) return
        mutate(unit?.id);
    }, [mutate, unit?.id]);

    return (
        <>
            <div className={cardClassName}>
                <div className="relative">
                    <UnitHeader
                        unit={unit}
                        index={index}
                        hasPermission={hasPermission}
                        onMenuToggle={toggleMenu}
                        isMenuOpen={isMenuOpen}
                    />
                    {isMenuOpen && (
                        <MenuDropdown
                            isAdmin={isAdmin}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onClose={closeMenu}
                        />
                    )}
                </div>

                <div className="p-5 space-y-3">
                    <LeaderInfo
                        leader={unit?.leader}
                        index={index}
                        title="Unit Leader"
                        gradientSet={avatarGradients}
                    />

                    <LeaderInfo
                        leader={unit?.assistantLeader}
                        index={index}
                        title="Assistant Leader"
                        gradientSet={assistantGradients}
                    />

                    <LeaderInfo
                        leader={unit?.assistantLeader2}
                        index={index}
                        title="Assistant Leader (2)"
                        gradientSet={assistantGradients}
                    />

                    <MembersCount
                        hasPermission={hasPermission}
                        count={unit.members_count}
                        onClick={openShowMemberModal}
                    />
                </div>

                <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Last updated: {formatDate(unit?.updated_at)}
                    </p>
                </div>
            </div>

            <Modal
                title={`List of Members in ${unit?.name}`}
                isOpen={isOpenShowMemberModal}
                onClose={closeShowMemberModal}
            >
                <MembersList members={unit?.members} />
            </Modal>

            <Modal
                title={`Delete Confirmation`}
                isOpen={isOpenDeleteModal}
                onClose={closeDeleteModal}
                description={`Are you sure you want to delete ${unit?.name || "this item"} ?`}
            >
                <DeleteConfirmation
                    name={unit?.name}
                    isSuccess={isSuccess}
                />
                <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                    <Button
                        variant='ghost'
                        onClick={closeDeleteModal}
                        disabled={isPending}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        loading={isPending}
                        variant="danger" className="flex-1"
                    >
                        Delete
                    </Button>
                </div>
            </Modal>

            <Modal
                title={`Edit ${unit?.name}`}
                isOpen={isOpenEditModal}
                onClose={closeEditModal}
            >
                <EditUnit unit={unit} onClose={closeEditModal} />
            </Modal>
        </>
    );
};

export default UnitCard;