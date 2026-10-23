import Link from "next/link";
import { DayStones } from "@/components/home/DayStones";
import { LearningCards } from "@/components/home/LearningCards";
import { ValueDots } from "@/components/home/ValueDots";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { PhilosophyArt } from "@/components/illustrations/learning";
import { HeroScene, MapScene } from "@/components/illustrations/scenes";
import { AddressCard } from "@/components/ui/Address";
import { DirectionsLink } from "@/components/ui/DirectionsLink";
import { PhoneCards } from "@/components/ui/PhoneLinks";
import { ProposedTag } from "@/components/ui/ProposedTag";
import { RegistrationChip } from "@/components/ui/Registration";
import { site } from "@/config/site";
import { dayOfDiscoveries, enquiryCta, hero, homeIntro, learningAreas, philosophy, school, values } from "@/content/school";
import { isPublishable, publishable } from "@/lib/content";
import { telHref } from "@/lib/phone";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

export default function HomePage() {
  const showHero = isPublishable(hero.status);
  const areas = publishable(learningAreas);
  const steps = publishable(dayOfDiscoveries);
  const shownValues = publishable(values);
  const [phone] = school.phones;

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <span className="dot" aria-hidden="true" style={{ width: 180, height: 180, background: "var(--berry-tint)", top: -60, left: -50 }} />
        <span className="dot dot--desktop" aria-hidden="true" style={{ width: 90, height: 90, background: "var(--leaf-mist)", top: 160, right: "6%" }} />
        <div className="container" style={{ position: "relative" }}>
          <div className="hero__tags">
            <span className="hero__eyebrow">
              {school.type} · {school.address.suburb}, {school.address.town}
            </span>
            <ProposedTag status={hero.status} />
          </div>
          <h1 id="hero-title" className="hero__title">
            {showHero ? (
              <>
                <span>{hero.lineOne}</span>
                <span className="hero__title-accent">{hero.lineTwo}</span>
              </>
            ) : (
              <span>{hero.fallback.heading}</span>
            )}
          </h1>
          <div className="hero__body">
            <div className="hero__copy">
              <p className="lead">{showHero ? hero.intro : hero.fallback.intro}</p>
              <div className="btn-row">
                <Link className="btn" href="/learning-journey/">
                  Explore Our Learning Journey
                  <ArrowRightIcon />
                </Link>
                <Link className="btn btn--secondary" href="/contact/">
                  Talk to Our School
                </Link>
              </div>
              <RegistrationChip />
            </div>
            <div className="hero__scene">
              <HeroScene />
            </div>
          </div>
        </div>
        <svg className="wave-edge" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 34 C240 70 480 0 720 26 C960 52 1200 8 1440 34 L1440 70 L0 70Z" fill="#FFFFFF" />
        </svg>
      </section>

      {/* Introduction */}
      {isPublishable(homeIntro.status) && (
        <section className="section section--white" aria-labelledby="intro-title">
          <div className="container intro">
            <p className="eyebrow">{homeIntro.eyebrow}</p>
            <h2 id="intro-title" className="intro__heading">
              {homeIntro.headingParts.map((part, index) =>
                part.tone ? (
                  <strong key={index} className={`ink-${part.tone}`}>
                    {part.text}
                  </strong>
                ) : (
                  part.text
                ),
              )}
            </h2>
            {homeIntro.body.map((paragraph) => (
              <p key={paragraph} className="lead">
                {paragraph}
              </p>
            ))}
            <p style={{ marginTop: 20 }}>
              <ProposedTag status={homeIntro.status} />
            </p>
          </div>
        </section>
      )}

      {/* Philosophy */}
      {isPublishable(philosophy.status) && (
        <section className="section section--cream" aria-labelledby="philosophy-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow eyebrow--leaf">{philosophy.eyebrow}</p>
                <h2 id="philosophy-title" className="h2 section-head__title">
                  {philosophy.heading}
                  <br />
                  <span className="ink-leaf">{philosophy.headingAccent}</span>
                </h2>
              </div>
              <div style={{ maxWidth: 460 }}>
                <p className="lead muted">{philosophy.intro}</p>
                <p style={{ marginTop: 12 }}>
                  <ProposedTag status={philosophy.status} label="Proposed philosophy" />
                </p>
              </div>
            </div>
            <div className="pillars">
              {philosophy.pillars.map((pillar, index) => (
                <article key={pillar.title} className={`card card--lift pillar ${index === 1 ? "pillar--feature" : ""}`}>
                  <div className="pillar__top">
                    <PhilosophyArt stage={index as 0 | 1 | 2} />
                    <span className="pillar__num" aria-hidden="true" style={{ color: ["#F4C542", "#8FD3A6", "#F6B8CF"][index] }}>
                      0{index + 1}
                    </span>
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Learning experiences */}
      {areas.length > 0 && (
        <section className="section section--white" aria-labelledby="learning-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow eyebrow--magenta">Learning experiences</p>
                <h2 id="learning-title" className="h2 section-head__title">
                  Six ways little minds grow
                </h2>
                <p className="lead muted" style={{ marginTop: 14 }}>
                  Play is how young children learn. Open any card to see what a moment of learning might look like.
                </p>
              </div>
              <Link className="btn btn--secondary" href="/learning-journey/">
                See the full Learning Journey
              </Link>
            </div>
            <LearningCards areas={areas} />
          </div>
        </section>
      )}

      {/* A Day Full of Little Discoveries */}
      {steps.length > 0 && (
        <section className="day" aria-labelledby="day-title">
          <div className="scallop" aria-hidden="true" />
          <div className="container section" style={{ paddingTop: "clamp(48px, 7vw, 96px)" }}>
            <div className="section-head section-head--center">
              <p className="eyebrow eyebrow--sun">A sample day</p>
              <h2 id="day-title" className="h2">
                A Day Full of Little Discoveries
              </h2>
              <p className="lead">Follow the stepping stones through a typical day. Choose a stone to find out more.</p>
            </div>
            <DayStones steps={steps} />
            <p className="day__note">Illustrative sample routine for discussion — not a confirmed daily timetable.</p>
          </div>
        </section>
      )}

      {/* Values */}
      {shownValues.length > 0 && (
        <section className="section wall-ridges" aria-labelledby="values-title">
          <div className="container">
            <ValueDots values={shownValues} showMascot={site.showMascot}>
              <p className="eyebrow">Our values</p>
              <h2 id="values-title" className="h2 section-head__title">
                Six little words we grow by
              </h2>
              <p style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <Link className="text-link" href="/about/">
                  Read more about who we are
                </Link>
                <ProposedTag status={shownValues[0].status} label="Proposed values" />
              </p>
            </ValueDots>
          </div>
        </section>
      )}

      {/* Enquiry CTA */}
      <section className="section section--cream" aria-labelledby="cta-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <span className="dot" aria-hidden="true" style={{ width: 260, height: 260, background: "var(--magenta)", right: -60, top: -80 }} />
            <span className="dot dot--desktop" aria-hidden="true" style={{ width: 120, height: 120, background: "var(--sun)", right: 180, bottom: -50 }} />
            <div>
              <p className="eyebrow" style={{ color: "#FFD9DD" }}>
                For parents &amp; guardians
              </p>
              <h2 id="cta-title" className="h2 section-head__title">
                {isPublishable(enquiryCta.status) ? enquiryCta.heading : `Interested in ${school.name}?`}
              </h2>
              <p className="lead">
                {isPublishable(enquiryCta.status)
                  ? enquiryCta.body[0]
                  : "Call the school to ask about places, fees and starting dates."}
              </p>
            </div>
            <div className="cta-band__actions">
              <a className="btn btn--yellow" href={telHref(phone)}>
                <PhoneIcon />
                Call {phone.display}
              </a>
              <Link className="btn btn--ghost" href="/admissions/">
                Start an enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visit & call */}
      <section className="section section--white" aria-labelledby="visit-title">
        <div className="container visit">
          <div className="visit__info">
            <p className="eyebrow eyebrow--leaf">Visit &amp; call</p>
            <h2 id="visit-title" className="h2">
              Find us in Aerodrome Medium
            </h2>
            <AddressCard />
            <PhoneCards />
            <div className="btn-row">
              <DirectionsLink />
              <Link className="btn btn--secondary" href="/contact/">
                All contact details
              </Link>
            </div>
          </div>
          <figure className="map-figure">
            <MapScene />
            <figcaption>Illustrative map, not to scale. Use “Get directions” for live navigation.</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
