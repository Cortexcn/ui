/**
 * Public stand-in for the Studio pill's label. The live site animates it with
 * Shimmering Text, a Cortexcn Pro component; here it is plain text.
 */
export function HeroShimmerLabel({
  text,
}: Readonly<{ paused: boolean; text: string }>) {
  return <span className="leading-none">{text}</span>;
}
