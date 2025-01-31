import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions } from "next-auth";
import { db } from "@/drizzle/db";
import { login as loginRoute } from "@/constants/routes";
import { login } from "@/auth/login";
import { JWT } from "next-auth/jwt";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { RoleEnum } from "@/drizzle/schema";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string;
    role: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      picture: string;
      role: string;
    };
  }
}

export const authConfig: AuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.picture = token.image as string;
        session.user.role = token.role;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          picture: token.image,
          role: token.role,
        },
      };
    },
    jwt: async ({ token }): Promise<JWT> => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email as string));

      if (!user) {
        return token;
      }

      return {
        ...token,
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        picture: user[0].image as string,
        role: user[0].role,
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const res = await login(credentials as { email: string; password: string });
        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],

  pages: {
    signIn: loginRoute,
  },
};
