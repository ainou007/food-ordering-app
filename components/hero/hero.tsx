import Image from "next/image";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "../global/link";
import { cn } from "@/lib/utils";
import { HandPlatter, NotepadText } from "lucide-react";

const Hero = () => {
  return (
    <section className="my-24 text-center lg:text-start">
      <div className="container grid grid-cols-12">
        <div className="col-span-full space-y-5 lg:col-span-8 xl:col-span-6">
          <h1 className="text-4xl font-bold uppercase tracking-widest text-primary">
            The moroocan foods
          </h1>
          <div className="relative h-44 lg:hidden">
            <Image
              src="/tajin.png"
              alt=""
              fill
              loading="eager"
              priority
              className="object-contain"
            />
          </div>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            soluta asperiores, tenetur autem nesciunt tempore, aliquam veritatis
            qui ducimus, voluptate obcaecati accusamus nam quae! Eum beatae nemo
            unde dolorum provident.
          </p>
          <div className="flex w-full flex-col items-start gap-x-4 gap-y-2 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full sm:w-fit",
              )}
            >
              <HandPlatter />
              Order now
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full sm:w-fit",
              )}
              href=""
            >
              <NotepadText />
              Discover our menu
            </Link>
          </div>
        </div>
        <div className="relative col-span-full hidden lg:col-span-4 lg:block xl:col-span-6">
          <Image
            src="/tajin.png"
            alt=""
            fill
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
