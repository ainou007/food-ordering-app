"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { LocaleType } from "@/middleware";
const ChangeLang = () => {
  const currentLangue = useCurrentLocale();
  const changeLangue = useChangeLocale();
  return (
    <Select
      onValueChange={(e) => {
        changeLangue(e as LocaleType);
      }}
      defaultValue={currentLangue}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select a langue" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="">
          <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
          <SelectItem value="fr">🇫🇷 Français</SelectItem>
          <SelectItem value="en">🇬🇧 Anglais</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChangeLang;
