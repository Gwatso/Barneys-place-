import { showProposedTag } from "@/lib/content";
import type { ContentStatus } from "@/content/types";

/** Review-only marker for sample copy. Renders nothing outside demo mode. */
export function ProposedTag({ status, label = "Proposed copy" }: { status: ContentStatus; label?: string }) {
  if (!showProposedTag(status)) return null;
  return <span className="tag-proposed">{label}</span>;
}
