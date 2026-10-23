import Link from "next/link";
import { Pip } from "@/components/illustrations/brand";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container section-head section-head--center">
        <Pip className="values-speaker__pip" waving />
        <h1 className="h1">This page wandered off</h1>
        <p className="lead muted">The page you were looking for isn’t here. Let’s get you back on the path.</p>
        <div className="btn-row" style={{ justifyContent: "center", width: "100%" }}>
          <Link className="btn" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn--secondary" href="/contact/">
            Contact the school
          </Link>
        </div>
      </div>
    </section>
  );
}
