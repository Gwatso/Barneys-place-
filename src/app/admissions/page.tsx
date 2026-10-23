import Link from "next/link";
import { EnquiryForm } from "@/components/admissions/EnquiryForm";
import { QuestionAccordion } from "@/components/admissions/QuestionAccordion";
import { ChatIcon, ChecklistIcon, PhoneIcon } from "@/components/icons";
import { GateScene } from "@/components/illustrations/scenes";
import { ProposedTag } from "@/components/ui/ProposedTag";
import { site } from "@/config/site";
import { admissions, fullAddress, school } from "@/content/school";
import { isPublishable } from "@/lib/content";
import { telHref } from "@/lib/phone";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("admissions");

const stepStyles = [
  { accent: "berry", Icon: PhoneIcon },
  { accent: "sun", Icon: ChatIcon },
  { accent: "leaf", Icon: ChecklistIcon },
] as const;

export default function AdmissionsPage() {
  const showHero = isPublishable(admissions.hero.status);
  const delivery = site.enquiry;

  return (
    <>
      <section className="page-hero page-hero--magenta" aria-labelledby="adm-title">
        <span className="dot" aria-hidden="true" style={{ width: 320, height: 320, background: "var(--magenta-dark)", left: -120, bottom: -160 }} />
        <span className="dot dot--desktop" aria-hidden="true" style={{ width: 60, height: 60, background: "var(--sun)", left: "46%", top: 40 }} />
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              Admissions
              <ProposedTag status={admissions.hero.status} />
            </p>
            <h1 id="adm-title" className="h1 page-hero__title">
              {showHero ? admissions.hero.heading : admissions.hero.fallbackHeading}
            </h1>
            <p className="lead">{showHero ? admissions.hero.intro : admissions.hero.fallbackIntro}</p>
            <div className="btn-row" style={{ marginTop: 30 }}>
              {delivery.kind !== "none" && (
                <a className="btn btn--yellow" href="#enquiry">
                  Send an enquiry
                </a>
              )}
              <a className="btn btn--secondary" href={telHref(school.phones[0])}>
                <PhoneIcon />
                Call {school.phones[0].display}
              </a>
            </div>
          </div>
          <div className="page-hero__art">
            <GateScene />
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">How to enquire</p>
            <h2 id="how-title" className="h2">
              Three friendly steps
            </h2>
            <p className="lead muted">There’s no complicated paperwork to start. A conversation is all it takes.</p>
          </div>
          <ol className="steps">
            {admissions.steps.map((step, index) => {
              const { accent, Icon } = stepStyles[index];
              return (
                <li key={step.title} className={`card card--lift step-card accent-${accent}`}>
                  <div className="step-card__top">
                    <span className="step-card__num" aria-hidden="true">
                      {index + 1}
                    </span>
                    <Icon size={64} />
                  </div>
                  <h3>
                    <span className="visually-hidden">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p>{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="faq-title">
        <div className="container questions">
          <div>
            <p className="eyebrow eyebrow--leaf">Good questions to ask</p>
            <h2 id="faq-title" className="h2 section-head__title">
              Not sure where to start?
            </h2>
            <p className="lead muted" style={{ marginTop: 14 }}>
              Here are the questions most parents ask. The school will answer each one personally when you get in touch.
            </p>
            {site.demoMode && (
              <p className="notice notice--placeholder" style={{ marginTop: 22 }}>
                Answers about ages, places, fees and documents will appear here once the owners have confirmed them. Nothing is
                published as fact until then.
              </p>
            )}
          </div>
          <QuestionAccordion questions={admissions.questions} />
        </div>
      </section>

      <section id="enquiry" className="section section--cream" aria-label="Enquire">
        <div className="container enquiry">
          <div className="panel enquiry__form-card">
            {delivery.kind === "none" ? (
              <div className="stack">
                <h2 className="h2" style={{ fontSize: "clamp(1.9rem, 1.5rem + 1.6vw, 2.8rem)" }}>
                  Enquire by phone
                </h2>
                <p className="lead muted">
                  Online enquiries are not available yet. Please call the school — we’ll be happy to answer your questions.
                </p>
                <div className="btn-row">
                  {school.phones.map((phone) => (
                    <a key={phone.e164} className="btn" href={telHref(phone)}>
                      <PhoneIcon />
                      Call {phone.display}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <EnquiryForm delivery={delivery} phones={school.phones} />
            )}
          </div>
          <aside className="enquiry__aside" aria-label="Other ways to reach us">
            <div className="talk-card">
              <h2 className="h3">Prefer to talk?</h2>
              <p>Most families start with a phone call. We’re happy to help.</p>
              <div className="stack" style={{ marginTop: 18 }}>
                {school.phones.map((phone) => (
                  <a key={phone.e164} className="btn btn--yellow" href={telHref(phone)}>
                    <PhoneIcon />
                    {phone.display}
                  </a>
                ))}
              </div>
            </div>
            <div className="visit-card">
              <h2 className="h3" style={{ fontSize: "1.375rem" }}>
                Visit us
              </h2>
              <address className="muted" style={{ marginTop: 6 }}>
                {fullAddress}
              </address>
              <Link href="/contact/" className="text-link" style={{ display: "inline-block", marginTop: 10 }}>
                Directions &amp; contact
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
