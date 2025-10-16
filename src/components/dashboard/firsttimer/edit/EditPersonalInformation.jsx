import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateFirstTimerProfileSchema } from "@/schema";
import InputForm from "@/components/form/useForm/InputForm";
import SelectForm from "@/components/form/useForm/SelectForm";
import CheckboxForm from "@/components/form/useForm/CheckboxForm";
import Button from "@/components/ui/Button";
import { useUpdateFirstTimer } from "@/queries/firstTimer.query";

const EditPersonalInformation = ({ firstTimerData, onClose }) => {
    const { mutateAsync, isPending } = useUpdateFirstTimer()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateFirstTimerProfileSchema),
        mode: "onTouched",
        defaultValues: {
            first_name: firstTimerData?.first_name || null,
            last_name: firstTimerData?.last_name || null,
            email: firstTimerData?.email || null,
            phone_number: firstTimerData?.phone_number || null,
            gender: firstTimerData?.gender || null,
            date_of_birth: firstTimerData.date_of_birth || null,
            occupation: firstTimerData?.occupation || null,
            is_student: firstTimerData?.is_student,
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = { ...data, id: firstTimerData?.id }
            await mutateAsync(payload);
            onClose?.()
        } catch (error) { }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputForm label="First Name" name="first_name" register={register} error={errors.first_name?.message} required />
            <InputForm label="Last Name" name="last_name" register={register} error={errors.last_name?.message} required />
            <InputForm label="Email Address" name="email" type="email" register={register} error={errors.email?.message} required />
            <InputForm label="Phone Number" name="phone_number" register={register} error={errors.phone_number?.message} required />
            <SelectForm
                label="Gender"
                name="gender"
                register={register}
                error={errors.gender?.message}
                options={[
                    { id: "Male", name: "Male" },
                    { id: "Female", name: "Female" },
                ]}
                required
            />
            <InputForm label="Date of Birth" name="date_of_birth" type="date" register={register} error={errors.date_of_birth?.message} />
            <InputForm label="Occupation" name="occupation" register={register} error={errors.occupation?.message} />
            <CheckboxForm label="Student" name="is_student" register={register} error={errors.is_student?.message} />

            <div className="sm:col-span-2">
                <Button loading={isPending} size="sm" type="submit">Update</Button>
            </div>
        </form>
    );
};

export default EditPersonalInformation;
