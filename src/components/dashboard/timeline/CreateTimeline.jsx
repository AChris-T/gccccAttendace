import Message from '@/components/common/Message';
import SelectForm from '@/components/form/SelectForm'
import TextArea from '@/components/form/TextArea';
import Button from '@/components/ui/Button';
import { useCreateFirstTimersFollowups } from '@/queries/firstTimer.query';
import { timelineSchema } from '@/schema';
import { useAuthStore } from '@/store/auth.store';
import { getFilteredCommentTypes } from '@/utils/helper';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateTimeline = ({ firstTimerId, onClose }) => {
    const { isAdmin, isLeader, isMember, user } = useAuthStore()
    const followupCommentTypes = getFilteredCommentTypes({ isAdmin, isLeader, isMember });
    const { mutateAsync, isPending, isError, error } = useCreateFirstTimersFollowups(firstTimerId);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(timelineSchema),
    });

    const handleCreateTimeline = async (data) => {
        try {
            const payload = { ...data, first_timer_id: firstTimerId, user_id: user.id }
            await mutateAsync(payload);
            onClose?.()
        } catch (error) { }
    }


    return (
        <div className='my-5'>
            <p>Enter your followup feedback</p>
            <form onSubmit={handleSubmit(handleCreateTimeline)} className="space-y-5">
                <div className="relative">
                    <SelectForm name="type"
                        placeholder="Comment Type"
                        register={register}
                        options={followupCommentTypes}
                        error={errors.type?.message} />
                </div>

                <TextArea
                    label="What is your prayer request ?"
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

                <div>
                    <Button loading={isPending} type="submit" variant='primary' size="md">
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateTimeline