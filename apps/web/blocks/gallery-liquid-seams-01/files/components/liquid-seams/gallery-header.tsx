/** The gallery's heading and a line that tells visitors what to try. */
export function GalleryHeader({
  id,
  heading,
  description,
}: {
  id: string;
  heading: string;
  description?: string;
}) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <h2
        className="text-balance font-semibold text-3xl tracking-tight sm:text-4xl"
        id={id}
      >
        {heading}
      </h2>
      {description ? (
        <p className="max-w-md text-pretty text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
