// QuestionForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';

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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <InputForm
          label="Name"
          name="message"
          type="text"
          register={register}
          error={errors.message?.message}
          placeholder="Type your question..."
        />
        <TextArea
          label="What are your questions ?"
          name="message"
          register={register}
          rows={6}
          cols={40}
          placeholder="Type your message here..."
          error={errors.message?.message}
        />
        <button
          type="submit"
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
