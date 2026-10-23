import { CopyButton } from "@/components/contact/CopyButton";
import { PhoneIcon, ShieldIcon } from "@/components/icons";
import { MapScene } from "@/components/illustrations/scenes";
import { AddressCard } from "@/components/ui/Address";
import { DirectionsLink } from "@/components/ui/DirectionsLink";
import { contact, fullAddress, school } from "@/content/school";
import { contactChannels } from "@/lib/channels";
import { localDigits, telHref } from "@/lib/phone";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata("contact");

const cardAccents = ["berry", "sun"];
const readyAccents = ["berry", "sun", "leaf", "magenta"];

export default function ContactPage() {
  const channels = contactChannels(school.channels);

  return (
    <>
      <section className="page-hero" aria-labelledby="contact-title">
        <span className="dot dot--desktop" aria-hidden="true" style={{ width: 120, height: 120, background: "var(--berry-tint)", right: "8%", top: 30 }} />
        <span className="dot dot--desktop" aria-hidden="true" style={{ width: 48, height: 48, background: "var(--leaf-mist)", right: "22%", top: 140 }} />
        <div className="container" style={{ position: "relative" }}>
          <p className="eyebrow">Contact</p>
          <h1 id="contact-title" className="h1 page-hero__title" style={{ maxWidth: 900 }}>
            We’d love to <span className="ink-berry">hear from you.</span>
          </h1>
          <p className="lead">{contact.intro}</p>
          <div className="call-cards">
            {school.phones.map((phone, index) => (
              <div key={phone.e164} className="call-card-wrap">
                <a className={`call-card accent-${cardAccents[index % cardAccents.length]}`} href={telHref(phone)} aria-label={`Call ${school.name} on ${phone.display}`}>
                  <span className="call-card__icon" aria-hidden="true">
                    <PhoneIcon size={28} />
                  </span>
                  <span>
                    <span className="call-card__label">TAP TO CALL</span>
                    <span className="call-card__number">{phone.display}</span>
                  </span>
                </a>
                <CopyButton text={localDigits(phone)} label="Copy number" />
              </div>
            ))}
          </div>
          {channels.length > 0 && (
            <ul className="channel-list">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a className="text-link" href={channel.href} {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {channel.label}: {channel.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section section--white" aria-labelledby="location-title">
        <div className="container visit">
          <div className="visit__info">
            <p className="eyebrow eyebrow--leaf">Where to find us</p>
            <h2 id="location-title" className="h2">
              Come and visit
            </h2>
            <AddressCard />
            <CopyButton text={`${school.plainName}, ${fullAddress}`} label="Copy address" />
            <div>
              <DirectionsLink label="Get directions in Google Maps" />
            </div>
            <p className="muted" style={{ fontSize: "0.875rem" }}>
              Opens Google Maps in a new tab, searching for the school’s address.
            </p>
          </div>
          <figure className="map-figure">
            <MapScene large />
            <figcaption>Illustrative map, not to scale. Streets shown are decorative and do not represent real roads.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="ready-title">
        <div className="container two-col">
          <div className="card" style={{ background: "var(--white)", border: "2px solid var(--line)" }}>
            <h2 id="ready-title" className="h3" style={{ fontSize: "clamp(1.6rem, 1.3rem + 1vw, 2.4rem)" }}>
              Helpful to have ready when you call
            </h2>
            <ul className="ready-list">
              {contact.readyList.map((item, index) => (
                <li key={item}>
                  <span className={`num-badge accent-${readyAccents[index]}`} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/admissions/" className="text-link" style={{ display: "inline-block", marginTop: 22 }}>
              Prefer to write? Go to Admissions
            </Link>
          </div>
          <aside className="trust-card" aria-label="Registration">
            <ShieldIcon size={52} strokeWidth={1.8} color="var(--leaf-deep)" />
            <p>{school.registration.statement}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
