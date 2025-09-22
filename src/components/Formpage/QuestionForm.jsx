// QuestionForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';

export default function QuestionForm() {
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
      <h3 className="text-2xl font-semibold">Dear Friend</h3>
      <h3 className="text-sm mt-2">
        Feel free to ask as many questions as you have, bible questions, life
        questions, or anything you haven’t gotten answers to. Just ask them all.
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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
