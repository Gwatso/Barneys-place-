import { site } from "@/config/site";

/** "OWNER PREVIEW · SAMPLE CONTENT" — shown only in demo mode. */
export function PreviewBar() {
  if (!site.demoMode) return null;
  return (
    <div className="preview-bar" role="note" aria-label="Owner preview notice">
      <span className="preview-bar__label">OWNER PREVIEW · SAMPLE CONTENT</span>
      <span className="preview-bar__note">Wording marked “Proposed” is awaiting the owners’ approval and is not yet published.</span>
    </div>
  );
}
