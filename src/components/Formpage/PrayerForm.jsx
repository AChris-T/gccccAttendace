// QuestionForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';

export default function PrayerForm() {
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
      <h3 className="text-2xl font-semibold">Prayer Request</h3>
      <h3 className="text-sm mt-2">
        Send your prayer request(s), knowing that whatever we ask in His name,
        He will do it. Let's together glorify the Father through the power of
        prayer
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <TextArea
          label="What is your prayer request ?"
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
