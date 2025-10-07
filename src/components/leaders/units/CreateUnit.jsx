import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputForm from '@/components/form/InputForm';
import MultiSelect from '@/components/form/MultiSelect';
import SingleSelect from '@/components/form/SingleSelect';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useModal } from '@/hooks/useModal';
import { PlusIcon } from '@/icons';
import { useMembers } from '@/queries/member.query';
import { useCreateUnit } from '@/queries/unit.query';
import { unitSchema } from '@/schema';
import { useAuthStore } from '@/store/auth.store';
import { Toast } from '@/lib/toastify';

const CreateUnit = () => {
    const { isAdmin } = useAuthStore();
    const { isOpen, openModal, closeModal } = useModal();
    const { data: members, isLoading: isLoadingMembers } = useMembers();
    const { mutateAsync, isPending } = useCreateUnit();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(unitSchema),
        defaultValues: {
            name: '',
            member_ids: [],
            leader_id: null,
            assistant_leader_id: null,
        },
    });

    const memberOptions = useMemo(() => {
        if (!members) return [];
        return members.map(member => ({
            value: member.id,
            text: member.full_name,
        }));
    }, [members]);

    const handleCreateUnit = async (data) => {
        try {
            await mutateAsync(data);
            reset();
            closeModal();
        } catch (error) {
            Toast.error('Failed to create unit:', error);
        }
    };

    const handleModalClose = () => {
        reset();
        closeModal();
    };

    return (
        <>
            <Button onClick={openModal} startIcon={<PlusIcon />} variant="success">
                Unit
            </Button>

            <Modal maxWidth="max-w-md" title="New Unit" isOpen={isOpen} onClose={handleModalClose}>
                <form className="flex flex-col mt-3 md:mt-5 gap-4" onSubmit={handleSubmit(handleCreateUnit)}>
                    <InputForm
                        label="Unit Name"
                        name="name"
                        type="text"
                        placeholder="Unit name"
                        register={register}
                        error={errors.name?.message}
                    />

                    <MultiSelect
                        label="Unit Members"
                        name="member_ids"
                        options={memberOptions}
                        defaultValue={watch('member_ids')}
                        onChange={(value) => setValue('member_ids', value)}
                        disabled={isLoadingMembers}
                        placeholder="Select members..."
                    />

                    {isAdmin && (
                        <>
                            <SingleSelect
                                label="Unit Leader"
                                name="leader_id"
                                options={memberOptions}
                                defaultValue={watch('leader_id')}
                                onChange={(value) => setValue('leader_id', value)}
                                disabled={isLoadingMembers}
                                placeholder="Select leader..."
                            />

                            <SingleSelect
                                label="Unit Assistant Leader"
                                name="assistant_leader_id"
                                options={memberOptions}
                                defaultValue={watch('assistant_leader_id')}
                                onChange={(value) => setValue('assistant_leader_id', value)}
                                disabled={isLoadingMembers}
                                placeholder="Select assistant leader..."
                            />
                        </>
                    )}

                    <Button loading={isPending} size="sm" type="submit">
                        Create
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default CreateUnit;