import Image from "next/image";

import { cn } from "@/lib/utils";

import type { ClientLogo as ClientLogoFiles } from "./mcp-setup";

/**
 * An AI client's logo, from public/logos. Themed logos swap with the page
 * theme; the rest show one file in both.
 */
export function ClientLogo({
  logo,
  size = 20,
  className,
}: {
  logo: ClientLogoFiles;
  size?: number;
  className?: string;
}) {
  const imageClassName = cn("shrink-0 object-contain", className);

  if (logo.light === logo.dark) {
    return (
      <Image
        alt=""
        className={imageClassName}
        height={size}
        src={logo.light}
        style={{ width: size, height: size }}
        unoptimized
        width={size}
      />
    );
  }

  return (
    <>
      <Image
        alt=""
        className={cn(imageClassName, "dark:hidden")}
        height={size}
        src={logo.light}
        style={{ width: size, height: size }}
        unoptimized
        width={size}
      />
      <Image
        alt=""
        className={cn(imageClassName, "hidden dark:block")}
        height={size}
        src={logo.dark}
        style={{ width: size, height: size }}
        unoptimized
        width={size}
      />
    </>
  );
}
