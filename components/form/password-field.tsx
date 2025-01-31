"use client";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useCurrentLocale } from "@/locales/client";

interface PasswordFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

export function PasswordField({
  control,
  name,
  label,
  placeholder,
}: PasswordFieldProps) {
  const [isHidden, setIsHidden] = useState(true);
  const currentLocal = useCurrentLocale();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                className="border border-gray-400"
                type={isHidden ? "password" : "text"}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <Button
              className={`absolute ${currentLocal === "ar" ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 hover:bg-transparent`}
              type="button"
              variant={"ghost"}
              onClick={() => setIsHidden(!isHidden)}
            >
              {isHidden ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
