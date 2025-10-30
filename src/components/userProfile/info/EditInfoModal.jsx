import Button from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import InputForm from '@/components/form/useForm/InputForm';
import { useMemo } from 'react';
import { Country, State } from 'country-state-city';

const EditInfoModal = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  isPending,
  watch,
}) => (
  <Modal
    isOpen={isOpen}
    description="Update your details to keep your profile up-to-date."
    title={'Edit Personal Information'}
    onClose={onClose}
  >
    <CountryStateForm
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isPending={isPending}
      onClose={onClose}
      watch={watch}
    />
  </Modal>
);

const CountryStateForm = ({ onSubmit, register, errors, isPending, onClose, watch }) => {
  const countries = useMemo(() => Country.getAllCountries(), []);
  const selectedCountryName = watch ? watch('country') : '';
  const selectedCountry = useMemo(
    () => countries.find((c) => c.name === selectedCountryName),
    [countries, selectedCountryName]
  );
  const states = useMemo(
    () => (selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []),
    [selectedCountry]
  );

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <InputForm
          label="First Name"
          name="first_name"
          type="text"
          placeholder="Enter your first name"
          register={register}
          error={errors.first_name?.message}
        />
        <InputForm
          label="Last Name"
          name="last_name"
          type="text"
          placeholder="Enter your last name"
          register={register}
          error={errors.last_name?.message}
        />
        <InputForm
          label="Email Address"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          register={register}
          error={errors.email?.message}
          disabled
        />
        <InputForm
          label="Phone Number"
          name="phone_number"
          type="text"
          placeholder="+1 (555) 000-0000"
          register={register}
          error={errors.phone_number?.message}
          disabled
        />
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Gender
          </label>
          <select
            {...register('gender')}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs text-red-500">
              {errors.gender.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Date of Birth
          </label>
          <input
            type="date"
            {...register('date_of_birth')}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.date_of_birth && (
            <p className="mt-1 text-xs text-red-500">
              {errors.date_of_birth.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Country
          </label>
          <select
            {...register('country')}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            State / Region
          </label>
          <select
            {...register('city_or_state')}
            disabled={!selectedCountry}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:bg-gray-800 dark:text-white/90 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-60"
          >
            <option value="">{selectedCountry ? 'Select State / Region' : 'Select a country first'}</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.city_or_state && (
            <p className="mt-1 text-xs text-red-500">{errors.city_or_state.message}</p>
          )}
        </div>
        <InputForm
          label="Address"
          name="address"
          type="text"
          placeholder="No 3, onasa street"
          register={register}
          error={errors.address?.message}
        />
      </div>

      <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          disabled={isPending}
          className="flex-1"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isPending}
          disabled={isPending}
          className="flex-1"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditInfoModal;
