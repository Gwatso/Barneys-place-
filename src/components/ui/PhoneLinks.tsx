import { school } from "@/content/school";
import { telHref } from "@/lib/phone";
import { PhoneIcon } from "@/components/icons";

/** Both school numbers as large, tappable call cards. */
export function PhoneCards() {
  return (
    <div className="phone-grid">
      {school.phones.map((phone) => (
        <a key={phone.e164} className="phone-card" href={telHref(phone)} aria-label={`Call ${school.name} on ${phone.display}`}>
          <span className="phone-card__icon">
            <PhoneIcon />
          </span>
          <span className="phone-card__number">{phone.display}</span>
        </a>
      ))}
    </div>
  );
}
