import { z } from "zod"

export const SignupValiadation = z.object({
    name: z.string().min(2, { message: 'Name input is too short' }),
    username: z.string().min(2, { message: 'Username needs to be between 2-50 characters' }).max(50),
    email: z.string().min(2, { message: 'email input is too short' }).max(50),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }).max(50),
})

export const SigninValiadation = z.object({
    email: z.string().min(2, { message: 'Too short' }).max(50),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }).max(50),
})

export const PostValiadation = z.object({
    caption: z.string().min(2).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(1).max(100),
    tags: z.string(),
})