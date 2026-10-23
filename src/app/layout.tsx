import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/fredoka/wght.css";
import "@fontsource-variable/nunito-sans/wght.css";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBar } from "@/components/layout/PreviewBar";
import { site } from "@/config/site";
import { school } from "@/content/school";
import { navItems } from "@/lib/navigation";
import { jsonLdString, organisationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...(site.siteUrl ? { metadataBase: new URL(site.siteUrl) } : {}),
  title: {
    default: `${school.plainName} | ECD Centre in Aerodrome, Bindura`,
    template: `%s | ${school.plainName} ECD Centre, Bindura`,
  },
  description: school.factualSummary,
  applicationName: school.plainName,
  keywords: ["Barney's Place", "ECD Centre", "Early Childhood Development", "preschool", "Aerodrome", "Bindura", "Zimbabwe"],
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#C62D3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const items = navItems();
  return (
    <html lang="en-ZW">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <PreviewBar />
        <Header items={items} phones={school.phones} schoolName={school.name} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer items={items} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(organisationJsonLd()) }} />
      </body>
    </html>
  );
}
