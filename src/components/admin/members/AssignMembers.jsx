import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserCheck } from 'lucide-react';

// Components
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import Modal from '@/components/ui/modal/Modal';
import Button from '@/components/ui/Button';
import ButtonCard from '@/components/ui/ButtonCard';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import RoleSelection from '@/components/admin/members/RoleSelection';

// Hooks & Utils
import { useModal } from '@/hooks/useModal';
import { useMembersByRole } from '@/queries/member.query';
import { useAssignMembers } from '@/queries/member.query';

// ============================================================================
// CONSTANTS
// ============================================================================

const INITIAL_VALUES = {
    member_ids: [],
    followup_leader_ids: [],
};

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const AssignMemberSchema = yup.object().shape({
    member_ids: yup
        .array()
        .of(yup.number().positive())
        .min(1, 'At least one member is required')
        .required('Members are required'),
    followup_leader_ids: yup
        .array()
        .of(yup.number().positive())
        .min(1, 'At least one follow-up leader is required')
        .required('Follow-up leaders are required'),
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Transform members data to select options
 * @param {Array} members - Array of member objects
 * @param {string} selectedRole - Currently selected role filter
 * @returns {Array} - Array of option objects {value, text}
 */
const transformMembersToOptions = (members, selectedRole) => {
    if (!Array.isArray(members) || members.length === 0) return [];

    const showUnits = selectedRole === 'gloryTeam';

    return members.map(member => {
        const fullName = member.full_name || `${member.first_name} ${member.last_name}`;

        // Only show units if gloryTeam role is selected
        if (showUnits) {
            const units = member.units && Array.isArray(member.units) && member.units.length > 0
                ? member.units.map(unit => unit.name).join(', ')
                : 'No Unit';

            return {
                value: member.id,
                text: `${fullName} (${units})`,
            };
        }

        // For other roles, show name only
        return {
            value: member.id,
            text: fullName,
        };
    });
};

/**
 * Get role display label
 * @param {string} role - Role value
 * @returns {string} - Formatted role label
 */
const getRoleLabel = (role) => {
    const roleLabels = {
        all: 'All Users',
        admin: 'Admins',
        leader: 'Leaders',
        member: 'Members',
        firstTimer: 'First Timers',
        pastor: 'Pastors',
        gloryTeam: 'Glory Team',
        nonGloryTeam: 'Non-Glory Team',
    };

    return roleLabels[role] || 'Users';
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AssignMembers = () => {
    const {
        isOpen: isOpenModal,
        openModal,
        closeModal
    } = useModal();

    return (
        <>
            <ButtonCard
                onClick={openModal}
                color="green"
                type="button"
                icon={<UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
                description="Assign members for followups, mentorship and discipleship."
            >
                Assign Members
            </ButtonCard>

            <Modal
                maxWidth="max-w-4xl"
                title="Assign Members"
                description="Select members and assign them to leaders, admins, or pastors for follow-up and discipleship."
                isOpen={isOpenModal}
                onClose={closeModal}
            >
                <AssignMembersForm onClose={closeModal} />
            </Modal>
        </>
    );
};

// ============================================================================
// FORM COMPONENT
// ============================================================================

const AssignMembersForm = ({ onClose }) => {
    // ========================================
    // STATE
    // ========================================
    const [selectedMemberRole, setSelectedMemberRole] = useState('all');
    const [selectedLeaderRole, setSelectedLeaderRole] = useState('all');

    // ========================================
    // FORM SETUP
    // ========================================
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(AssignMemberSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange',
    });

    // Watch form values for display purposes
    const memberIds = watch('member_ids');
    const leaderIds = watch('followup_leader_ids');

    // ========================================
    // QUERIES & MUTATIONS - MEMBERS
    // ========================================
    const {
        data: members = [],
        isLoading: isLoadingMembers,
        isError: isMembersError,
        error: membersError
    } = useMembersByRole({ role: selectedMemberRole });

    // ========================================
    // QUERIES & MUTATIONS - LEADERS
    // ========================================
    const {
        data: leaders = [],
        isLoading: isLoadingLeaders,
        isError: isLeadersError,
        error: leadersError
    } = useMembersByRole({ role: selectedLeaderRole });

    // ========================================
    // QUERIES & MUTATIONS - ASSIGNMENT
    // ========================================
    const {
        mutateAsync: assignMembers,
        isPending: isAssigning
    } = useAssignMembers({
        onSuccess: () => {
            onClose?.();
        }
    });

    // ========================================
    // DERIVED DATA
    // ========================================
    const memberOptions = useMemo(() =>
        transformMembersToOptions(members, selectedMemberRole),
        [members, selectedMemberRole]
    );

    const leaderOptions = useMemo(() =>
        transformMembersToOptions(leaders, selectedLeaderRole),
        [leaders, selectedLeaderRole]
    );

    const memberRoleLabel = useMemo(() =>
        getRoleLabel(selectedMemberRole),
        [selectedMemberRole]
    );

    const leaderRoleLabel = useMemo(() =>
        getRoleLabel(selectedLeaderRole),
        [selectedLeaderRole]
    );

    const isFormDisabled = isAssigning || isSubmitting;
    const hasNoMembers = !isLoadingMembers && memberOptions.length === 0;
    const hasNoLeaders = !isLoadingLeaders && leaderOptions.length === 0;
    const hasDataError = isMembersError || isLeadersError;

    // ========================================
    // EVENT HANDLERS
    // ========================================

    /**
     * Handle member role change
     * Clears selected member_ids when role changes
     */
    const handleMemberRoleChange = useCallback((role) => {
        setSelectedMemberRole(role);
        setValue('member_ids', [], { shouldValidate: false });
    }, [setValue]);

    /**
     * Handle leader role change
     * Clears selected followup_leader_ids when role changes
     */
    const handleLeaderRoleChange = useCallback((role) => {
        setSelectedLeaderRole(role);
        setValue('followup_leader_ids', [], { shouldValidate: false });
    }, [setValue]);

    /**
     * Handle form submission
     * Assigns members to follow-up leaders
     */
    const onSubmit = useCallback(async (formData) => {
        try {
            const payload = {
                member_ids: formData.member_ids,
                followup_leader_ids: formData.followup_leader_ids,
            };

            await assignMembers(payload);
        } catch (error) {
            // Error handling is done in the mutation hook
            console.error('Failed to assign members:', error);
        }
    }, [assignMembers]);

    /**
     * Handle cancel
     */
    const handleCancel = useCallback(() => {
        if (!isFormDisabled) {
            onClose?.();
        }
    }, [onClose, isFormDisabled]);

    // ========================================
    // RENDER HELPERS
    // ========================================
    const getMemberPlaceholder = () => {
        if (isLoadingMembers) return "Loading members...";
        if (hasNoMembers) return `No ${memberRoleLabel.toLowerCase()} available`;
        return "Select members to assign...";
    };

    const getLeaderPlaceholder = () => {
        if (isLoadingLeaders) return "Loading leaders...";
        if (hasNoLeaders) return `No ${leaderRoleLabel.toLowerCase()} available`;
        return "Select follow-up leaders...";
    };

    // ========================================
    // RENDER
    // ========================================
    return (
        <Animated animation="fade-up" className="space-y-5 w-full">
            {/* Error Messages */}
            {hasDataError && (
                <Message
                    data={{
                        message: membersError?.message || leadersError?.message || 'Failed to load data'
                    }}
                    variant="error"
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* SECTION 1: Members to Assign */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-5 border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                        <h3 className="text-base font-semibold text-blue-900 dark:text-blue-100">
                            Step 1: Select Members to Assign
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {/* Member Role Selection */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter Members by Role
                            </label>
                            <RoleSelection
                                selectedRole={selectedMemberRole}
                                onRoleChange={handleMemberRoleChange}
                                disabled={isFormDisabled}
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Choose a group to filter available members. Currently showing: <strong>{memberRoleLabel}</strong>
                            </p>
                        </div>

                        {/* Members Selection */}
                        <div className="w-full">
                            <MultiSelectForm
                                label={`Select Members (${memberRoleLabel})`}
                                expandParent
                                name="member_ids"
                                options={memberOptions}
                                register={register}
                                setValue={setValue}
                                error={errors.member_ids?.message}
                                disabled={isFormDisabled || isLoadingMembers || hasNoMembers}
                                placeholder={getMemberPlaceholder()}
                                required
                            />

                            {/* Helper text for Glory Team */}
                            {selectedMemberRole === 'gloryTeam' && !isLoadingMembers && !hasNoMembers && (
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1.5">
                                    💡 Glory Team members are displayed with their assigned units in brackets.
                                </p>
                            )}

                            {/* Loading State */}
                            {isLoadingMembers && (
                                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1.5 flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading {memberRoleLabel.toLowerCase()}...
                                </p>
                            )}

                            {/* No Members Warning */}
                            {hasNoMembers && (
                                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    No {memberRoleLabel.toLowerCase()} available. Try selecting a different group.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Assign To (Follow-up Leaders) */}
                <div className="bg-green-50/50 dark:bg-green-900/10 rounded-xl p-5 border-2 border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-2 mb-4">
                        <div className="w-1 h-6 bg-green-500 rounded-full flex-shrink-0 mt-0.5"></div>
                        <div>
                            <h3 className="text-base font-semibold text-green-900 dark:text-green-100">
                                Step 2: Assign To (Select Leaders)
                            </h3>
                            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                                The members selected above will be assigned TO the leaders you select here for follow-up and discipleship.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Leader Role Selection */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Role
                            </label>
                            <RoleSelection
                                selectedRole={selectedLeaderRole}
                                onRoleChange={handleLeaderRoleChange}
                                disabled={isFormDisabled}
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Select a role to filter who will receive the assigned members. Currently showing: <strong>{leaderRoleLabel}</strong>
                            </p>
                        </div>

                        {/* Follow-up Leaders Selection */}
                        <div className="w-full">
                            <MultiSelectForm
                                label={`Assign To These People (${leaderRoleLabel})`}
                                expandParent
                                name="followup_leader_ids"
                                options={leaderOptions}
                                register={register}
                                setValue={setValue}
                                error={errors.followup_leader_ids?.message}
                                disabled={isFormDisabled || isLoadingLeaders || hasNoLeaders}
                                placeholder={getLeaderPlaceholder()}
                                required
                            />
                            {selectedLeaderRole === 'gloryTeam' ? (
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1.5">
                                    💡 Glory Team members are displayed with their assigned units in brackets.
                                </p>
                            ) : (
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1.5">
                                    💡 These people will become responsible for following up with the members selected in Step 1.
                                </p>
                            )}

                            {/* Loading State */}
                            {isLoadingLeaders && (
                                <p className="text-sm text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading {leaderRoleLabel.toLowerCase()}...
                                </p>
                            )}

                            {/* No Leaders Warning */}
                            {hasNoLeaders && (
                                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    No {leaderRoleLabel.toLowerCase()} available. Try selecting a different group.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Info */}
                {(memberIds?.length > 0 || leaderIds?.length > 0) && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
                                    Assignment Summary
                                </h4>

                                <div className="bg-white dark:bg-gray-800/50 rounded-md p-3 space-y-2">
                                    {/* Members being assigned */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <p className="text-xs text-gray-700 dark:text-gray-300">
                                            <strong>{memberIds?.length || 0}</strong> {memberRoleLabel.toLowerCase()} selected
                                        </p>
                                    </div>

                                    {/* Arrow indicator */}
                                    {memberIds?.length > 0 && leaderIds?.length > 0 && (
                                        <div className="flex items-center gap-2 pl-2">
                                            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            <p className="text-xs text-purple-600 dark:text-purple-400 italic">
                                                will be assigned to
                                            </p>
                                        </div>
                                    )}

                                    {/* Leaders receiving assignments */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <p className="text-xs text-gray-700 dark:text-gray-300">
                                            <strong>{leaderIds?.length || 0}</strong> {leaderRoleLabel.toLowerCase()} selected
                                        </p>
                                    </div>
                                </div>

                                {memberIds?.length > 0 && leaderIds?.length > 0 && (
                                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-3 flex items-start gap-1.5">
                                        <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <span>
                                            Each of the <strong>{memberIds.length}</strong> member{memberIds.length !== 1 ? 's' : ''} will be assigned to all <strong>{leaderIds.length}</strong> selected {leaderRoleLabel.toLowerCase()} for follow-up.
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleCancel}
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
                        disabled={isFormDisabled || hasDataError || hasNoMembers || hasNoLeaders}
                        className="flex-1"
                        aria-label="Assign members"
                    >
                        {isFormDisabled ? 'Assigning...' : 'Assign Members'}
                    </Button>
                </div>
            </form>
        </Animated>
    );
};

export default AssignMembers;