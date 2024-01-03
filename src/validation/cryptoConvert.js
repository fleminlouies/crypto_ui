import * as yup from 'yup'

export const validationSchema = yup.object({
  sourceCrypto: yup.string().required('Source Crypto is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  targetCurrency: yup.string().required('Target Currency is required'),
})
