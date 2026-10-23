import Link from "next/link";
import { AlertIcon } from "@/components/icons";
import { PathScene } from "@/components/illustrations/scenes";
import { AreaSelector } from "@/components/learning/AreaSelector";
import { DayStepper } from "@/components/learning/DayStepper";
import { ProposedTag } from "@/components/ui/ProposedTag";
import { dayOfDiscoveries, homeLearningTips, learningAreas, learningPage, school } from "@/content/school";
import { isPublishable, publishable } from "@/lib/content";
import { telHref } from "@/lib/phone";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("learning");

export default function LearningJourneyPage() {
  const showIntro = isPublishable(learningPage.status);
  const areas = publishable(learningAreas);
  const steps = publishable(dayOfDiscoveries);
  const [phone] = school.phones;

  return (
    <>
      <section className="page-hero page-hero--sun" aria-labelledby="lj-title">
        <span className="dot" aria-hidden="true" style={{ width: 220, height: 220, background: "var(--sun-hover)", right: -60, top: -40 }} />
        <div className="container section-head section-head--center" style={{ maxWidth: 1040, position: "relative" }}>
          <p className="eyebrow eyebrow--charcoal" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "center" }}>
            Learning Journey
            <ProposedTag status={learningPage.status} />
          </p>
          <h1 id="lj-title" className="h1">
            {showIntro ? learningPage.heading : "Learning Journey"}
          </h1>
          <p className="lead">
            {showIntro ? learningPage.intro : "Details of how children learn at Barney’s Place will appear here soon. Please call the school to find out more."}
          </p>
        </div>
        <PathScene />
      </section>

      {areas.length > 0 && (
        <section className="section section--cream" aria-labelledby="areas-title" style={{ paddingTop: "clamp(32px, 5vw, 64px)" }}>
          <div className="container">
            <div style={{ maxWidth: 720 }}>
              <p className="eyebrow">Six areas of early learning</p>
              <h2 id="areas-title" className="h2 section-head__title">
                {learningPage.areasHeading}
              </h2>
              <p className="lead muted" style={{ marginTop: 12 }}>
                {learningPage.areasIntro}
              </p>
            </div>
            <AreaSelector areas={areas} />
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section section--white" aria-labelledby="day-title">
          <div className="container" style={{ maxWidth: 1100 }}>
            <div className="section-head section-head--center">
              <p className="eyebrow eyebrow--leaf">A sample routine</p>
              <h2 id="day-title" className="h2">
                A Day of Little Discoveries
              </h2>
              <p className="lead muted">Five gentle chapters give each day a familiar rhythm. Step through them below.</p>
              <p className="timetable-note">
                <AlertIcon size={16} />
                Illustrative sample for discussion — not a confirmed timetable
              </p>
            </div>
            <DayStepper steps={steps} />
          </div>
        </section>
      )}

      <section className="section section--cream" aria-labelledby="tips-title">
        <div className="container">
          {isPublishable(homeLearningTips.status) && (
            <>
              <div className="section-head section-head--split">
                <div>
                  <p className="eyebrow eyebrow--magenta">For families</p>
                  <h2 id="tips-title" className="h2 section-head__title">
                    {homeLearningTips.heading}
                  </h2>
                </div>
                <ProposedTag status={homeLearningTips.status} />
              </div>
              <div className="auto-grid" style={{ marginTop: 40, ["--gap" as string]: "20px" }}>
                {homeLearningTips.tips.map((tip) => (
                  <article key={tip.title} className={`card card--lift tip accent-${tip.accent}`}>
                    <h3>{tip.title}</h3>
                    <p>{tip.body}</p>
                  </article>
                ))}
              </div>
            </>
          )}
          <div className="cta-band cta-band--forest" style={{ marginTop: 48 }}>
            <div>
              <h2 className="h2" style={{ fontSize: "clamp(1.9rem, 1.4rem + 2vw, 2.8rem)" }}>
                Want to see learning in action?
              </h2>
              <p className="lead">Talk to the school about how the day works, what your child will need and how to arrange a visit.</p>
            </div>
            <div className="cta-band__actions">
              <Link className="btn" href="/admissions/">
                Make an enquiry
              </Link>
              <a className="btn btn--secondary" href={telHref(phone)}>
                Call {phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
