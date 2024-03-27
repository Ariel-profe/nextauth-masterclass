
import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email es required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export const registerSchema = z.object({
    name: z.string().min(2, {
        message: "Name is required"
    }).toLowerCase(),
    email: z.string().email({
        message: "Email es required"
    }).toLowerCase(),
    password: z.string().min(6, {
        message: "Minimun 6 characters required"
    })
});