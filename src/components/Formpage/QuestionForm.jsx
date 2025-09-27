import React from 'react';
import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';
import { FormService } from '../../services/form.service';
import Button from '../ui/Button';
// import useToastify from '../queries/useToastify';

export default function QuestionForm() {
  // const { showToast } = useToastify();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        type: 'question',
        content: data.message,
      };
      const response = await FormService.form(payload);
      reset();
      // showToast(response.message, 'success');
    } catch (error) {
      // showToast(error.message, 'error');
    }
  };

  return (
    <div className="">
      <h3 className="text-[#24244e] text-[24px] font-bold ">Dear Friend </h3>
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
          required={true}
          cols={40}
          placeholder="Type your message here..."
          error={errors.message?.message}
        />
        <Button
          type="submit"
          loading={isSubmitting}
          size="lg"
          className="mt-3 bg-[#24244e]  text-white px-4 py-2 rounded"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
