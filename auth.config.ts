
import type {NextAuthConfig} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                const validatedFields = loginSchema.safeParse(credentials);

                if(validatedFields.success){
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if(passwordsMatch) return user;
                };

                return null;
            }
        })
    ]
} satisfies NextAuthConfig

