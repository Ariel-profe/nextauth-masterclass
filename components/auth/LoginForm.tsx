"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { CardWrapper } from "@/components/auth/CardWrapper";
import { loginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { login } from "@/actions/login";

export const LoginForm = () => {

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (form:z.infer<typeof loginSchema>) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            login(form)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success)
                })
        });
    };

  return (
    <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
    >
        <Form {...form}>
            <form 
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="youremail@example.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error}  />
                <FormSuccess message={success}  />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Login
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}
