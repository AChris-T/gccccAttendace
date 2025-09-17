import * as yup from 'yup';

export const signInSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});
export const signUpSchema = yup.object({
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
  // .matches(/^0[789][01]\d{8}$/, "Invalid phone number format"),
  password: yup
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>-]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
});

export const firstTimerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
  first_name: yup.string().trim().min(2).required('First name is required'),
  last_name: yup.string().trim().min(2).required('Last name is required'),
  phone_number: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  location: yup.string().required('Please select Yes or No'),
  interest: yup.string().required('Please select Yes, Maybe or No'),
  address_in_ibadan: yup
    .string()
    .trim()
    .min(5)
    .required('Address in Ibadan is required'),
  dob: yup
    .date()
    .typeError('Please enter a valid date')
    .required('Date of Birth is required'),
  occupation: yup.string().trim().min(2).required('Occupation is required'),
  born_again: yup.string().required('Please select an option'),
  service_experience: yup
    .string()
    .trim()
    .required('Please share what you enjoyed about the service'),
  prayer_point: yup.string().trim().nullable(),
  whatsapp_interest: yup.string().required('Please select Yes or No'),
});
