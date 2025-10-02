'use client';
import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { firstTimerSchema } from '../../schema/index';
import {
  Step1PersonalInfo,
  Step2FriendFamilyLocation,
  Step3Interest,
  Step4Details,
  Step5Experience,
} from '../../components/firstTimer/stepform';
import { useCreateFirstTimer } from '../../queries/firstTimer.query';
import Message from '../../components/common/Message';
import Button from '../../components/ui/Button';
import { CompletedIcon, LoadingIcon } from '../../icons';
import { Toast } from '../../lib/toastify';
import { handleApiError } from '../../utils/helper';

// Constants
const TOTAL_STEPS = 5;
const SCROLLABLE_STEPS = [1, 4];
const STEP_VALIDATION_FIELDS = {
  1: ['first_name', 'last_name', 'email', 'phone_number', 'gender'],
  2: ['data_of_friend_and_family', 'location'],
  3: ['interest'],
  4: [], // Dynamic based on conditions
  5: ['service_experience', 'whatsapp_interest'],
};

// Helper functions
const createFormPayload = (data) => ({
  name: `${data.first_name} ${data.last_name}`,
  phone_number: data.phone_number,
  email: data.email,
  gender:
    data.gender === 'male'
      ? 'Male'
      : data.gender === 'female'
      ? 'Female'
      : 'Other',
  located_in_ibadan: data.location === 'yes',
  interest:
    data.interest === 'yes'
      ? 'Yes'
      : data.interest === 'maybe'
      ? 'Maybe'
      : 'No',
  born_again: data.born_again === 'yes' ? 'Yes' : 'No',
  whatsapp_interest: data.whatsapp_interest === 'yes',
  address: data.address_in_ibadan || '',
  date_of_birth: data.dob
    ? new Date(data.dob.split('/').reverse().join('-')).toISOString()
    : null,
  date_of_visit: new Date().toISOString(),
  occupation: data.occupation || '',
  service_experience: data.service_experience,
  prayer_point: data.prayer_point || '',
  friend_family: data.data_of_friend_and_family || '',
  notes: '',
  visitation_report: '',
  status: 'pending',
  pastorate_call: '',
  how_did_you_learn: '',
});

const FirstTimerPage = () => {
  const [step, setStep] = useState(1);
  const {
    mutateAsync: createFirstTimer,
    isPending,
    isError,
    error,
  } = useCreateFirstTimer();

  const form = useForm({
    resolver: yupResolver(firstTimerSchema),
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = form;

  // Memoized computed values
  const isCompleteStep = useMemo(() => step === 'complete', [step]);
  const isLastStep = useMemo(() => step === TOTAL_STEPS, [step]);
  const containerClasses = useMemo(() => {
    const baseClasses = 'max-w-3xl w-full p-6 bg-white shadow rounded-md';
    const scrollClasses = SCROLLABLE_STEPS.includes(step)
      ? 'h-auto overflow-y-auto'
      : '';
    return `${baseClasses} ${scrollClasses}`;
  }, [step]);

  // Step validation logic
  const getValidationFields = useCallback(
    (currentStep) => {
      if (currentStep === 4) {
        const location = getValues('location');
        const interest = getValues('interest');

        if (location === 'yes' && interest === 'yes') {
          return ['address_in_ibadan', 'dob', 'occupation', 'born_again'];
        }
        return [];
      }

      return STEP_VALIDATION_FIELDS[currentStep] || [];
    },
    [getValues]
  );

  const validateCurrentStep = useCallback(async () => {
    const fieldsToValidate = getValidationFields(step);

    if (fieldsToValidate.length === 0) return true;

    const isValid = await trigger(fieldsToValidate);

    if (!isValid)
      Toast.warning(
        'Please fill in all required fields correctly before proceeding.'
      );

    return isValid;
  }, [step, getValidationFields, trigger]);

  // Navigation logic
  const shouldSkipToStep5 = useCallback(() => {
    return step === 3 && getValues('interest') === 'no';
  }, [step, getValues]);

  const getNextStep = useCallback(() => {
    if (shouldSkipToStep5()) return 5;
    return step + 1;
  }, [step, shouldSkipToStep5]);

  const getPreviousStep = useCallback(() => {
    if (step === 5 && getValues('interest') === 'no') return 3;
    return Math.max(1, step - 1);
  }, [step, getValues]);

  // Event handlers
  const handleNextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    setStep(getNextStep());
  }, [validateCurrentStep, getNextStep]);

  const handlePreviousStep = useCallback(() => {
    setStep(getPreviousStep());
  }, [getPreviousStep]);

  const handleFormSubmit = useCallback(
    async (data) => {
      try {
        const payload = createFormPayload(data);
        await createFirstTimer(payload);
        setStep('complete');
      } catch (err) {
        const message = handleApiError(err);
        Toast.error(`Form submission failed: ${message}`);
      }
    },
    [createFirstTimer]
  );

  const handleButtonClick = useCallback(async () => {
    if (isLastStep) {
      await handleSubmit(handleFormSubmit)();
    } else {
      await handleNextStep();
    }
  }, [isLastStep, handleSubmit, handleFormSubmit, handleNextStep]);

  const renderProgressBar = () => (
    <div className="mb-6 mt-4">
      <div className="text-sm text-gray-600 font-semibold mb-2">
        Step {step} of {TOTAL_STEPS}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="h-2 bg-[#24244e] rounded transition-all duration-300"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    const stepComponents = {
      1: <Step1PersonalInfo register={register} errors={errors} />,
      2: <Step2FriendFamilyLocation register={register} errors={errors} />,
      3: <Step3Interest register={register} errors={errors} />,
      4: <Step4Details register={register} errors={errors} />,
      5: <Step5Experience register={register} errors={errors} />,
    };

    return stepComponents[step] || null;
  };

  const renderActionButtons = () => (
    <div className="flex justify-between my-6">
      {step > 1 && (
        <Button
          className="px-6"
          type="button"
          onClick={handlePreviousStep}
          variant="ghost"
          size="md"
        >
          Previous
        </Button>
      )}
      <Button
        type="button"
        className="px-6"
        loading={isPending}
        onClick={handleButtonClick}
        variant="accent"
        size="md"
      >
        {' '}
        {isLastStep ? 'Submit' : 'Next'}
      </Button>
    </div>
  );

  const renderCompletionMessage = () => (
    <div className="text-center">
      <img
        src="/images/logo/gccc.png"
        alt="Logo"
        className="h-16 w-auto mx-auto"
      />
      <div className="text-lg font-semibold text-green-600">
        <p>Thank you! Your response has been received.</p>
        <Button
          variant="success"
          startIcon={<CompletedIcon />}
          className="rounded my-5 px-5"
          onClick={() => window.location.reload()}
        >
          Done
        </Button>
      </div>
    </div>
  );

  const renderForm = () => (
    <>
      <div className="flex justify-center mb-6">
        <img src="/images/logo/logo2.png" alt="Logo" className="h-16 w-auto" />
      </div>

      {renderProgressBar()}

      <form
        className="my-8"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        {renderStepContent()}

        {isError && <Message variant="error" data={error?.data} />}

        {renderActionButtons()}
      </form>
    </>
  );

  return (
    <div className="flex mt-28 item-center justify-center px-4">
      <div className={containerClasses}>
        {isCompleteStep ? renderCompletionMessage() : renderForm()}
      </div>
    </div>
  );
};

export default FirstTimerPage;
