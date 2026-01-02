import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import Button from '@/components/ui/Button';
import ButtonCard from '@/components/ui/ButtonCard';
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import { useModal } from '@/hooks/useModal';
import { AssignIcon } from '@/icons';
import { useAssignMembers, useMembers, useMembersByRole } from '@/queries/member.query';
import { AssignMemberSchema } from '@/schema';
import Modal from '@/components/ui/modal/Modal';
import { Toast } from '@/lib/toastify';

const VALID_ROLES = ['admin', 'leader', 'member', 'firstTimer', 'pastor', 'all'];

const ROLE_OPTIONS = [
    {
        value: 'all',
        text: 'All Users',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        description: 'All system users'
    },
    {
        value: 'admin',
        text: 'Admins',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        description: 'Church administrators'
    },
    {
        value: 'leader',
        text: 'Leaders',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        ),
        description: 'Team leaders'
    },
    {
        value: 'member',
        text: 'Members',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        description: 'Regular members'
    },
    {
        value: 'firstTimer',
        text: 'First Timers',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
        ),
        description: 'New visitors'
    },
    {
        value: 'pastor',
        text: 'Pastors',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        description: 'Church pastors'
    },
];

const INITIAL_VALUES = {
    member_ids: [],
    followup_leader_ids: [],
};

