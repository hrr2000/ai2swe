import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <h1 style={{ fontSize: "6rem", margin: "0", fontFamily: "var(--font-mono)", color: "var(--accent-emerald)" }}>404</h1>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Endpoint Not Found</h2>
        <p className="text-muted" style={{ marginBottom: "2.5rem" }}>
          We couldn't resolve the route you explicitly requested. The data you are looking for has either been moved to another cluster or never existed in the first place.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">
            Return to Root
          </Link>
          <Link href="/tutorials" className="btn btn-ghost">
            View Curriculum
          </Link>
        </div>
      </div>
    </div>
  );
}
