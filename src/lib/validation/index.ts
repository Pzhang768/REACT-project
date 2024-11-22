import { z } from "zod"
export const SignupValiadation = z.object({
    name: z.string().min(2, { message: 'Too short' }),
    username: z.string().min(2, { message: 'Too short' }).max(50),
    email: z.string().min(2, { message: 'Too short' }).max(50),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }).max(50),
})