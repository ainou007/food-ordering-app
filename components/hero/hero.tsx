import Image from "next/image";
import { buttonVariants } from "../ui/button";
import Link from "../global/link";
import { cn } from "@/lib/utils";
import { HandPlatter, NotepadText } from "lucide-react";
import { Exo } from "next/font/google";
import { getI18n } from "@/locales/server";

const dancingScript = Exo({
  subsets: ["latin"],
  weight: ["700"],
});

const Hero = async () => {
  const t = await getI18n();

  return (
    <section className="section-padding flex items-center text-center lg:h-[calc(100vh-72px)] lg:text-start">
      <div className="container grid grid-cols-12 items-center">
        <div className="col-span-full space-y-5 lg:col-span-8">
          <h1
            className={cn(
              "mb-10 text-4xl font-bold uppercase leading-snug text-primary drop-shadow-lg lg:mb-0 lg:text-7xl",
              dancingScript.className,
            )}
          >
            {t("HomePage.title")}
          </h1>
          <div className="relative flex h-56 justify-center lg:hidden">
            <Image
              src="/tajin.png"
              alt=""
              width={3000}
              height={200}
              loading="eager"
              priority
              className="object-contain"
            />
          </div>
          <p className="text-muted-foreground">{t("HomePage.description")}</p>
          <div className="flex w-full flex-col items-start gap-x-4 gap-y-2 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full sm:w-fit",
              )}
            >
              <HandPlatter />
              {t("HomePage.joinUs")}
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full sm:w-fit",
              )}
              href=""
            >
              <NotepadText />
              {t("HomePage.menu")}
            </Link>
          </div>
        </div>
        <div className="relative col-span-4 hidden h-[500px] items-center justify-center lg:flex">
          <Image
            src="/tajin.png"
            alt=""
            width={240}
            height={200}
            loading="eager"
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
