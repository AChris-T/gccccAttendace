import TextAreaForm from '@/components/form/TextAreaForm'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@/components/ui/Button';
import { firstTimerNotesSchema } from '@/schema';
import { useUpdateFirstTimer } from '@/queries/firstTimer.query';

const EditNotesAdditionalInformation = ({ firstTimerData, onClose }) => {
    const { mutateAsync, isPending } = useUpdateFirstTimer()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(firstTimerNotesSchema),
        mode: "onTouched",
        defaultValues: {
            pastorate_call: firstTimerData?.pastorate_call || '',
            visitation_report: firstTimerData?.visitation_report || '',
            notes: firstTimerData?.notes || '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = { ...data, id: firstTimerData?.id }
            await mutateAsync(payload)
            onClose?.()
        } catch (error) { }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl w-full max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextAreaForm
                    label="Pastorate Call Report"
                    name="pastorate_call"
                    register={register}
                    error={errors.pastorate_call?.message}
                    placeholder="Enter detailed report about the call..."
                />
                <TextAreaForm
                    label="Visitation Report"
                    name="visitation_report"
                    register={register}
                    error={errors.visitation_report?.message}
                    placeholder="Enter detailed report about the visitation..."
                />
                <TextAreaForm
                    label="Additional Notes"
                    name="notes"
                    register={register}
                    error={errors.notes?.message}
                    placeholder="Enter additional notes here..."
                />

                <Button
                    type="submit"
                    loading={isSubmitting || isPending}
                    size='sm'
                >
                    Update
                </Button>
            </form>
        </div>
    )
}

export default EditNotesAdditionalInformation