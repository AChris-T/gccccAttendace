import { useForm } from 'react-hook-form';
import TextArea from '../form/TextArea';
import { FormService } from '../../services/form.service';
import Button from '../ui/Button';
// import useToastify from '../queries/useToastify';

export default function PrayerForm() {
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
        type: 'prayer',
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
