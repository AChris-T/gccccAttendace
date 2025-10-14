import TextAreaForm from '@/components/form/TextAreaForm'
import CheckboxForm from '@/components/form/useForm/CheckboxForm'
import Button from '@/components/ui/Button'
import { useUpdateFirstTimer } from '@/queries/firstTimer.query'
import { communityFirstTimerSchema } from '@/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const EditLocation = ({ firstTimerData, onClose }) => {
    const { mutateAsync, isPending } = useUpdateFirstTimer()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(communityFirstTimerSchema),
        mode: "onTouched",
        defaultValues: {
            address: firstTimerData?.address || '',
            located_in_ibadan: firstTimerData?.located_in_ibadan,
            whatsapp_interest: firstTimerData?.whatsapp_interest,
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
        <div className="  dark:bg-gray-900 flex justify-center mt-5">
            <div className="bg-white dark:bg-gray-800 w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <TextAreaForm
                        label="Address"
                        name="address"
                        register={register}
                        error={errors.address?.message}
                        placeholder="Enter your address"
                        required
                    />

                    <CheckboxForm
                        label="Located in Ibadan"
                        name="located_in_ibadan"
                        register={register}
                        error={errors.located_in_ibadan?.message}
                    />

                    <CheckboxForm
                        label="Interest in joining our community"
                        name="whatsapp_interest"
                        register={register}
                        error={errors.whatsapp_interest?.message}
                        required
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
        </div>
    )
}

export default EditLocation