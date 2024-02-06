import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(10, 'Password must be at least 10 characters long')

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    acceptTerms: z
      .boolean()
      .refine((value) => value, 'You must agree to the terms')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export const forgotPasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type TRegisterSchema = z.infer<typeof registerSchema>
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
