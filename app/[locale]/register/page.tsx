import React from "react";
import { getScopedI18n } from "@/locales/server";

async function RegisterPage() {
  const t = await getScopedI18n("RegisterPage");
  
  return (
    <main className="flex h-[calc(100vh-72px-105px)] select-none flex-col items-center justify-center text-center text-3xl text-gray-300">
      <div className="container text-center text-5xl font-bold text-primary">{t("title")}</div>
    </main>
  );
}

export default RegisterPage;
