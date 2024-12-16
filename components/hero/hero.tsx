import Image from "next/image";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "../global/link";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <div className="py-32">
      <div className="container">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-6 space-y-4">
            <h1 className="text-5xl text-muted-foreground">
              The morrocan food for all
            </h1>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reprehenderit voluptatum, esse molestias quaerat explicabo magni
              quo dicta fuga. Illo dolores molestiae totam dolorum eius quos
              officia quam cum officiis quis?
            </p>
            <div className="flex items-center gap-x-3">
              <Link
                href=""
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Order now
              </Link>
              <Link
                href=""
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                button 2
              </Link>
            </div>
          </div>
          <div className="col-span-6 flex items-center justify-center">
            <Image
              className="w-80"
              width={1000}
              height={1000}
              src="/tajin.png"
              alt=""
              loading="eager"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
