import Link from "next/link";
import { Gallery } from "@/components/gallery/Gallery";
import { site } from "@/config/site";
import { gallery, galleryCategories, school } from "@/content/school";
import { publishableGallery } from "@/lib/content";
import { telHref } from "@/lib/phone";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("gallery");

export default function GalleryPage() {
  const items = publishableGallery(gallery);

  return (
    <>
      <section className="section section--cream" aria-labelledby="gallery-title" style={{ paddingTop: "clamp(48px, 7vw, 88px)" }}>
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow eyebrow--magenta">Gallery</p>
              <h1 id="gallery-title" className="h1 section-head__title">
                Little moments, <span className="ink-magenta">big smiles</span>
              </h1>
              <p className="lead" style={{ marginTop: 18 }}>
                A window into everyday life at {school.name}.{items.length > 0 ? " Tap any picture to view it full-screen." : ""}
              </p>
            </div>
            {items.length > 0 && (
              <div className="gallery-legend">
                <span>
                  <span className="badge badge--illustration">Illustration</span>
                  Original artwork, not a photograph
                </span>
                {site.demoMode && (
                  <span>
                    <span className="badge badge--placeholder">Photo placeholder</span>
                    Awaiting an authorised school photo
                  </span>
                )}
              </div>
            )}
          </div>

          {items.length > 0 ? (
            <Gallery items={items} categories={galleryCategories} />
          ) : (
            <div className="empty-state">
              <h2 className="h3">Photos coming soon</h2>
              <p className="muted" style={{ marginTop: 10 }}>
                We’re preparing photographs of life at {school.name}. In the meantime, we’d love to tell you about the centre —{" "}
                <a href={telHref(school.phones[0])}>call {school.phones[0].display}</a> or <Link href="/contact/">visit our contact page</Link>.
              </p>
            </div>
          )}
        </div>
      </section>

      {site.demoMode && (
        <section className="section section--white" aria-labelledby="photos-title">
          <div className="container split" style={{ alignItems: "start" }}>
            <div>
              <p className="eyebrow eyebrow--leaf">For the owners</p>
              <h2 id="photos-title" className="h2 section-head__title">
                How real school photos will replace these
              </h2>
              <p className="lead muted" style={{ marginTop: 14 }}>
                Nothing on this page is a photograph of {school.name}. When you’re ready, authorised photos slot straight into the same
                frames — the layout, filters and full-screen viewer stay exactly as they are.
              </p>
            </div>
            <ol className="photo-steps">
              <li>
                <span className="num-badge accent-berry" aria-hidden="true">1</span>
                <h3>Choose &amp; get consent</h3>
                <p>Select photos and confirm written permission from parents or guardians for any child shown.</p>
              </li>
              <li>
                <span className="num-badge accent-sun" aria-hidden="true">2</span>
                <h3>Send the originals</h3>
                <p>Share full-size images with a short caption and the category each belongs to.</p>
              </li>
              <li>
                <span className="num-badge accent-leaf" aria-hidden="true">3</span>
                <h3>We swap them in</h3>
                <p>Each placeholder is replaced, with descriptive alternative text written for every image.</p>
              </li>
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
