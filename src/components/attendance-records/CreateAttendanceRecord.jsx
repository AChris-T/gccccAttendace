import InputForm from '@/components/form/useForm/InputForm';
import Button from '@/components/ui/Button';
import ButtonCard from '@/components/ui/ButtonCard';
import ModalForm from '@/components/ui/modal/ModalForm';
import { useModal } from '@/hooks/useModal';
import { ClipboardListIcon } from '@/icons';
import { useCreateAttendanceRecord } from '@/queries/attendancerecord.query';
import { useForm } from 'react-hook-form';

const CreateAttendanceRecord = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useCreateAttendanceRecord({
    onSuccess: () => {
      reset();
      closeModal();
    },
  });

  const onSubmit = (data) => {
    const male = Number(data.male) || 0;
    const female = Number(data.female) || 0;
    const children = Number(data.children) || 0;
    const total = male + female + children;

    const payload = {
      service_day: data.service_day,
      service_day_desc: data.service_day_desc,
      service_date: data.service_date,
      male: Number(data.male),
      total_attendance: total,
      female: Number(data.female),
      children: Number(data.children),
      content: data.message,
    };
    mutate(payload);
  };

  return (
    <>
      <ButtonCard
        onClick={openModal}
        description={'Create a new attendance record for a service day.'}
        icon={<ClipboardListIcon />}
      >
        Add Attendance Record
      </ButtonCard>

      <ModalForm
        title={`Add Attendance Record`}
        isOpen={isOpen}
        description="Create a new attendance record for a service day."
        onClose={closeModal}
      >
        <div className="text-gray-500">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg dark:bg-gray-800 dark:border-gray-700 space-y-5"
          >
            <div className="grid grid-cols-1 space-x-0 m md:space-x-2 md:grid-cols-2 gap-y-4">
              <div>
                <InputForm
                  label="Service Day"
                  name="service_day"
                  type="text"
                  required={true}
                  register={register}
                  error={errors.name?.message}
                  placeholder="Enter Service Day"
                />
              </div>
              <div>
                <InputForm
                  label="Service Day Description"
                  name="service_day_desc"
                  type="text"
                  required={true}
                  register={register}
                  error={errors.name?.message}
                  placeholder="Enter Service Day Description"
                />
              </div>
              <div>
                <InputForm
                  label="Male"
                  name="male"
                  required={true}
                  type="number"
                  register={register}
                  error={errors.phone_number?.message}
                  placeholder="Enter number of male present"
                />
              </div>
              <div>
                <InputForm
                  label="Female"
                  name="female"
                  required={true}
                  type="number"
                  register={register}
                  error={errors.phone_number?.message}
                  placeholder="Enter number of female present"
                />
              </div>
              <div>
                <InputForm
                  label="Children"
                  name="children"
                  required={true}
                  type="number"
                  register={register}
                  error={errors.phone_number?.message}
                  placeholder="Enter number of female present"
                />
              </div>

              <div>
                <InputForm
                  label="Service Date"
                  name="service_date"
                  required={true}
                  type="date"
                  register={register}
                  error={errors.phone_number?.message}
                  placeholder="Enter number of female present"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="ghost"
                onClick={closeModal}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                className="flex-1"
                type="submit"
                loading={isPending}
                variant="primary"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </ModalForm>
    </>
  );
};

export default CreateAttendanceRecord;
