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
export const orderSchema = yup.object({
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
  state: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
});
export const filterProductsSchema = yup.object({
  category_id: yup
    .number()
    .typeError('Category must be a number')
    .integer('Category ID must be an integer')
    .optional(),
  // limit: yup
  //   .number()
  //   .typeError("Limit must be a number")
  //   .positive("Limit must be positive")
  //   .integer("Limit must be an integer")
  //   .optional(),
  min_price: yup.number().typeError('Min price must be a number').optional(),
  max_price: yup
    .number()
    .typeError('Max price must be a number')
    .optional()
    .when('min_price', (min_price: any, schema) =>
      min_price
        ? schema.min(min_price, 'Max price must be greater than min price')
        : schema
    ),
  location: yup.string().trim().optional(),
});



export const firstTimerSchema = yup.object({
  email: yup.string().trim().email("Please enter a valid email").required("Email is required"),
  first_name: yup.string().trim().min(2).required("First name is required"),
  last_name: yup.string().trim().min(2).required("Last name is required"),
  phone_number: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
 location: yup.string().required("Please select Yes or No"),
interest: yup.string().required("Please select Yes, Maybe or No"),
  address_in_ibadan: yup.string().trim().min(5).required("Address in Ibadan is required"),
  dob: yup.date().typeError("Please enter a valid date").required("Date of Birth is required"),
  occupation: yup.string().trim().min(2).required("Occupation is required"),
  born_again: yup.string().required("Please select an option"),

  service_experience: yup
    .string()
    .trim()
    .required("Please share what you enjoyed about the service"),
    
  prayer_point: yup.string().trim().nullable(),

  whatsapp_interest: yup.string().required("Please select Yes or No"),
});


// export const filterProductsSchema = yup.object({
//   category_id: yup.number().required(),
//   limit: yup.number().required(),
//   min_price: yup.number().required(),
//   max_price: yup.number().required(),
//   location: yup.string().trim().required(),
// });
// export const updatePasswordSchema = yup.object({
//   oldPassword: yup.string().required("Old password is required"),
//   newPassword: yup
//     .string()
//     .min(8, "Password must be at least 8 characters long")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "Password must contain at least one special character"
//     )
//     .required("New password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
//     .required("Confirm password is required"),
// });
// export const updateProfileSchema = yup.object({
//   first_name: yup
//     .string()
//     .trim()
//     .min(3, "First name must be at least 3 characters")
//     .max(20, "First name must not exceed 20 characters")
//     .required("First name is required"),
//   last_name: yup
//     .string()
//     .trim()
//     .min(3, "Last name must be at least 3 characters")
//     .max(20, "Last name must not exceed 20 characters")
//     .required("Last name is required"),
//   phone_number: yup
//     .string()
//     .nullable()
//     .optional()
//     .matches(/^0[789][01]\d{8}$/, "Invalid phone number format"),
//   twitter: yup.string().trim().nullable().optional().url("Must be a valid url"),
//   instagram: yup.string().trim().nullable().optional().url("Must be a valid url"),
//   facebook: yup.string().trim().nullable().optional().url("Must be a valid url"),
//   linkedin: yup.string().trim().nullable().optional().url("Must be a valid url"),
//   bio: yup.string().trim().nullable().optional().max(300, "Bio must not exceed 300 characters"),
// });
// export const commentFormSchema = yup
//   .object({
//     content: yup
//       .string()
//       .trim()
//       .min(3, "content must be at least 3 characters")
//       .max(500, "content must not be greater than 500 characters")
//       .required("content is required"),
//   })
//   .required();
// export const countryCitySchema = yup
//   .object({
//     country: yup.string().trim().required("Country selection is required"),
//     city: yup.string().trim().required("City selection is required"),
//   })
//   .required();
// export const partnershipFormSchema = yup.object({
//   name: yup
//     .string()
//     .trim()
//     .min(2, "Name must be at least 2 characters")
//     .max(50, "Name must not exceed 50 characters")
//     .required("Name is required"),
//   email: yup.string().trim().email("Email must be a valid email address").required("Email is required"),
//   title: yup
//     .string()
//     .trim()
//     .min(3, "Title must be at least 3 characters")
//     .max(100, "Title must not exceed 100 characters")
//     .required("Title is required"),
//   message: yup
//     .string()
//     .trim()
//     .min(10, "Message must be at least 10 characters")
//     .max(1000, "Message must not exceed 1000 characters")
//     .required("Message is required"),
// });
// export const contactSchema = yup.object().shape({
//   email: yup.string().email("Enter a valid email").required("Email is required"),
//   firstName: yup.string().required("First name is required"),
//   lastName: yup.string().required("Last name is required"),
//   phone: yup.string().matches(/^0[789][01]\d{8}$/, "Invalid phone number format"),
//   message: yup
//     .string()
//     .trim()
//     .min(10, "Message must be at least 10 characters")
//     .max(1000, "Message must not exceed 1000 characters")
//     .required("Message is required"),
// });
