"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/illustrations/brand";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import type { Phone } from "@/content/types";

export interface NavItem {
  href: string;
  label: string;
  accent: string;
}

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function Header({ items, phones, schoolName }: { items: NavItem[]; phones: readonly Phone[]; schoolName: string }) {
  const pathname = normalise(usePathname() ?? "/");
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // The menu belongs to the page it was opened on, so it closes after navigation.
  const menuOpen = open && openedOn === pathname;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isCurrent = (href: string) => normalise(href) === pathname;
  const [firstPhone] = phones;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${schoolName} — home`}>
          <LogoMark className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">
              Barney’s <span>Place</span>
            </span>
            <span className="brand__tag">ECD CENTRE · BINDURA</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__list">
            {items.map((item) => (
              <li key={item.href}>
                <Link className="nav-link" href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a className="btn btn--sm site-header__call" href={`tel:${firstPhone.e164}`} aria-label={`Call us on ${firstPhone.display}`}>
            <PhoneIcon size={18} />
            Call us
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setOpenedOn(pathname);
              setOpen(!menuOpen);
            }}
          >
            {menuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile">
          <ul className="mobile-nav__list">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  className="mobile-nav__link"
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span className={`mobile-nav__dot accent-${item.accent}`} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-nav__calls">
            {phones.map((phone, index) => (
              <a key={phone.e164} className={`btn ${index === 0 ? "" : "btn--secondary"}`} href={`tel:${phone.e164}`}>
                <PhoneIcon size={18} />
                Call {phone.display}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
