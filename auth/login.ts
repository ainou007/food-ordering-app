"use server";

import { users } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { getScopedI18n } from "@/locales/server";
import bcrypt from "bcrypt";
import { LoginFormSchema } from "@/schemas/form-schemas";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const t = await getScopedI18n("LoginPage");

  // Validation des données d'entrée
  const credentials = { email, password };
  const validationResult = LoginFormSchema.safeParse(credentials);

  if (!validationResult.success) {
    return {
      message: validationResult.error.errors[0].message,
      status: 400,
      errors: validationResult.error.errors,
    };
  }

  try {
    // Requête pour obtenir l'utilisateur par e-mail
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, credentials.email))
      .execute();
    if (user.length === 0) {
      return { message: t("emailOrPasswordIncorrect"), status: 401 };
    }
    // verifier le mot de passe

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user[0].password,
    );

    if (!isPasswordValid) {
      return { message: t("emailOrPasswordIncorrect"), status: 401 };
    }

    const { password, ...UserWithoutPassword } = user[0];

    return {
      message: t("loginSuccess"),
      status: 200,
      user: UserWithoutPassword,
    };
  } catch (error) {
    return { message: "Error", status: 500 };
  }
};
