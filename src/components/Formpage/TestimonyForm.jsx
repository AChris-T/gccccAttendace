import { useForm } from 'react-hook-form';
import InputForm from '../form/useForm/InputForm';
import Button from '../ui/Button';
import { useCreateFormMessages } from '@/queries/form.query';
import TextAreaForm from '@/components/form/TextAreaForm';
import { testimonyFormSchema } from '@/schema';
import { yupResolver } from '@hookform/resolvers/yup';

export default function TestimonyForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(testimonyFormSchema),
  });

  const { mutate, isPending } = useCreateFormMessages({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    const payload = {
      type: 'testimony',
      content: data.content,
      name: data.name,
      phone_number: data.phone_number,
      wants_to_share_testimony: data.sharePhysically === 'Yes',
    };
    mutate(payload);
  };

  return (
    <div className="space-y-5 mt-5 text-gray-800 dark:text-gray-100">
      <h3 className="text-[24px] font-bold text-[#24244e] dark:text-gray-100">
        Hi Friend
      </h3>
      <h3 className="text-sm mt-2 text-gray-700 dark:text-gray-300">
        At the GCCC Ibadan, we have a culture of sharing with the family of God
        what the Lord has done.
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm"
      >
        <div className="mt-4 grid space-x-0 md:space-x-2 grid-cols-1 md:grid-cols-2 gap-y-4">
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
              name="phone_number"
              required={true}
              type="text"
              register={register}
              error={errors.phone_number?.message}
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="md:col-span-2">
            <TextAreaForm
              label="What are your testimonies?"
              name="content"
              register={register}
              rows={6}
              required={true}
              cols={40}
              placeholder="Type your testimonies here..."
              error={errors.content?.message}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-2 text-sm text-gray-800 dark:text-gray-200">
              Do you want to share your testimony physically?{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  value="Yes"
                  {...register('sharePhysically', {
                    required: 'This field is required',
                  })}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700"
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  value="No"
                  {...register('sharePhysically', {
                    required: 'This field is required',
                  })}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700"
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

        <div className="mt-5">
          <Button
            type="submit"
            loading={isPending}
            size="md"
            variant="primary"
            className="w-full md:w-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
