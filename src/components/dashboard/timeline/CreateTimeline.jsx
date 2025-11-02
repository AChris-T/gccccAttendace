import Message from '@/components/common/Message';
import SelectForm from '@/components/form/useForm/SelectForm'
import Button from '@/components/ui/Button';
import { timelineSchema } from '@/schema';
import { useAuthStore } from '@/store/auth.store';
import { getFilteredCommentTypes } from '@/utils/helper';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import TextAreaForm from '@/components/form/TextAreaForm';
import DateForm from '@/components/form/useForm/DateForm';
import { useCreateFollowupsFeedbacks } from '@/queries/followupFeedback.query';
import { useParams } from 'react-router-dom';

const CreateTimeline = ({ onClose }) => {
    const { memberId, firstTimerId } = useParams();
    const user_id = memberId || firstTimerId;

    const { isAdmin, isLeader, isMember, user } = useAuthStore()
    const followupCommentTypes = getFilteredCommentTypes({ isAdmin, isLeader, isMember });
    const { mutateAsync, isPending, isError, error } = useCreateFollowupsFeedbacks(user_id);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(timelineSchema),
    });

    const typeValue = watch('type');
    const showServiceDate = typeValue?.toLowerCase().includes('service');

    const handleCreateTimeline = async (data) => {
        try {
            const payload = { ...data, created_by: user.id, user_id }
            await mutateAsync(payload);
            onClose?.()
        } catch (error) { }
    }
    return (
        <form onSubmit={handleSubmit(handleCreateTimeline)} className="space-y-5">
            <div className="relative">
                <SelectForm name="type"
                    label='Comment type'
                    placeholder="Comment Type"
                    register={register}
                    options={followupCommentTypes}
                    error={errors.type?.message} />
            </div>

            {showServiceDate && (
                <DateForm
                    label="Service Date"
                    name="service_date"
                    register={register}
                    error={errors.service_date?.message}
                />
            )}

            <TextAreaForm
                label="Followup feedback"
                name="note"
                register={register}
                required={true}
                rows={6}
                cols={40}
                placeholder="Type your message here..."
                error={errors.note?.message}
            />

            {isError && (
                <Message
                    variant="error"
                    data={error?.data}
                />
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
                <Button className="flex-1" loading={isPending} type="submit" variant='primary'>
                    Send
                </Button>
            </div>
        </form>
    )
}

export default CreateTimeline