"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { AlertIcon, CheckIcon, ChevronDownIcon, PhoneIcon } from "@/components/icons";
import type { EnquiryDelivery } from "@/config/site";
import { enquiryTopics } from "@/content/school";
import type { Phone } from "@/content/types";
import { LIMITS, submitEnquiry, validateEnquiry, type EnquiryField, type EnquiryInput } from "@/lib/enquiry";

type Status = "idle" | "submitting" | "success" | "error";

const empty: EnquiryInput = { name: "", phone: "", topic: "", message: "" };
const fieldOrder: EnquiryField[] = ["name", "phone", "topic", "message"];

export const DEMO_NOTICE = "This is a demonstration. Your enquiry has not been sent to the school.";

export function EnquiryForm({ delivery, phones }: { delivery: Exclude<EnquiryDelivery, { kind: "none" }>; phones: readonly Phone[] }) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<{ demo: boolean; name: string; phone: string; topic: string } | null>(null);
  const fieldRefs = useRef<Partial<Record<EnquiryField, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const demo = delivery.kind === "demo";

  const errors = validateEnquiry(values);
  const errorCount = Object.keys(errors).length;
  const show = (field: EnquiryField) => Boolean(errors[field]) && (touched[field] || submitted);
  const valid = (field: EnquiryField) => !errors[field] && touched[field] && values[field].trim() !== "";
  const sending = status === "submitting";
  const id = (field: string) => `${uid}-${field}`;

  const set = (field: EnquiryField) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));
  const touch = (field: EnquiryField) => () => setTouched((current) => ({ ...current, [field]: true }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSubmitted(true);
    const currentErrors = validateEnquiry(values);
    const firstInvalid = fieldOrder.find((field) => currentErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setStatus("submitting");
    const outcome = await submitEnquiry(values, delivery);
    if (outcome.ok) {
      setResult({ demo: outcome.demo, name: values.name.trim(), phone: values.phone.trim(), topic: values.topic });
      setStatus("success");
      requestAnimationFrame(() => doneHeading.current?.focus());
    } else {
      setStatus("error");
    }
  }

  function reset() {
    setValues(empty);
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
    setResult(null);
  }

  if (status === "success" && result) {
    const firstName = result.name.split(" ")[0] || "there";
    return (
      <div className="confirmation" role="status">
        <svg className="confirmation__tick" width="120" height="120" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <circle cx="60" cy="60" r="54" fill="#E6F5EB" stroke="#1E7F47" strokeWidth="5" />
          <path d="M36 62 L52 78 L86 44" fill="none" stroke="#1E7F47" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="22" r="6" fill="#F4C542" />
          <circle cx="108" cy="26" r="5" fill="#BD2878" />
          <circle cx="104" cy="100" r="6" fill="#C62D3A" />
        </svg>
        <h2 ref={doneHeading} tabIndex={-1} className="h2" style={{ fontSize: "clamp(1.9rem, 1.5rem + 1.6vw, 2.8rem)" }}>
          {result.demo ? `Thank you, ${firstName}!` : `Thank you, ${firstName} — your enquiry was sent.`}
        </h2>
        {result.demo ? (
          <div className="notice notice--demo">
            <AlertIcon size={22} />
            <p>
              <strong>{DEMO_NOTICE}</strong> To reach the school today, please call.
            </p>
          </div>
        ) : (
          <p className="lead muted">The school will call you back on the number you gave us.</p>
        )}
        <dl>
          <dt>Name</dt>
          <dd>{result.name}</dd>
          <dt>Number</dt>
          <dd>{result.phone}</dd>
          <dt>Topic</dt>
          <dd>{result.topic}</dd>
        </dl>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: 10, width: "100%" }}>
          <a className="btn" href={`tel:${phones[0].e164}`}>
            <PhoneIcon />
            Call {phones[0].display}
          </a>
          <button type="button" className="btn btn--secondary" onClick={reset}>
            Start a new enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-head">
        <h2 id={id("title")} className="h2" style={{ fontSize: "clamp(1.9rem, 1.5rem + 1.6vw, 2.8rem)" }}>
          Parent enquiry
        </h2>
        {demo && <span className="demo-badge">Demo form · nothing is sent</span>}
      </div>
      <p className="muted" style={{ marginTop: 10 }}>
        Leave your details and the school will call you back. Fields marked <span aria-hidden="true" className="field__required">*</span>
        <span className="visually-hidden">with an asterisk</span> are required.
      </p>

      <div aria-live="assertive">
        {submitted && errorCount > 0 && (
          <div className="notice notice--error" style={{ marginTop: 20 }}>
            <AlertIcon size={22} />
            <p>
              Almost there! Please check the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below.
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="notice notice--error" style={{ marginTop: 20 }}>
            <AlertIcon size={22} />
            <p>
              Sorry, your enquiry could not be sent just now. Nothing was received by the school. Please try again, or call{" "}
              <a href={`tel:${phones[0].e164}`}>{phones[0].display}</a>.
            </p>
          </div>
        )}
      </div>

      <form className="form-grid" noValidate onSubmit={handleSubmit} aria-labelledby={id("title")}>
        <div>
          <label className="field__label" htmlFor={id("name")}>
            Parent or guardian name <span aria-hidden="true" className="field__required">*</span>
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            className="input"
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Tendai Moyo"
            maxLength={LIMITS.nameMax}
            value={values.name}
            onChange={set("name")}
            onBlur={touch("name")}
            aria-required="true"
            aria-invalid={show("name")}
            aria-describedby={show("name") ? id("name-error") : undefined}
            disabled={sending}
          />
          {show("name") && <FieldError id={id("name-error")} message={errors.name!} />}
          {valid("name") && <FieldOk message="Lovely, thank you." />}
        </div>

        <div>
          <label className="field__label" htmlFor={id("phone")}>
            Preferred contact number <span aria-hidden="true" className="field__required">*</span>
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            className="input"
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 077 123 4567"
            maxLength={24}
            value={values.phone}
            onChange={set("phone")}
            onBlur={touch("phone")}
            aria-required="true"
            aria-invalid={show("phone")}
            aria-describedby={show("phone") ? id("phone-error") : undefined}
            disabled={sending}
          />
          {show("phone") && <FieldError id={id("phone-error")} message={errors.phone!} />}
          {valid("phone") && <FieldOk message="Great — the school can call this number." />}
        </div>

        <div className="form-grid__full">
          <label className="field__label" htmlFor={id("topic")}>
            Enquiry topic <span aria-hidden="true" className="field__required">*</span>
          </label>
          <div className="select-wrap">
            <select
              ref={(el) => {
                fieldRefs.current.topic = el;
              }}
              className="input"
              id={id("topic")}
              name="topic"
              value={values.topic}
              onChange={(event) => {
                set("topic")(event);
                touch("topic")();
              }}
              onBlur={touch("topic")}
              aria-required="true"
              aria-invalid={show("topic")}
              aria-describedby={show("topic") ? id("topic-error") : undefined}
              disabled={sending}
            >
              <option value="">Choose a topic…</option>
              {enquiryTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <ChevronDownIcon />
          </div>
          {show("topic") && <FieldError id={id("topic-error")} message={errors.topic!} />}
        </div>

        <div className="form-grid__full">
          <label className="field__label" htmlFor={id("message")}>
            Message <span className="field__optional">(optional)</span>
          </label>
          <textarea
            ref={(el) => {
              fieldRefs.current.message = el;
            }}
            className="input"
            id={id("message")}
            name="message"
            placeholder="Your child’s age, when you hope to start, or anything you’d like us to know."
            maxLength={LIMITS.messageMax}
            value={values.message}
            onChange={set("message")}
            aria-describedby={id("message-count")}
            disabled={sending}
          />
          <p id={id("message-count")} className="field__hint" style={{ textAlign: "right" }}>
            {values.message.length} / {LIMITS.messageMax} characters
          </p>
        </div>

        <div className="form-grid__full form-submit">
          <button className="btn" type="submit" disabled={sending} aria-describedby={id("submit-note")}>
            {sending && <span className="spinner" aria-hidden="true" />}
            {sending ? "Sending…" : "Send enquiry"}
          </button>
          <p id={id("submit-note")}>
            {demo
              ? "Owner preview: this form validates your details but never sends them anywhere or stores them."
              : "Your details are only used by the school to reply to your enquiry."}
          </p>
        </div>
        <p className="visually-hidden" aria-live="polite">
          {sending ? "Sending your enquiry…" : ""}
        </p>
      </form>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="field__msg field__msg--error">
      <AlertIcon size={16} />
      {message}
    </p>
  );
}

function FieldOk({ message }: { message: string }) {
  return (
    <p className="field__msg field__msg--ok">
      <CheckIcon size={16} />
      {message}
    </p>
  );
}
