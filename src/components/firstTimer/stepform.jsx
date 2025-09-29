import React from "react";
import InputForm from "@/components/form/InputForm";
import RadioGroup from "@/components/form/RadioGroup";

export const Step1PersonalInfo = ({ register, errors }) => (
  <>
    <h1 className="text-[#24244e] text-[24px] font-bold mb-3 mt-6">
      Welcome to the family!
    </h1>
    <p className="mb-6 text-gray-700">
      Welcome Home! Here at Glory Centre Community Church, Ibadan, we are
      focused on propagating and normalizing Kingdom Culture in and through our
      closely knitted Community of Believers. We would like to know you more
      closely, kindly fill in detailed information here.
    </p>
    <div className="grid grid-cols-2 gap-5">
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
    </div>
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
    <RadioGroup
      label="Gender"
      name="gender"
      type="radio"
      placeholder=''
      register={register}
      error={errors.gender?.message}
      required={true}
      options={[
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ]}
    />
  </>
);

export const Step2FriendFamilyLocation = ({ register, errors }) => (
  <>
    <InputForm
      label="Friend/Family"
      name="data_of_friend_and_family"
      placeholder="Enter Friend/Family"
      register={register}
      error={errors.data_of_friend_and_family?.message}
    />

    <RadioGroup
      label="Do you currently reside in Ibadan (including for school, NYSC, work, temporary stay or permanent stay)?"
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
  </>
);

export const Step3Interest = ({ register, errors }) => (
  <RadioGroup
    label="Would you be interested in becoming a consistent member of GCCC either online or onsite?"
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
);

export const Step4Details = ({ register, errors }) => (
  <>
    <InputForm
      label="Address in Ibadan (Kindly provide a detailed description of your home address)"
      name="address_in_ibadan"
      placeholder="Enter your address in Ibadan"
      register={register}
      error={errors.address_in_ibadan?.message}
    />
    <InputForm
      label="Date of Birth (dd/mm)"
      name="dob"
      type="text"
      placeholder="e.g. 23/09"
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
    <RadioGroup
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
);

export const Step5Experience = ({ register, errors }) => (
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
    <RadioGroup
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
);
