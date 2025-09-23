"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { firstTimerSchema } from "../../schema/index";
import { useFirstTimerStore } from "../../store/firstTimer.store";
import useToastify from "../../hooks/useToastify";

import {
  Step1PersonalInfo,
  Step2FriendFamilyLocation,
  Step3Interest,
  Step4Details,
  Step5Experience,
} from "../../components/firstTimer/stepform";

const FirstTimerPage = () => {
  const [step, setStep] = useState(1);
  const { createFirstTimer } = useFirstTimerStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { showToast } = useToastify();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(firstTimerSchema),
    mode: "onBlur",
  });

  const validateStep = async () => {
    let fieldsToValidate = [];

    switch (step) {
      case 1:
        fieldsToValidate = ["first_name", "last_name", "email", "phone_number", "gender"];
        break;
      case 2:
        fieldsToValidate = ["data_of_friend_and_family", "location"];
        break;
      case 3:
        fieldsToValidate = ["interest"];
        break;
      case 4:
        const location = getValues("location");
        const interest = getValues("interest");
        if (location === "yes" && interest === "yes") {
          fieldsToValidate = ["address_in_ibadan", "dob", "occupation", "born_again"];
        }
        break;
      case 5:
        fieldsToValidate = ["service_experience", "whatsapp_interest"];
        break;
      default:
        return true;
    }

    if (fieldsToValidate.length === 0) return true;
    return await trigger(fieldsToValidate);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: `${data.first_name} ${data.last_name}`,
        slug: `${data.first_name.toLowerCase()}-${data.last_name.toLowerCase()}`,
        phone_number: data.phone_number,
        email: data.email,
        gender:
          data.gender === "male" ? "Male" : data.gender === "female" ? "Female" : "Other",
        located_in_ibadan: data.location === "yes",
        interest: data.interest === "yes" ? "Yes" : data.interest === "maybe" ? "Maybe" : "No",
        born_again: data.born_again === "yes" ? "Yes" : "No",
        whatsapp_interest: data.whatsapp_interest === "yes",
        address: data.address_in_ibadan || "",
        date_of_birth: data.dob
          ? new Date(data.dob.split("/").reverse().join("-")).toISOString()
          : null,
        date_of_visit: new Date().toISOString(),
        occupation: data.occupation || "",
        service_experience: data.service_experience,
        prayer_point: data.prayer_point || "",
        friend_family: data.data_of_friend_and_family || "",
        notes: "",
        visitation_report: "",
        status: "pending",
        pastorate_call: "",
        how_did_you_learn: "",
      };

      const response = await createFirstTimer(payload);

      if (response && (response.status === 201 || response.id || response.data)) {
        showToast("Form submitted successfully!", "success");
        setStep("complete");
      } else if (response && response.error) {
        showToast(response.error, "error");
        setSubmitError(response.error);
      } else {
        setStep("complete");
      }
    } catch (error) {
      const errorMessage = error.message || "Submission failed. Please try again.";
      showToast(errorMessage, "error");
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    const valid = await validateStep();
    if (!valid) {
      showToast("Please fill in all required fields correctly before proceeding.");
      return;
    }
    if (step === 3 && getValues("interest") === "no") {
      setStep(5);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleButtonClick = async () => {
    if (step === 5) {
      handleSubmit(onSubmit)();
    } else {
      await handleNextStep();
    }
  };

  const prevStep = () => {
    if (step === 5 && getValues("interest") === "no") {
      setStep(3);
      return;
    }
    if (step > 1) setStep((prev) => prev - 1);
  };

  const getButtonText = () => (isSubmitting ? "Processing..." : step === 5 ? "Submit" : "Next");

  const scrollableSteps = [1, 4];
  const containerClasses = `max-w-xl w-full p-6 bg-white shadow rounded-md ${
    scrollableSteps.includes(step) ? "h-[80vh] overflow-y-auto" : ""
  }`;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className={containerClasses}>
        {step !== "complete" && (
          <div className="flex justify-center mb-6">
            <img src="./images/logo/gccc.png" alt="Logo" className="h-16 w-auto" />
          </div>
        )}

        {step !== "complete" && (
          <div className="mb-6 mt-4">
            <div className="text-sm text-gray-600 font-semibold mb-2">Step {step} of 5</div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="h-2 bg-[#24244e] rounded"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {step === "complete" ? (
          <div className="text-center text-lg font-semibold text-green-600">
            Thank you! Your response has been received.
          </div>
        ) : (
          <form className="mb-12" onSubmit={handleSubmit(onSubmit)} noValidate>
            {step === 1 && <Step1PersonalInfo register={register} errors={errors} />}
            {step === 2 && <Step2FriendFamilyLocation register={register} errors={errors} />}
            {step === 3 && <Step3Interest register={register} errors={errors} />}
            {step === 4 && <Step4Details register={register} errors={errors} />}
            {step === 5 && <Step5Experience register={register} errors={errors} />}

            {submitError && (
              <p className="text-red-500 text-sm mt-2 text-center">{submitError}</p>
            )}

            <div className="flex justify-between mt-6 mb-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={isSubmitting}
                className="ml-auto px-8 py-2 bg-[#24244e] text-white rounded hover:bg-[#1a1a40] disabled:opacity-50"
              >
                {getButtonText()}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FirstTimerPage;
