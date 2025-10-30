import * as yup from 'yup';

export const unitSchema = yup.object({
  name: yup.string().max(255, 'Name must not exceed 255 characters').required(),

  member_ids: yup
    .array()
    .of(yup.number().positive('Invalid member ID').integer('Invalid member ID'))
    .nullable()
    .notRequired(),

  assistant_id: yup
    .number()
    .positive('Invalid assistant ID')
    .integer('Invalid assistant ID')
    .nullable()
    .notRequired(),

  leader_id: yup
    .number()
    .positive('Invalid leader ID')
    .integer('Invalid leader ID')
    .nullable()
    .notRequired(),
});
export const registerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
  first_name: yup
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  last_name: yup
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  phone_number: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
});

export const loginSchema = yup.object({
  email: yup.string().trim().email().required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().trim().email().required('Email is required'),
});

export const resetPasswordSchema = yup.object({
  password: yup.string().trim().required('Password field is required'),
  password_confirmation: yup
    .string()
    .trim()
    .required('Password confirmation field is required'),
});

export const timelineSchema = yup.object({
  note: yup.string().required('Comment field is required'),
  type: yup.string().required('Type field is required'),
  service_date: yup
    .string()
    .nullable()
    .when('type', {
      is: (type) => type && type.toLowerCase().includes('service'),
      then: (schema) =>
        schema.required(
          'Service date is required when type contains "service"'
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const firstTimerSchema = yup.object({
  email: yup.string().trim().email('Please enter a valid email').nullable(),
  first_name: yup
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  last_name: yup
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  phone_number: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),

  how_did_you_learn: yup
    .string()
    .required('Field is required')
    .test('other-validation', 'Please specify your answer', function (value) {
      if (value === 'other') {
        const otherText = this.parent.how_did_you_learn_other_text;
        return otherText && otherText.trim().length >= 2;
      }
      return true;
    }),

  how_did_you_learn_other_text: yup
    .string()
    .trim()
    .when('how_did_you_learn', {
      is: 'other',
      then: (schema) =>
        schema
          .min(2, 'Please provide at least 2 characters')
          .required('Please specify your answer'),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  invited_by: yup
    .string()
    .trim()
    .when('how_did_you_learn', {
      is: 'Friend/Family',
      then: (schema) =>
        schema
          .min(2, 'Name must be at least 2 characters')
          .required('Please enter the name of the person who invited you'),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  located_in_ibadan: yup.boolean().required('Please select Yes or No'),
  membership_interest: yup.string().required('Please select Yes, Maybe or No'),

  address: yup
    .string()
    .trim()
    .when('membership_interest', {
      is: (val) => val !== 'No',
      then: (schema) =>
        schema
          .min(5, 'Address must be at least 5 characters')
          .required('Address in Ibadan is required'),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  date_of_birth: yup.string().when('membership_interest', {
    is: (val) => val !== 'No',
    then: (schema) =>
      schema
        .matches(
          /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])$/,
          'Date of Birth must be in dd/mm format'
        )
        .required('Date of Birth is required'),
    otherwise: (schema) => schema.nullable().optional(),
  }),

  occupation: yup
    .string()
    .trim()
    .when('membership_interest', {
      is: (val) => val !== 'No',
      then: (schema) =>
        schema
          .min(2, 'Occupation must be at least 2 characters')
          .required('Occupation is required'),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  born_again: yup.string().when('membership_interest', {
    is: (val) => val !== 'No',
    then: (schema) => schema.required('Please select an option'),
    otherwise: (schema) => schema.nullable().optional(),
  }),

  service_experience: yup
    .string()
    .trim()
    .required('Please share what you enjoyed about the service'),
  prayer_point: yup.string().trim().nullable(),
  whatsapp_interest: yup.boolean().required('Please select Yes or No'),
});

export const updateFirstTimerProfileSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'Too short'),
  last_name: yup.string().required('Last name is required').min(2, 'Too short'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  phone_number: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  date_of_birth: yup.string().nullable(),
  occupation: yup.string().nullable(),
  is_student: yup.boolean(),
});
export const communityFirstTimerSchema = yup.object({
  address: yup.string().nullable(),
  located_in_ibadan: yup.boolean(),
  whatsapp_interest: yup.boolean(),
});

export const firstTimerNotesSchema = yup.object({
  pastorate_call: yup.string().nullable(),
  visitation_report: yup.string().nullable(),
  notes: yup.string().nullable(),
});

export const testimonyFormSchema = yup.object({
  content: yup.string().required(),
  name: yup.string().required(),
  phone_number: yup.string().required(),
  wants_to_share_testimony: yup.boolean().nullable(),
});

export const updateFirstTimerStatusSchema = yup.object({
  id: yup.number().required(),
  followup_by_id: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue)
    ),
  follow_up_status_id: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue)
    ),
});

export const updateUnitSchema = yup.object({
  name: yup.string().nullable(),
  member_ids: yup.array().of(yup.string()).nullable().default([]),
  assistant_leader_id: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      !originalValue ? null : Number(originalValue)
    ),
  leader_id: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      !originalValue ? null : Number(originalValue)
    ),
});

export const filterAttendanceSchema = yup.object({
  service_id: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === null
        ? null
        : Number(originalValue)
    ),
  mode: yup
    .string()
    .nullable()
    .transform((value) => value || null),
  attendance_date: yup.array().of(yup.string()).nullable().default([]),
  status: yup
    .string()
    .nullable()
    .transform((value) => value || null),
});
export const assignAbsentMemberSchema = yup.object().shape({
  attendance_date: yup
    .string()
    .nullable()
    .required('Attendance date is required'),
  leader_ids: yup
    .array()
    .min(1, 'At least one leader must be selected')
    .required('Leaders are required'),
});
export const markPresentMemberSchema = yup.object().shape({
  attendance_date: yup
    .string()
    .nullable()
    .required('Attendance date is required'),
  member_ids: yup
    .array()
    .min(1, 'At least one member must be selected')
    .required('Members are required'),
});
export const markAbsentMemberSchema = yup.object().shape({
  attendance_date: yup.string().nullable().required('Service date is required'),
  member_ids: yup.array().of(yup.number()).optional().default([]),
});
export const assignUsersRoleSchema = yup.object().shape({
  role: yup.string().required('Role is required'),
  user_ids: yup
    .array()
    .min(1, 'At least one member must be selected')
    .required('Members are required'),
});