const AssignMembers = () => {
    const {
        isOpen: isOpenAssignModal,
        openModal: openAssignModal,
        closeModal: closeAssignModal
    } = useModal();

    return (
        <>
            <ButtonCard
                onClick={openAssignModal}
                color="green"
                type="button"
                icon={<AssignIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                description="Assign members for followups, mentorship and discipleship."
            >
                Assign Members
            </ButtonCard>

            <Modal
                title="Assign Members"
                description="Assign members for followups, mentorship and discipleship."
                isOpen={isOpenAssignModal}
                onClose={closeAssignModal}
            >
                <AssigningMembers onClose={closeAssignModal} />
            </Modal>
        </>
    );
};

const AssigningMembers = ({ onClose }) => {
    const [selectedRole, setSelectedRole] = useState('all');

    // Fetch all members for member_ids selection
    const {
        data: allMembers = [],
        isLoading: isLoadingAllMembers,
        isError: isMembersError,
        error: membersError
    } = useMembers();

    // Fetch members by role for followup_leader_ids selection
    const shouldFetchByRole = selectedRole !== 'all';

    const {
        data: roleBasedMembers = [],
        isLoading: isLoadingRoleMembers,
        isError: isRoleMembersError,
        error: roleMembersError
    } = useMembersByRole(selectedRole, {
        enabled: shouldFetchByRole,
    });

    // Fetch all members when 'all' role is selected
    const {
        data: allLeaders = [],
        isLoading: isLoadingAllLeaders,
        isError: isAllLeadersError,
        error: allLeadersError
    } = useMembers({}, {
        enabled: !shouldFetchByRole,
    });

    const {
        mutateAsync: assignMembers,
        isPending: isAssigning,
        isError: isAssignError,
        error: assignError
    } = useAssignMembers();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(AssignMemberSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange',
    });

    // Memoize member options for member_ids
    const memberOptions = useMemo(() => {
        if (!allMembers?.length) return [];
        return allMembers.map(member => ({
            value: member.id,
            text: member.full_name || `${member.first_name} ${member.last_name}`,
        }));
    }, [allMembers]);

    // Memoize leader options for followup_leader_ids based on selected role
    const leaderOptions = useMemo(() => {
        const membersToUse = selectedRole === 'all' ? allLeaders : roleBasedMembers;

        if (!membersToUse?.length) return [];

        return membersToUse.map(leader => ({
            value: leader.id,
            text: leader.full_name || `${leader.first_name} ${leader.last_name}`,
        }));
    }, [selectedRole, allLeaders, roleBasedMembers]);

    // Determine loading state based on selected role
    const isLoadingLeaders = selectedRole === 'all'
        ? isLoadingAllLeaders
        : isLoadingRoleMembers;

    // Determine error state based on selected role
    const isLeadersError = selectedRole === 'all'
        ? isAllLeadersError
        : isRoleMembersError;

    const leadersError = selectedRole === 'all'
        ? allLeadersError
        : roleMembersError;

    const onSubmit = useCallback(
        async (formData) => {
            try {
                const payload = {
                    member_ids: formData.member_ids,
                    followup_leader_ids: formData.followup_leader_ids,
                };

                await assignMembers(payload);
                Toast.success('Members assigned successfully');
                onClose?.();
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    'Failed to assign members';
                Toast.error(errorMessage);
            }
        },
        [assignMembers, onClose]
    );

    // Handle role change
    const handleRoleChange = useCallback((value) => {
        setSelectedRole(value);
        setValue('followup_leader_ids', [], { shouldValidate: false });
    }, [setValue]);

    const isFormDisabled = isAssigning || isSubmitting;
    const hasDataError = isMembersError || isLeadersError;

    // Get the display label for the selected role
    const selectedRoleLabel = ROLE_OPTIONS.find(r => r.value === selectedRole)?.text || 'Leaders';

    return (
        <Animated animation="fade-up" className="space-y-5 w-full">
            {/* Display assignment error */}
            {isAssignError && (
                <Message
                    data={assignError?.response?.data || { message: assignError?.message }}
                    variant="error"
                />
            )}

            {/* Display data loading errors */}
            {hasDataError && (
                <Message
                    data={{
                        message: membersError?.message || leadersError?.message || 'Failed to load data'
                    }}
                    variant="error"
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Member Selection */}
                <div className="w-full">
                    <MultiSelectForm
                        label="Select Members"
                        expandParent
                        name="member_ids"
                        options={memberOptions}
                        register={register}
                        setValue={setValue}
                        error={errors.member_ids?.message}
                        disabled={isLoadingAllMembers || isFormDisabled}
                        placeholder={
                            isLoadingAllMembers
                                ? "Loading members..."
                                : "Select members to assign..."
                        }
                        required
                    />
                    {isLoadingAllMembers && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Loading members...
                        </p>
                    )}
                </div>

                {/* Role Selection for Follow-up Leaders - Beautiful Button Grid */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                        Select Role for Follow-up Leaders <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {ROLE_OPTIONS.map((role) => {
                            const isSelected = selectedRole === role.value;
                            return (
                                <button
                                    key={role.value}
                                    type="button"
                                    onClick={() => handleRoleChange(role.value)}
                                    disabled={isFormDisabled}
                                    className={`
                    group relative overflow-hidden rounded-lg p-3 text-left transition-all duration-200 ease-out
                    border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900
                    ${isSelected
                                            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 shadow-md scale-[1.02]'
                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                                        }
                    ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}
                  `}
                                    aria-pressed={isSelected}
                                    aria-label={`Select ${role.text}`}
                                >
                                    {/* Selection Indicator */}
                                    <div className={`
                    absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200
                    ${isSelected
                                            ? 'border-blue-500 dark:border-blue-400 bg-blue-500 dark:bg-blue-400 scale-100'
                                            : 'border-gray-300 dark:border-gray-600 bg-transparent scale-0 group-hover:scale-100'
                                        }
                  `}>
                                        {isSelected && (
                                            <svg
                                                className="w-3 h-3 text-white animate-in zoom-in duration-200"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Icon and Content */}
                                    <div className="flex items-start space-x-2.5">
                                        <div className={`
                      flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                      ${isSelected
                                                ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300'
                                                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                                            }
                    `}>
                                            {role.icon}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className={`
                        text-sm font-semibold transition-colors duration-200
                        ${isSelected
                                                    ? 'text-blue-700 dark:text-blue-300'
                                                    : 'text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                                                }
                      `}>
                                                {role.text}
                                            </p>
                                            <p className={`
                        text-xs mt-0.5 transition-colors duration-200 truncate
                        ${isSelected
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-500 dark:text-gray-400'
                                                }
                      `}>
                                                {role.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Effect Overlay */}
                                    <div className={`
                    absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/50 dark:to-blue-900/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                    ${isSelected ? 'hidden' : ''}
                  `} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Follow-up Leader Selection */}
                <div className="w-full">
                    <MultiSelectForm
                        label={`Select Follow-up Leaders (${selectedRoleLabel})`}
                        expandParent
                        name="followup_leader_ids"
                        options={leaderOptions}
                        register={register}
                        setValue={setValue}
                        error={errors.followup_leader_ids?.message}
                        disabled={isLoadingLeaders || isFormDisabled || !leaderOptions.length}
                        placeholder={
                            isLoadingLeaders
                                ? "Loading leaders..."
                                : leaderOptions.length === 0
                                    ? `No ${selectedRoleLabel.toLowerCase()} available`
                                    : "Select follow-up leaders..."
                        }
                        required
                    />
                    {isLoadingLeaders && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Loading {selectedRoleLabel.toLowerCase()}...
                        </p>
                    )}
                    {!isLoadingLeaders && leaderOptions.length === 0 && (
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                            No {selectedRoleLabel.toLowerCase()} available. Try selecting a different role.
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        disabled={isFormDisabled}
                        className="flex-1"
                        aria-label="Cancel assignment"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="success"
                        loading={isFormDisabled}
                        disabled={isFormDisabled || hasDataError}
                        className="flex-1"
                        aria-label="Assign members"
                    >
                        {isFormDisabled ? 'Assigning...' : 'Assign'}
                    </Button>
                </div>
            </form>
        </Animated>
    );
};

export default AssignMembers;