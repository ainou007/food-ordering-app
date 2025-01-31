"use server";
import bcrypt from "bcrypt";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const register = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    // verifier si l'utilisateur existe dans la base de données
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();
    if (user.length > 0) {
      return {
        message: "User already exists",
        status: 409, // Conflict
      };
    }

    // ajouter l'utilisateur dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({ email, password: hashedPassword, name: username })
      .returning();
    return {
      message: "User created successfully",
      status: 201, // Created
    };
  } catch (error) {
    return {
      message: "Error creating user",
      status: 500, // Internal Server Error
    };
  }
};
