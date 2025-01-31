import { I18nProviderClient } from "@/locales/client";
import React, { PropsWithChildren } from "react";

const LocaProvider = ({
  locale,
  children,
}: PropsWithChildren<{ locale: string }>) => {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
};

export default LocaProvider;
