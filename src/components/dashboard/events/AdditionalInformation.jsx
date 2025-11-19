import { CoupleIcon } from '@/icons/EventsIcons';
import InputForm from '@/components/form/useForm/InputForm';

export default function AdditionalInformation({ formData, onFormDataChange }) {
  const createRegister = (fieldName) => {
    return (name, options) => ({
      name: name || fieldName,
      onChange: (e) => {
        onFormDataChange({
          ...formData,
          [fieldName]: e.target.value,
        });
      },
      onBlur: () => {},
      ref: () => {},
      value: formData[fieldName] || '',
    });
  };

  return (
    <div className="p-6 border-b sm:p-8 border-slate-200 dark:border-slate-700">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        <span className="text-blue-600">
          <CoupleIcon />
        </span>
        Additional Information
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.interested_in_serving}
              onChange={(e) => {
                onFormDataChange({
                  ...formData,
                  interested_in_serving: e.target.checked,
                });
              }}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="font-medium text-slate-900 dark:text-white">
              Interested in Serving
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.integrated_into_a_unit}
              onChange={(e) => {
                onFormDataChange({
                  ...formData,
                  integrated_into_a_unit: e.target.checked,
                  specify_unit: e.target.checked ? formData.specify_unit : '',
                });
              }}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="font-medium text-slate-900 dark:text-white">
              Integrated into a Unit
            </span>
          </label>
        </div>

        {formData.integrated_into_a_unit && (
          <div className="bg-white dark:bg-slate-800 rounded-xl">
            <InputForm
              label="Specify Unit"
              name="specify_unit"
              type="text"
              register={createRegister('specify_unit')}
              placeholder="Enter your unit"
              required={true}
            />
          </div>
        )}

        <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_student}
              onChange={(e) => {
                onFormDataChange({
                  ...formData,
                  is_student: e.target.checked,
                  institution: e.target.checked ? formData.institution : '',
                });
              }}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="font-medium text-slate-900 dark:text-white">
              I am a student
            </span>
          </label>
        </div>

        {formData.is_student && (
          <div className="bg-white dark:bg-slate-800 rounded-xl">
            <InputForm
              label="Institution"
              name="institution"
              type="text"
              register={createRegister('institution')}
              placeholder="Enter your institution"
              required={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

