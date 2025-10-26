import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from '@/components/form/useForm/InputForm';
import SingleSelect from '@/components/form/useForm/SingleSelectForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useModal } from '@/hooks/useModal';
import { PlusIcon } from '@/icons';
import { useMembers } from '@/queries/member.query';
import { useCreateUnit } from '@/queries/unit.query';
import { unitSchema } from '@/schema';
import { useAuthStore } from '@/store/auth.store';
import { Toast } from '@/lib/toastify';
import ButtonCard from '@/components/ui/ButtonCard';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';

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
            <div className='max-w-sm mb-5'>
                <ButtonCard description={'Create new unit, add members and unit leader.'} icon={<PlusIcon />} size='sm' onClick={openModal} variant="success">
                    Create Unit
                </ButtonCard>
            </div>

            <Modal maxWidth="max-w-md" title="New Unit" isOpen={isOpen} onClose={handleModalClose}>
                <form className="w-full space-y-5" onSubmit={handleSubmit(handleCreateUnit)}>
                    <InputForm
                        label="Unit Name"
                        name="name"
                        type="text"
                        placeholder="Unit name"
                        register={register}
                        error={errors.name?.message}
                    />

                    <MultiSelectForm
                        label="Unit Members"
                        name="member_ids"
                        expandParent
                        options={memberOptions}
                        register={register}
                        setValue={setValue}
                        error={errors.member_ids?.message}
                        disabled={isLoadingMembers}
                        placeholder="Select members..."
                    />

                    {isAdmin && (
                        <>
                            <SingleSelect
                                label="Unit Leader"
                                name="leader_id"
                                expandParent
                                register={register}
                                setValue={setValue}
                                options={memberOptions}
                                disabled={isLoadingMembers}
                                placeholder="Select leader..."
                            />

                            <SingleSelect
                                expandParent
                                register={register}
                                setValue={setValue}
                                label="Unit Assistant Leader"
                                name="assistant_leader_id"
                                options={memberOptions}
                                disabled={isLoadingMembers}
                                placeholder="Select assistant leader..."
                            />
                        </>
                    )}
                    <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                        <Button
                            variant='ghost'
                            onClick={closeModal}
                            disabled={isPending}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button className="flex-1" loading={isPending} type="submit">
                            Create
                        </Button>

                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateUnit;