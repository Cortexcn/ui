import type { ReactNode } from "react";

import { LibraryFooter } from "@/components/ui-home/library-footer";
import { LibraryHomeShell } from "@/components/ui-home/library-home-shell";

export default function LibraryHomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LibraryHomeShell footer={<LibraryFooter />}>{children}</LibraryHomeShell>
  );
}
