import { useForm } from 'react-hook-form';
import TextArea from '../../components/form/TextArea';
import Button from '../../components/ui/Button';
import { useCreateFormMessages } from '@/queries/form.query';

export default function PrayerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useCreateFormMessages({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    const payload = {
      type: 'prayer',
      content: data.message,
    };
    mutate(payload);
  };

  return (
    <div className="">
      <h3 className="text-[#24244e] text-[24px] font-bold ">Prayer Request</h3>
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
          required={true}
          rows={6}
          cols={40}
          placeholder="Type your message here..."
          error={errors.message?.message}
        />
        <Button type="submit" loading={isPending} size="md" variant="accent">
          Submit
        </Button>
      </form>
    </div>
  );
}
