import { directionsUrl } from "@/content/school";
import { ExternalIcon } from "@/components/icons";

export function DirectionsLink({ label = "Get directions", className = "btn btn--green" }: { label?: string; className?: string }) {
  return (
    <a className={className} href={directionsUrl} target="_blank" rel="noopener noreferrer">
      {label}
      <ExternalIcon size={18} />
      <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
    </a>
  );
}
