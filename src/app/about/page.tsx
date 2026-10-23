import Link from "next/link";
import { ValueCards } from "@/components/about/ValueCards";
import { PencilIcon } from "@/components/icons";
import { AboutScene } from "@/components/illustrations/scenes";
import { Highlight } from "@/components/ui/Highlight";
import { ProposedTag } from "@/components/ui/ProposedTag";
import { RegistrationChip } from "@/components/ui/Registration";
import { site } from "@/config/site";
import { about, school, values } from "@/content/school";
import { isPublishable, publishable } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about");

const promiseAccents = ["sun", "magenta", "leaf", "berry"];

export default function AboutPage() {
  const showHero = isPublishable(about.hero.status);
  const showWho = isPublishable(about.whoWeAre.status);
  const showMission = isPublishable(about.mission.status);
  const showVision = isPublishable(about.vision.status);
  const shownValues = publishable(values);
  const hasStory = about.story.text.length > 0 && isPublishable(about.story.status);

  return (
    <>
      <section className="page-hero" aria-labelledby="about-title">
        <span className="dot" aria-hidden="true" style={{ width: 140, height: 140, background: "var(--leaf-mist)", left: -40, bottom: 40 }} />
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              About {school.name}
              <ProposedTag status={about.hero.status} />
            </p>
            <h1 id="about-title" className="h1 page-hero__title">
              {showHero ? <Highlight text={about.hero.heading} word={about.hero.highlight} /> : `About ${school.name}`}
            </h1>
            <p className="lead">{showHero ? about.hero.intro : school.factualSummary}</p>
          </div>
          <div className="page-hero__art">{site.showMascot && <AboutScene />}</div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="who-title">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            {showWho ? (
              <>
                <p className="eyebrow eyebrow--leaf">{about.whoWeAre.eyebrow}</p>
                <h2 id="who-title" className="h2 section-head__title">
                  {about.whoWeAre.heading}
                </h2>
                <div className="stack" style={{ marginTop: 18 }}>
                  {about.whoWeAre.body.map((p) => (
                    <p key={p} className="lead muted">
                      {p}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 id="who-title" className="h2">
                  Who we are
                </h2>
                <p className="lead muted" style={{ marginTop: 18 }}>
                  {school.factualSummary} To find out more about the centre, please call us.
                </p>
              </>
            )}
            <RegistrationChip className="registration-chip registration-chip--panel" />
          </div>

          {hasStory ? (
            <aside className="story-placeholder" style={{ borderStyle: "solid", background: "var(--white)" }} aria-labelledby="story-title">
              <h3 id="story-title" className="h3">
                Our story
              </h3>
              {about.story.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </aside>
          ) : (
            site.demoMode && (
              <aside className="story-placeholder" aria-labelledby="story-title">
                <p className="story-placeholder__label" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <PencilIcon size={22} /> PLACEHOLDER · TO BE WRITTEN WITH THE OWNERS
                </p>
                <h3 id="story-title" className="h3">
                  Our story
                </h3>
                <p className="muted">
                  This space is reserved for the owners’ own words — how {school.name} began, what inspired it and what they hope every
                  child takes with them.
                </p>
                <p className="muted">No history, dates or names will be published until the owners supply and approve them.</p>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-subtle)" }}>
                  Suggested length: 80–150 words · optional owner photograph (with consent)
                </p>
              </aside>
            )
          )}
        </div>
      </section>

      {(showMission || showVision) && (
        <section className="section section--cream" aria-labelledby="guides-title">
          <div className="container">
            <h2 id="guides-title" className="h2" style={{ textAlign: "center" }}>
              What guides us
            </h2>
            <div className="auto-grid" style={{ ["--min" as string]: "420px", marginTop: 44 }}>
              {showMission && (
                <article className="statement statement--mission">
                  <span className="statement__blob" aria-hidden="true" />
                  <div className="statement__head">
                    <h3 className="statement__label">OUR MISSION</h3>
                    <ProposedTag status={about.mission.status} label="Proposed · needs approval" />
                  </div>
                  <blockquote>“{about.mission.text}”</blockquote>
                </article>
              )}
              {showVision && (
                <article className="statement statement--vision">
                  <span className="statement__blob" aria-hidden="true" />
                  <div className="statement__head">
                    <h3 className="statement__label">OUR VISION</h3>
                    <ProposedTag status={about.vision.status} label="Proposed · needs approval" />
                  </div>
                  <blockquote>“{about.vision.text}”</blockquote>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {shownValues.length > 0 && (
        <section className="section section--white" aria-labelledby="values-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow eyebrow--magenta">Our values</p>
                <h2 id="values-title" className="h2 section-head__title">
                  Six values, planted in every day
                </h2>
              </div>
              <ProposedTag status={shownValues[0].status} label="Proposed values" />
            </div>
            <ValueCards values={shownValues} />
          </div>
        </section>
      )}

      {isPublishable(about.promises.status) && (
        <section className="section promises" aria-labelledby="promise-title">
          <div className="container split" style={{ alignItems: "start" }}>
            <div>
              <p className="eyebrow eyebrow--sun">Our promise to families</p>
              <h2 id="promise-title" className="h2 section-head__title">
                {about.promises.heading}
              </h2>
              <p style={{ marginTop: 16 }}>
                <ProposedTag status={about.promises.status} label="Proposed commitments" />
              </p>
            </div>
            <ol className="promise-list">
              {about.promises.items.map((item, index) => (
                <li key={item.title} className="promise">
                  <span className={`num-badge accent-${promiseAccents[index]}`} aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="section section--cream" aria-labelledby="about-cta">
        <div className="container section-head section-head--center">
          <h2 id="about-cta" className="h2">
            Come and see {school.name} for yourself
          </h2>
          <p className="lead muted">
            The best way to get to know us is to talk with us. Call the school or send an enquiry, and we’ll be happy to answer your
            questions.
          </p>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 14, width: "100%" }}>
            <Link className="btn" href="/admissions/">
              Make an enquiry
            </Link>
            <Link className="btn btn--secondary" href="/learning-journey/">
              Explore our Learning Journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
