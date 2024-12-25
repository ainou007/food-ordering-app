import { unstable_cache as next_cache } from "next/cache";
import { cache as react_cache } from "react";

type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback>(cb: T, keyParts: string[], options: { revalidate?: number | false; tags?: string[] }) {
  return next_cache(react_cache(cb), keyParts, options);
}
