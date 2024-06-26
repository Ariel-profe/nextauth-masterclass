import NextAuth, {DefaultSession} from "next-auth";
import authConfig from "@/auth.config";
import {PrismaAdapter} from '@auth/prisma-adapter';

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER"
}

declare module "next-auth" {
  
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    callbacks: {
      async session({token, session}){

        if(token.sub && session.user){
          session.user.id = token.sub
        };

        if(token.role && session.user){
          session.user.role = token.role;
        }
        
        return session;
      },
      async jwt({token}){

        if(!token.sub) return token;

        const existingUser = await getUserById(token.sub);

        if(!existingUser) return token;

        token.role = existingUser.role;

        return token;
      }
    },
  ...authConfig
});