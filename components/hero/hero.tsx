import Image from "next/image";
import { buttonVariants } from "../ui/button";
import Link from "../global/link";
import { cn } from "@/lib/utils";
import { HandPlatter, NotepadText } from "lucide-react";
import { Exo } from "next/font/google";
import { getScopedI18n } from "@/locales/server";

const dancingScript = Exo({
  subsets: ["latin"],
  weight: ["700"],
});

// type ButtonHero = {
//   className?: string;
//   text: string;
//   icon: LucideIcon;
//   action?: () => void;
// };
// type HeroProps = {
//   className?: string;
//   tile: string;
//   description: string;
//   image: string;
//   alt: string;
// };

const Hero = async () => {
  const home_page = await getScopedI18n("HomePage");

  return (
    <section className="section-padding flex items-center text-center lg:h-[calc(100vh-72px)] lg:text-start">
      <div className="container grid grid-cols-12 items-center">
        <div className="col-span-full space-y-5 lg:col-span-8">
          <h1 className={cn("mb-10 text-4xl font-bold uppercase leading-snug text-primary drop-shadow-lg lg:mb-0 lg:text-7xl", dancingScript.className)}>
            {home_page("title")}
          </h1>
          <div className="relative flex h-56 justify-center lg:hidden">
            <Image src="/tajin.png" alt="" width={200} height={200} loading="eager" priority className="object-contain" />
          </div>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident soluta asperiores, tenetur autem nesciunt tempore, aliquam veritatis qui
            ducimus, voluptate obcaecati accusamus nam quae! Eum beatae nemo unde dolorum provident.
          </p>
          <div className="flex w-full flex-col items-start gap-x-4 gap-y-2 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="" className={cn(buttonVariants({ variant: "default" }), "w-full sm:w-fit")}>
              <HandPlatter />
              Rejoignez-nous
            </Link>
            <Link className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-fit")} href="">
              <NotepadText />
              Découvrez notre carte
            </Link>
          </div>
        </div>
        <div className="relative col-span-full hidden h-72 lg:col-span-4 lg:flex lg:justify-center">
          <Image src="/tajin.png" alt="" width={1000} height={1000} loading="eager" priority className="object-contain" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
