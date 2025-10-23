import Animated from "@/components/common/Animated";
import RadioSelectForm from "@/components/form/useForm/RadioSelectForm";
import TextAreaForm from "@/components/form/TextAreaForm";
import InputForm from "@/components/form/useForm/InputForm";
import RadioForm from "@/components/form/useForm/RadioForm";

/**
 * Step 1: Personal Information
 */
export const Step1PersonalInfo = ({ register, errors }) => (
  <Animated animation={'fade-up'} className="space-y-5">
    <div className="mb-6">
      <h1 className="text-[#24244e] dark:text-white text-xl md:text-2xl font-bold mb-3">
        We are glad to have you.
      </h1>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p className="leading-relaxed">
          Welcome Home! <br /> Here at <strong>Glory Centre Community Church, Ibadan,</strong> we are
          focused on propagating and normalizing Kingdom Culture in and through our
          closely knitted Community of Believers.
        </p>
        <p className="leading-relaxed">
          We would like to know you more closely, kindly fill in detailed information here.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <InputForm
        label="First Name"
        name="first_name"
        placeholder="Enter first name"
        register={register}
        error={errors.first_name?.message}
        required
      />
      <InputForm
        label="Last Name"
        name="last_name"
        placeholder="Enter last name"
        register={register}
        error={errors.last_name?.message}
        required
      />
    </div>

    <InputForm
      label="Phone Number"
      name="phone_number"
      placeholder="Enter Phone Number"
      register={register}
      error={errors.phone_number?.message}
      required
    />

    <InputForm
      label="Email"
      name="email"
      type="email"
      placeholder="Enter Email Address (Optional)"
      register={register}
      error={errors.email?.message}
    />

    <RadioForm
      label="Gender"
      name="gender"
      type="radio"
      layout="horizontal"
      placeholder="gender"
      register={register}
      error={errors.gender?.message}
      required
      options={[
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ]}
    />
  </Animated>
);

export const Step2FriendFamilyLocation = ({ watch, register, errors, setValue }) => {
  const howDidYouLearn = watch('how_did_you_learn');

  return (
    <Animated animation={'fade-up'} className="space-y-5">
      <RadioSelectForm
        label="How did you learn about us?"
        name="how_did_you_learn"
        register={register}
        setValue={setValue}
        watch={watch}
        error={errors.how_did_you_learn?.message}
        required
        options={[
          {
            id: "Social Media",
            name: "Social Media",
            description: "Found us on Facebook, Instagram, Twitter, etc."
          },
          {
            id: "Friend/Family",
            name: "Friend/Family",
            description: "Someone you know invited you"
          },
          {
            id: "Google Search",
            name: "Google Search",
            description: "Found us through a search engine"
          },
          {
            id: "Website",
            name: "Church Website",
            description: "Visited our official website"
          },
          {
            id: "Flyer",
            name: "Flyer/Poster",
            description: "Saw our promotional materials"
          },
        ]}
        enableOther
        otherLabel="Other (please specify)"
        otherPlaceholder="Please tell us how you found us"
        otherMinLength={2}
        otherRequired={true}
      />

      {/* Show invited_by field when Friend/Family is selected */}
      {howDidYouLearn === 'Friend/Family' && (
        <Animated animation={'slide-down'}>
          <InputForm
            label="Who invited you?"
            name="invited_by"
            placeholder="Name of person who invited you"
            register={register}
            error={errors.invited_by?.message}
            required={true}
          />
        </Animated>
      )}
    </Animated>
  );
};

export const Step3Interest = ({ register, errors }) => (
  <Animated animation={'fade-up'} className="space-y-5">
    <RadioForm
      label="Do you currently reside in Ibadan (including for school, NYSC, work, temporary stay or permanent stay)?"
      name="located_in_ibadan"
      register={register}
      error={errors.located_in_ibadan?.message}
      required
      className='w-100'
      layout="horizontal"
      options={[
        {
          value: true,
          label: "Yes",
          description: "Yes"
        },
        {
          value: false,
          label: "No",
          description: "No"
        },
      ]}
    />

    <RadioForm
      label="Would you be interested in becoming a consistent member of GCCC either online or onsite?"
      name="membership_interest"
      type="radio"
      register={register}
      error={errors.membership_interest?.message}
      required
      options={[
        { label: "Yes", value: "Yes" },
        { label: "Maybe", value: "Maybe" },
        { label: "No", value: "No" },
      ]}
    />
  </Animated>
);


export const Step4Details = ({ register, errors }) => (
  <Animated animation={'fade-up'} className="space-y-5">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Additional Information
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Please provide the following details to help us serve you better.
      </p>
    </div>

    <InputForm
      label="Address in Ibadan"
      name="address"
      placeholder="Kindly provide a detailed description of your home address"
      register={register}
      error={errors.address?.message}
      required
    />

    <InputForm
      label="Date of Birth"
      name="date_of_birth"
      type="text"
      placeholder="dd/mm (e.g. 23/09)"
      register={register}
      error={errors.date_of_birth?.message}
      required
    />

    <InputForm
      label="What do you do?"
      name="occupation"
      placeholder="Enter your occupation"
      register={register}
      error={errors.occupation?.message}
      required
    />

    <RadioForm
      label="Are you born again?"
      name="born_again"
      type="radio"
      register={register}
      error={errors.born_again?.message}
      required
      options={[
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "I am not sure", value: "I'm not sure" },
      ]}
    />
  </Animated>
);

/**
 * Step 5: Service Experience
 */
export const Step5Experience = ({ register, errors }) => (
  <Animated animation={'fade-up'} className="space-y-5">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Share Your Experience
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        We'd love to hear about your experience with us today.
      </p>
    </div>

    <TextAreaForm
      label="What did you enjoy about the service today?"
      name="service_experience"
      placeholder="Share your experience..."
      register={register}
      error={errors.service_experience?.message}
      required
    />

    <TextAreaForm
      label="Kindly share your prayer point with us (if any)"
      name="prayer_point"
      placeholder="Enter your prayer point (optional)"
      register={register}
      error={errors.prayer_point?.message}
    />

    <RadioForm
      label="Would you be interested in joining our WhatsApp community to stay updated on our services and important announcements?"
      name="whatsapp_interest"
      type="radio"
      register={register}
      layout="horizontal"
      error={errors.whatsapp_interest?.message}
      required
      options={[
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]}
    />
  </Animated>
);