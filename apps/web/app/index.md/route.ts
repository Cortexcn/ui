import { HOME_MARKDOWN } from "@/lib/home-markdown";
import { markdownResponse } from "@/lib/llms";
import { STUDIO_URL } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(HOME_MARKDOWN, `${STUDIO_URL}/`);
}
