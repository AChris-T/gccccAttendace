import { useForm } from 'react-hook-form';
import InputForm from '../form/useForm/InputForm';
import Button from '../ui/Button';
import { useCreateFormMessages } from '@/queries/form.query';
import TextAreaForm from '@/components/form/TextAreaForm';

export default function TestimonyForm() {
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
      type: 'testimony',
      content: data.message,
      name: data.name,
      phone_number: data.phone,
      wants_to_share_testimony: data.sharePhysically === 'Yes',
    };
    mutate(payload);
  };

  return (
    <div className="">
      <h3 className="text-[#24244e] text-[24px] font-bold ">Hi Friend</h3>
      <h3 className="text-sm mt-2">
        At the GCCC Ibadan, we have a culture of sharing with the family of God
        what the Lord has done.
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 grid space-x-2 grid-cols-1 md:grid-cols-2">
          <div>
            <InputForm
              label="Name"
              name="name"
              type="text"
              required={true}
              register={register}
              error={errors.name?.message}
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <InputForm
              label="Phone Number"
              name="phone"
              required={true}
              type="text"
              register={register}
              error={errors.phone?.message}
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="md:col-span-2">
            <TextAreaForm
              label="What are your questions?"
              name="message"
              register={register}
              rows={6}
              required={true}
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

        <Button type="submit" loading={isPending} size="md" variant="accent">
          Submit
        </Button>
      </form>
    </div>
  );
}
