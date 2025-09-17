import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { firstTimerSchema } from "../../schema/index";
import InputForm from "../../components/form/InputForm";

const FirstTimerPage = () => {
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(firstTimerSchema),
        mode: "onBlur",
    });


    const validateStep = async () => {
        if (step === 1) {
            return await trigger(["first_name", "last_name", "email", "phone_number", "gender"]);
        }
        if (step === 2) {
            return await trigger(["data_of_friend_and_family"]);
        }
        if (step === 3) {
            return await trigger(["location"]);
        }
        if (step === 4) {
            return await trigger(["interest"]);
        }
        if (step === 5) {
            return await trigger([
                "address_in_ibadan",
                "dob",
                "occupation",
                "born_again",
            ]);
        }


        if (step === 6) {
            return await trigger([
                "service_experience",
                "prayer_point",
                "whatsapp_interest",
            ]);
        }
        return true;
    };

    const nextStep = async () => {
        const valid = await validateStep();
        if (valid) setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        setStep("complete");
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md mt-16 relative max-h-[80vh] overflow-y-auto">
            <h1 className="text-[#24244e] text-[24px] font-bold">First Timer Form</h1>
            {step !== "complete" && (
                <div className="mb-6 mt-4">
                    <div className="text-sm text-gray-600 font-semibold mb-2">
                        Step {step} of 6
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded">
                        <div
                            className="h-2 bg-[#24244e] rounded"
                            style={{ width: `${(step / 6) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {step === 1 && (
                    <>
                        <InputForm
                            label="First Name"
                            name="first_name"
                            placeholder="Enter first name"
                            register={register}
                            error={errors.first_name?.message}
                        />
                        <InputForm
                            label="Last Name"
                            name="last_name"
                            placeholder="Enter last name"
                            register={register}
                            error={errors.last_name?.message}
                        />
                        <InputForm
                            label="Phone Number"
                            name="phone_number"
                            placeholder="Enter Phone Number"
                            register={register}
                            error={errors.phone_number?.message}
                        />
                        <InputForm
                            label="Email"
                            name="email"
                            placeholder="Enter Email Address"
                            register={register}
                            error={errors.email?.message}
                        />
                        <InputForm
                            label="Gender"
                            name="gender"
                            type="radio"
                            register={register}
                            error={errors.gender?.message}
                            required={true}
                            options={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                            ]}
                        />
                    </>
                )}

                {step === 2 && (
                    <InputForm
                        label="Data of Friend/Family"
                        name="data_of_friend_and_family"
                        placeholder="Enter data of friend/Family"
                        register={register}
                        error={errors.data_of_friend_and_family?.message}
                    />
                )}

                {step === 3 && (
                    <InputForm
                        label="Do you currently reside in Ibadan (including for school, NYSC, work, temporary stay or permanent stay)??"
                        name="location"
                        type="radio"
                        register={register}
                        required={true}
                        error={errors.location?.message}
                        options={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" },
                        ]}
                    />
                )}

                {step === 4 && (
                    <InputForm
                        label="Would you be interested in becoming a consistent member of GCCC?"
                        name="interest"
                        type="radio"
                        register={register}
                        error={errors.interest?.message}
                        required={true}
                        options={[
                            { label: "Yes", value: "yes" },
                            { label: "Maybe", value: "maybe" },
                            { label: "No", value: "no" },
                        ]}
                    />
                )}


                {step === 5 && (
                    <>
                        <InputForm
                            label="Address in Ibadan (Kindly provide a detailed description of your home address)"
                            name="address_in_ibadan"
                            placeholder="Enter your address in Ibadan"
                            register={register}
                            error={errors.address_in_ibadan?.message}
                        />

                        <InputForm
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            register={register}
                            error={errors.dob?.message}
                        />

                        <InputForm
                            label="What do you do?"
                            name="occupation"
                            placeholder="Enter your occupation"
                            register={register}
                            error={errors.occupation?.message}
                        />

                        <InputForm
                            label="Are you born again?"
                            name="born_again"
                            type="radio"
                            register={register}
                            error={errors.born_again?.message}
                            required={true}
                            options={[
                                { label: "Yes", value: "yes" },
                                { label: "No", value: "no" },
                                { label: "I am not sure", value: "not_sure" },
                            ]}
                        />
                    </>
                )}


                {step === 6 && (
                    <>
                        <InputForm
                            label="What did you enjoy about the service today?"
                            name="service_experience"
                            placeholder="Share your experience..."
                            register={register}
                            error={errors.service_experience?.message}
                            type="textarea"
                            required={true}
                        />

                        <InputForm
                            label="Kindly share your prayer point with us (if any)"
                            name="prayer_point"
                            placeholder="Enter your prayer point (optional)"
                            register={register}
                            error={errors.prayer_point?.message}
                            type="textarea"
                        />

                        <InputForm
                            label="Would you be interested in joining our WhatsApp community to stay updated on our services and important announcements?"
                            name="whatsapp_interest"
                            type="radio"
                            register={register}
                            error={errors.whatsapp_interest?.message}
                            required={true}
                            options={[
                                { label: "Yes", value: "yes" },
                                { label: "No", value: "no" },
                            ]}
                        />
                    </>
                )}


                {step === "complete" && (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-bold mb-2">🎉 Thank you!</h2>
                        <p>Your response has been submitted.</p>
                    </div>
                )}

                {step !== "complete" && (
                    <div className="flex justify-between mt- mb-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-8 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Previous
                            </button>
                        )}
                        {step < 6 && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="ml-auto px-8 py-2 bg-[#24244e] text-white rounded hover:bg-[#24244e]"
                            >
                                Next
                            </button>
                        )}
                        {step === 6 && (
                            <button
                                type="submit"
                                className="ml-auto px-4 py-2 bg-[#24244e] text-white rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default FirstTimerPage;
