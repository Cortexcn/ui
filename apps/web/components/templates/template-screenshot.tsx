import Image from "next/image";
import type { ThemedImage } from "@/lib/site-templates";
import { cn } from "@/lib/utils";

/**
 * The light or dark capture of a template, following the site theme. The
 * hidden one is lazy, so a visitor only downloads the one they can see.
 */
export function TemplateScreenshot({
  alt,
  className,
  image,
  sizes,
}: {
  alt: string;
  className?: string;
  image: ThemedImage;
  sizes: string;
}) {
  return (
    <>
      <Image
        alt={alt}
        className={cn("h-auto w-full dark:hidden", className)}
        placeholder="blur"
        sizes={sizes}
        src={image.light}
      />
      <Image
        alt={alt}
        className={cn("hidden h-auto w-full dark:block", className)}
        placeholder="blur"
        sizes={sizes}
        src={image.dark}
      />
    </>
  );
}

/**
 * `TemplateScreenshot` filling its positioned parent, cropped to one part of
 * the capture. `position` is a CSS `object-position`, such as "50% 30%" for a
 * section about a third of the way down a full-page capture.
 */
export function TemplateScreenshotCrop({
  image,
  position,
  sizes,
}: {
  image: ThemedImage;
  position: string;
  sizes: string;
}) {
  return (
    <>
      <Image
        alt=""
        className="object-cover dark:hidden"
        fill
        placeholder="blur"
        sizes={sizes}
        src={image.light}
        style={{ objectPosition: position }}
      />
      <Image
        alt=""
        className="hidden object-cover dark:block"
        fill
        placeholder="blur"
        sizes={sizes}
        src={image.dark}
        style={{ objectPosition: position }}
      />
    </>
  );
}
