import React from "react";
import { getScopedI18n } from "@/locales/server";

async function ContactUsPage() {
  const t = await getScopedI18n("ContactPage");
  
  return (
    <main className="flex h-[calc(100vh-72px-105px)] select-none flex-col items-center justify-center text-center text-3xl text-gray-300">
      <div className="container text-center text-5xl font-bold text-primary">{t("title")}</div>
    </main>
  );
}

export default ContactUsPage;
