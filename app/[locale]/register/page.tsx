"use client";
import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useScopedI18n } from "@/locales/client";
import { EmailField } from "@/components/form/email-field";
import { PasswordField } from "@/components/form/password-field";
import { LoaderCircle, LogIn } from "lucide-react";
import { RegisterFormSchema } from "@/schemas/form-schemas";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import TextField from "@/components/form/text-field";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { register } from "@/auth/register";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const [pending, startTransition] = useTransition();
  const t = useScopedI18n("RegisterPage");
  const tComun = useScopedI18n("Common");

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    startTransition(async () => {
      const res = await register({
        email: data.email,
        username: data.username,
        password: data.password,
      });
      if (res?.status === 201) {
        toast.success(t("registerSuccess"));
        redirect("/login");
      } else {
        toast.error(res?.message);
      }
    });
  };
  return (
    <main className="flex h-[calc(100vh-183px)] flex-col items-center justify-center text-3xl text-gray-300">
      <Card className="w-[500px] max-w-[90vw]">
        <CardHeader className="text-center">
          <CardTitle className="text-primary"> {t("register")} </CardTitle>
          <CardDescription className="font-medium">
            {" "}
            {t("description")}{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <TextField
                name="username"
                control={form.control}
                label={t("username")}
                placeholder="username@example.com"
              />
              <EmailField
                name="email"
                control={form.control}
                label={t("email")}
                placeholder="email@example.com"
              />
              <PasswordField
                name="password"
                control={form.control}
                label={t("password")}
                placeholder="••••••"
              />
              <PasswordField
                name="confirmPassword"
                control={form.control}
                label={t("confirmPassword")}
                placeholder="••••••"
              />
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    {tComun("loading")}
                  </>
                ) : (
                  <>
                    <LogIn /> {t("login")}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </main>
  );
};

export default RegisterPage;
