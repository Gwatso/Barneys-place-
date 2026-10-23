import { school } from "@/content/school";
import { ShieldIcon } from "@/components/icons";

/** The owner-confirmed registration statement. No number or certificate is shown. */
export function RegistrationChip({ className = "registration-chip" }: { className?: string }) {
  return (
    <p className={className}>
      <ShieldIcon size={22} color="var(--leaf-deep)" />
      {school.registration.statement}
    </p>
  );
}
