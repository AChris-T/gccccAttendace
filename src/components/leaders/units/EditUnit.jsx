import InputForm from '@/components/form/useForm/InputForm';
import MultiSelect from '@/components/form/MultiSelect';
import SingleSelect from '@/components/form/SingleSelect';
import Button from '@/components/ui/Button';
import { Toast } from '@/lib/toastify';
import { useMembers } from '@/queries/member.query';
import { useUpdateUnit } from '@/queries/unit.query'; // Changed from useCreateUnit
import { unitSchema } from '@/schema';
import { useAuthStore } from '@/store/auth.store';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditUnit = ({ unit, onClose }) => {
    const { isAdmin } = useAuthStore();

    // Memoize initial member IDs to prevent array reference changes
    const initialMemberIds = useMemo(() =>
        unit?.members?.map(member => member.id) || [],
        [unit?.members]
    );

    // Initialize state with unit data properly
    const [assignData, setAssignData] = useState({
        member_ids: initialMemberIds,
        leader_id: unit?.leader_id || null,
        assistant_leader_id: unit?.assistant_leader_id || null
    });

    const { data: members, isLoading: isLoadingMembers } = useMembers();
    const { mutateAsync, isPending } = useUpdateUnit(unit?.id); // Use update mutation with unit ID

    // Memoized member options for dropdowns
    const filteredMembers = useMemo(() => {
        if (!members) return [];
        return members.map(member => ({
            value: member.id,
            text: `${member.first_name} ${member.last_name}`.trim() || member.email
        }));
    }, [members]);

    // Form setup with proper default values
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(unitSchema),
        defaultValues: {
            name: unit?.name || ''
        }
    });

    // Optimized update handler
    const handleFieldChange = (field, value) => {
        setAssignData(prev => ({ ...prev, [field]: value }));
    };

    // Submit handler
    const handleUpdateUnit = async (formData) => {
        const payload = {
            id: unit.id,
            name: formData.name,
            member_ids: assignData.member_ids,
            leader_id: assignData.leader_id,
            assistant_leader_id: assignData.assistant_leader_id,
        };

        try {
            await mutateAsync(payload);
            onClose?.();
        } catch (error) {
            Toast.error('Failed to update unit:', error)
        }
    };

    return (
        <form
            className="flex flex-col gap-4 mt-4 md:mt-6"
            onSubmit={handleSubmit(handleUpdateUnit)}
        >
            {/* Unit Name Input */}
            <div>
                <InputForm
                    label="Unit Name"
                    name="name"
                    type="text"
                    placeholder="Enter unit name"
                    register={register}
                    error={errors.name?.message}
                />
            </div>

            {/* Unit Members Multi-Select */}
            <div>
                <MultiSelect
                    label="Unit Members"
                    name="members"
                    options={filteredMembers}
                    defaultSelected={initialMemberIds}
                    onChange={(value) => handleFieldChange('member_ids', value)}
                    disabled={isLoadingMembers}
                    placeholder="Select members..."
                />
            </div>

            {/* Admin-only fields */}
            {isAdmin && (
                <>
                    <div>
                        <SingleSelect
                            label="Unit Leader"
                            name="leader"
                            options={filteredMembers}
                            defaultValue={assignData.leader_id}
                            onChange={(value) => handleFieldChange('leader_id', value)}
                            disabled={isLoadingMembers}
                            placeholder="Select a leader..."
                        />
                    </div>

                    <div>
                        <SingleSelect
                            label="Assistant Leader"
                            name="assistant_leader"
                            options={filteredMembers}
                            defaultValue={assignData.assistant_leader_id}
                            onChange={(value) => handleFieldChange('assistant_leader_id', value)}
                            disabled={isLoadingMembers}
                            placeholder="Select an assistant leader..."
                        />
                    </div>
                </>
            )}

            {/* Submit Button */}
            <div className="mt-2">
                <Button
                    loading={isPending}
                    size="sm"
                    type="submit"
                    className="w-full md:w-auto"
                >
                    Update Unit
                </Button>
            </div>
        </form>
    );
};

export default EditUnit;