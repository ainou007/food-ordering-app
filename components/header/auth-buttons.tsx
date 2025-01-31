"use client";
import Link from "@/components/global/link";
import { LogIn } from "lucide-react";
import { login, register } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useI18n } from "@/locales/client";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import UseClientSession from "@/hooks/use-client-session";

const AuthButtons = ({ session }: { session: Session | null }) => {
  const { data } = UseClientSession(session);
  const t = useI18n();
  return data?.user ? (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      {t("Navbar.logout")}
    </Button>
  ) : (
    <div className="flex flex-col gap-2 md:flex-row">
      <Link href={login} className={`${cn(buttonVariants({ variant: "default" }), "w-fit")}`}>
        <LogIn /> {t("Navbar.login")}
      </Link>
      <Link href={register} className={`${cn(buttonVariants({ variant: "outline" }), "w-fit")}`}>
        {t("Navbar.register")}
      </Link>
    </div>
  );
};

export default AuthButtons;
