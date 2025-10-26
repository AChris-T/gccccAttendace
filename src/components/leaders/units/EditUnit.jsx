import InputForm from '@/components/form/useForm/InputForm';
import Button from '@/components/ui/Button';
import { Toast } from '@/lib/toastify';
import { useMembers } from '@/queries/member.query';
import { useUpdateUnit } from '@/queries/unit.query';
import { updateUnitSchema } from '@/schema';
import { useAuthStore } from '@/store/auth.store';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import SingleSelectForm from '@/components/form/useForm/SingleSelectForm';

const EditUnit = ({ unit, onClose }) => {
    const { isAdmin } = useAuthStore();

    const initialMemberIds = useMemo(() =>
        unit?.members?.map(member => member.id) || [],
        [unit?.members]
    );

    const { data: members, isLoading: isLoadingMembers } = useMembers();
    const { mutateAsync, isPending } = useUpdateUnit();

    const filteredMembers = useMemo(() => {
        if (!members) return [];
        return members.map(member => ({
            value: member.id,
            text: `${member.first_name} ${member.last_name}`.trim() || member.email
        }));
    }, [members]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateUnitSchema),
        defaultValues: {
            name: unit?.name || '',
            member_ids: initialMemberIds,
            leader_id: unit?.leader_id || '',
            assistant_leader_id: unit?.assistant_leader_id || '',
        }
    });


    const handleUpdateUnit = async (data) => {
        try {
            await mutateAsync({ ...data, id: unit.id });
            onClose?.();
        } catch (error) {
            Toast.error('Failed to update unit:', error)
        }
    };

    return (
        <form
            className='w-full space-y-5'
            onSubmit={handleSubmit(handleUpdateUnit)}
        >
            <InputForm
                label="Unit Name"
                name="name"
                type="text"
                placeholder="Enter unit name"
                register={register}
                error={errors.name?.message}
            />

            <MultiSelectForm
                label="Unit Members"
                name="member_ids"
                expandParent
                register={register}
                setValue={setValue}
                options={filteredMembers}
                error={errors.member_ids?.message}
                defaultValue={initialMemberIds}
                disabled={isLoadingMembers}
                placeholder="Select members..."
            />

            {isAdmin && (
                <>
                    <SingleSelectForm
                        label="Unit Leader"
                        name="leader_id"
                        expandParent
                        register={register}
                        setValue={setValue}
                        options={filteredMembers}
                        defaultValue={unit?.leader_id}
                        disabled={isLoadingMembers}
                        error={errors.leader_id?.message}
                        placeholder="Select a leader..."
                    />
                    <SingleSelectForm
                        expandParent
                        register={register}
                        setValue={setValue}
                        label="Assistant Leader"
                        name="assistant_leader_id"
                        options={filteredMembers}
                        defaultValue={unit?.assistant_leader_id}
                        disabled={isLoadingMembers}
                        error={errors.assistant_leader_id?.message}
                        placeholder="Select an assistant leader..."
                    />
                </>
            )}
            <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                <Button
                    variant='ghost'
                    onClick={onClose}
                    disabled={isPending}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    loading={isPending}
                    type="submit"
                    className="flex-1"
                >
                    Update Unit
                </Button>
            </div>
        </form>
    );
};

export default EditUnit;