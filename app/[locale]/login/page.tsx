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
import { LoginFormSchema } from "@/schemas/form-schemas";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [pending, startTransition] = useTransition();
  const t = useScopedI18n("LoginPage");
  const tComun = useScopedI18n("Common");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Success");
          router.replace("/profile");
        }
      } catch (error) {
        toast.error("Error");
      }
    });
  };

  return (
    <main className="flex h-[calc(100vh-183px)] flex-col items-center justify-center text-3xl text-gray-300">
      <Card className="w-[500px] max-w-[90vw]">
        <CardHeader className="text-center">
          <CardTitle className="text-primary"> {t("login")} </CardTitle>
          <CardDescription className="font-medium">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
}

export default LoginPage;
