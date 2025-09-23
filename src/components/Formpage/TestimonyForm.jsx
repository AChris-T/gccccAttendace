// QuestionForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';
import InputForm from '../form/InputForm';

export default function TestimonyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  return (
    <div className="text-white">
      <h3 className="text-2xl font-semibold">Hi Friend</h3>
      <h3 className="text-sm mt-2">
        At the GCCC Ibadan, we have a culture of sharing with the family of God
        what the Lord has done.
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 grid gap-4  grid-cols-1 md:grid-cols-2">
          <div>
            <InputForm
              label="Name"
              name="name"
              type="text"
              register={register}
              error={errors.name?.message}
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <InputForm
              label="Phone Number"
              name="phone"
              type="text"
              register={register}
              error={errors.phone?.message}
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="">
            <TextArea
              label="What are your questions?"
              name="message"
              register={register}
              rows={6}
              cols={40}
              placeholder="Type your message here..."
              error={errors.message?.message}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-2 text-sm">
              Do you want to share your testimony physically?{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Yes"
                  {...register('sharePhysically', {
                    required: 'This field is required',
                  })}
                  className="w-4 h-4"
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="No"
                  {...register('sharePhysically', {
                    required: 'This field is required',
                  })}
                  className="w-4 h-4"
                />
                <span>No</span>
              </label>
            </div>
            {errors.sharePhysically && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sharePhysically.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
