import { getCurrentLocale, getI18n } from "@/locales/server";
import Image from "next/image";

const Logo = async () => {
  const t = await getI18n();
  const currentLocal = await getCurrentLocale();

  return (
    <div className={`flex items-center font-black text-primary ${currentLocal === "ar" && "flex-row-reverse"}`}>
      {/* <Image src="/logo.png" alt="" width={45} height={100} /> */}
      {t("Common.logo")}
    </div>
  );
};

export default Logo;
