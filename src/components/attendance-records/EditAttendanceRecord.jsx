import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import InputForm from '@/components/form/useForm/InputForm';
import Button from '@/components/ui/Button';
import ModalForm from '@/components/ui/modal/ModalForm';
import { useUpdateAttendanceRecord } from '@/queries/attendancerecord.query';

const EditAttendanceRecord = ({ isOpen, onClose, record, onSuccess }) => {
  const formMethods = useForm({
    defaultValues: {
      service_day: '',
      service_day_desc: '',
      service_date: '',
      male: 0,
      female: 0,
      children: 0,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

  const { mutate, isPending } = useUpdateAttendanceRecord({
    onSuccess: (data) => {
      onSuccess?.(data);
      onClose();
    },
  });

  const male = Number(watch('male') || 0);
  const female = Number(watch('female') || 0);
  const childrenCount = Number(watch('children') || 0);
  const total = male + female + childrenCount;

  const onSubmit = (data) => {
    if (!record?.id) return;

    const calculatedTotal =
      (Number(data.male) || 0) +
      (Number(data.female) || 0) +
      (Number(data.children) || 0);

    const payload = {
      id: record.id,
      service_day: data.service_day,
      service_day_desc: data.service_day_desc,
      service_date: data.service_date,
      male: Number(data.male) || 0,
      female: Number(data.female) || 0,
      children: Number(data.children) || 0,
      total_attendance: calculatedTotal,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (isOpen && record) {
      reset({
        service_day: record.service_day || '',
        service_day_desc: record.service_day_desc || '',
        service_date: record.service_date
          ? record.service_date.split('T')[0]
          : '',
        male: Number(record.male) || 0,
        female: Number(record.female) || 0,
        children: Number(record.children) || 0,
      });
    }
  }, [isOpen, record, reset]);

  if (!record || !isOpen) return null;

  return (
    <ModalForm
      title="Edit Attendance Record"
      isOpen={isOpen}
      description="Update the attendance record details."
      onClose={onClose}
    >
      <form
        key={record?.id}
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <div
          key={record.id}
          className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4"
        >
          <InputForm
            label="Service Day"
            name="service_day"
            type="text"
            required
            register={register}
            error={errors.service_day?.message}
            placeholder="Enter Service Day"
            onChange={(e) => {
              setValue('service_day', e.target.value, { shouldDirty: true });
            }}
          />

          <InputForm
            label="Service Day Description"
            name="service_day_desc"
            type="text"
            required
            register={register}
            error={errors.service_day_desc?.message}
            placeholder="Enter Service Day Description"
            onChange={(e) => {
              setValue('service_day_desc', e.target.value, { shouldDirty: true });
            }}
          />

          <InputForm
            label="Male"
            name="male"
            type="number"
            min="0"
            step="1"
            required
            register={register}
            error={errors.male?.message}
            placeholder="Enter number of males"
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setValue('male', value, { shouldDirty: true });
            }}
          />

          <InputForm
            label="Female"
            name="female"
            type="number"
            min="0"
            step="1"
            required
            register={register}
            error={errors.female?.message}
            placeholder="Enter number of females"
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setValue('female', value, { shouldDirty: true });
            }}
          />

          <InputForm
            label="Children"
            name="children"
            type="number"
            min="0"
            step="1"
            required
            register={register}
            error={errors.children?.message}
            placeholder="Enter number of children"
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setValue('children', value, { shouldDirty: true });
            }}
          />

          <InputForm
            label="Service Date"
            name="service_date"
            type="date"
            required
            register={register}
            error={errors.service_date?.message}
            onChange={(e) => {
              setValue('service_date', e.target.value, { shouldDirty: true });
            }}
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Attendance
            </label>
            <div className="flex items-center justify-between p-2 mt-1 text-lg font-semibold bg-gray-100 rounded-md dark:bg-gray-700">
              <span>Total:</span>
              <span className="text-blue-600 dark:text-blue-400">{total}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isPending}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isPending}
            disabled={isPending}
          >
            Update Record
          </Button>
        </div>
      </form>
    </ModalForm>
  );
};

export default EditAttendanceRecord;
