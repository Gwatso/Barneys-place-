import { school } from "@/content/school";
import { HomeIcon } from "@/components/icons";

export function AddressCard() {
  const { address } = school;
  return (
    <div className="address-card">
      <span className="address-card__icon">
        <HomeIcon size={24} />
      </span>
      <address>
        <strong>{school.name}</strong>
        <br />
        {address.stand}, {address.suburb}
        <br />
        {address.town}, {address.country}
      </address>
    </div>
  );
}
