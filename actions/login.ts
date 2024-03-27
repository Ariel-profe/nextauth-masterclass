"use server";

import * as z from "zod";
import {AuthError} from 'next-auth'

import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async(form: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(form);

    if(!validatedFields.success){
        return {error: "Invalid fields!"};
    }

    const {email, password} = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {

        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Email or password does not exist"}
            
                default:
                    return {error: "Something went wrong"};
            }
        }

        throw error;
    }
};