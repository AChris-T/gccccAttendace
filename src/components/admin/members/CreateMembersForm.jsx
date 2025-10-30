import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleIcon, TrashIcon, UserPlusIcon } from '@/icons';
import { bulkMemberSchema } from '@/schema';
import InputForm from '@/components/form/useForm/InputForm';
import RadioForm from '@/components/form/useForm/RadioForm';
import Button from '@/components/ui/Button';
import { useCreateMember } from '@/queries/member.query';
import { Toast } from '@/lib/toastify';
import Message from '@/components/common/Message';

const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];

const MAX_MEMBERS = 100;

const CreateMembersForm = ({ onClose }) => {
    const { mutateAsync, isPending, isError, error } = useCreateMember();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(bulkMemberSchema),
        defaultValues: {
            members: [{ first_name: '', last_name: '', email: '', gender: '', phone_number: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'members'
    });

    const addMember = () => {
        if (fields.length < MAX_MEMBERS) {
            append({ first_name: '', last_name: '', email: '', gender: '', phone_number: '' });
        }
    };

    const removeMember = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const onSubmit = async (data) => {
        try {
            await mutateAsync(data);
            onClose?.();
        } catch (error) {
            Toast.error(error?.message || 'Failed to create members');
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="space-y-6">
                {isError && <Message variant='error' data={error?.data} />}

                <div className="space-y-6">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                        >
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{index + 1}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Member {index + 1}
                                    </h3>
                                </div>

                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMember(index)}
                                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors group"
                                        aria-label={`Remove member ${index + 1}`}
                                    >
                                        <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm
                                    label="First Name"
                                    name={`members.${index}.first_name`}
                                    register={register}
                                    error={errors.members?.[index]?.first_name?.message}
                                    placeholder="Enter first name"
                                    required
                                    disabled={isPending}
                                />

                                <InputForm
                                    label="Last Name"
                                    name={`members.${index}.last_name`}
                                    register={register}
                                    error={errors.members?.[index]?.last_name?.message}
                                    placeholder="Enter last name"
                                    required
                                    disabled={isPending}
                                />

                                <InputForm
                                    label="Email Address"
                                    name={`members.${index}.email`}
                                    type="email"
                                    register={register}
                                    error={errors.members?.[index]?.email?.message}
                                    placeholder="member@example.com"
                                    required
                                    disabled={isPending}
                                />

                                <InputForm
                                    label="Phone Number"
                                    name={`members.${index}.phone_number`}
                                    type="tel"
                                    register={register}
                                    error={errors.members?.[index]?.phone_number?.message}
                                    placeholder="Enter phone number"
                                    required
                                    disabled={isPending}
                                />

                                <div className="md:col-span-2">
                                    <RadioForm
                                        label="Gender"
                                        name={`members.${index}.gender`}
                                        register={register}
                                        error={errors.members?.[index]?.gender?.message}
                                        options={GENDER_OPTIONS}
                                        required
                                        disabled={isPending}
                                        layout="grid"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {errors.members && typeof errors.members.message === 'string' && (
                        <p className="text-red-500 dark:text-red-400 text-sm" role="alert">
                            {errors.members.message}
                        </p>
                    )}
                </div>

                {fields.length < MAX_MEMBERS && (
                    <button
                        type="button"
                        onClick={addMember}
                        disabled={isPending}
                        className="w-full py-4 px-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="flex items-center justify-center gap-3">
                            <UserPlusIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                Add Another Member
                            </span>
                        </div>
                    </button>
                )}

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                                Total Members to Create
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                                {fields.length} member{fields.length !== 1 ? 's' : ''} will be added to the system
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{fields.length}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                        type="button"
                        variant="success"
                        loading={isPending}
                        disabled={isPending}
                        onClick={handleSubmit(onSubmit)}
                        className="flex-1"
                    >
                        {!isPending && <CheckCircleIcon className="w-5 h-5" />}
                        <span>Create {fields.length} Member{fields.length !== 1 ? 's' : ''}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateMembersForm;