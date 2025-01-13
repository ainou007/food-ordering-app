import { I18nProviderClient } from "@/locales/client";
import React, { PropsWithChildren } from "react";

const LocaProvider = (props: PropsWithChildren<{ locale: string }>) => {
  return <I18nProviderClient locale={props.locale}>{props.children} </I18nProviderClient>;
};

export default LocaProvider;
