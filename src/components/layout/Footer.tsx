import Link from "next/link";
import { LogoMark } from "@/components/illustrations/brand";
import { ShieldIcon } from "@/components/icons";
import { site } from "@/config/site";
import { hero, school } from "@/content/school";
import { isPublishable } from "@/lib/content";
import { telHref } from "@/lib/phone";
import type { NavItem } from "./Header";

export function Footer({ items }: { items: NavItem[] }) {
  const { address } = school;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="stack">
            <Link href="/" className="footer-brand" aria-label={`${school.name} — home`}>
              <span className="footer-brand__tile">
                <LogoMark size={46} />
              </span>
              <span className="footer-brand__name">{school.name}</span>
            </Link>
            {isPublishable(hero.status) && (
              <p className="footer-tagline">
                {hero.lineOne} {hero.lineTwo}
              </p>
            )}
            <p className="footer-desc">
              An {school.type} in {address.suburb}, {address.town}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer-heading">EXPLORE</h2>
            <ul className="footer-links">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-heading">VISIT</h2>
            <address className="footer-address">
              {address.stand}
              <br />
              {address.suburb}
              <br />
              {address.town}, {address.country}
            </address>
          </div>

          <div>
            <h2 className="footer-heading">CALL</h2>
            <ul className="footer-phones">
              {school.phones.map((phone) => (
                <li key={phone.e164}>
                  <a className="footer-phone" href={telHref(phone)} aria-label={`Call ${phone.display}`}>
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="registration-line">
            <ShieldIcon size={18} color="#8FD3A6" />
            {school.registration.statement}
          </p>
          <p>
            © {new Date().getFullYear()} {school.name}.
            {site.demoMode ? " Website concept — proposed logo and copy pending owner approval." : null}
          </p>
        </div>
      </div>
    </footer>
  );
}
