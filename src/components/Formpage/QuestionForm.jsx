import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';
import Button from '../ui/Button';
import { useFormMessages } from '../../queries/form.query';

export default function QuestionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error } = useFormMessages();

  const onSubmit = (data) => {
    const payload = {
      type: 'question',
      content: data.message,
    };
    mutate(payload);
  };
  // meesage data={error?.data}
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
          loading={isPending}
          size="lg"
          className="mt-3 bg-[#24244e]  text-white px-4 py-2 rounded"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
