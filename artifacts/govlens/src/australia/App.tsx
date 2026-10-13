import { useEffect, useState, type ReactNode } from "react";
import { Link, Route, Router, Switch, useLocation } from "wouter";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Landmark,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { programs, jurisdictions, resources, type Program } from "./data";
import "./australia.css";

const nav = [
  ["/", "Federal overview"],
  ["/state-facts", "States & territories"],
  ["/schemes", "Programs"],
  ["/reports", "Audit reports"],
  ["/parliament", "Parliament"],
  ["/funding", "Political funding"],
  ["/development-index", "Outcomes"],
];
function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className="au-source"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}
function Badge({ status }: { status: Program["status"] }) {
  return (
    <span
      className={`au-badge ${status === "Audit concerns" ? "concern" : status === "Partly effective" ? "partial" : "neutral"}`}
    >
      <span />
      {status}
    </span>
  );
}
function ProgramCard({ program: p }: { program: Program }) {
  return (
    <article className="au-card program-card">
      <div className="au-card-top">
        <span className="au-eyebrow">{p.category}</span>
        <Badge status={p.status} />
      </div>
      <Link href={`/schemes/${p.slug}`} className="au-card-title">
        {p.name}
        <ArrowUpRight size={19} />
      </Link>
      <p className="au-agency">{p.agency}</p>
      <div className="au-metric">
        {p.metric}
        <small>{p.metricLabel}</small>
      </div>
      <div className="au-finding">
        <FileText size={16} />
        <p>{p.finding}</p>
      </div>
      <div className="au-card-bottom">
        <span>{p.period}</span>
        <Link href={`/schemes/${p.slug}`}>
          View evidence <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

function downloadData() {
  const file = new Blob(
    [
      JSON.stringify(
        {
          edition: "Australia",
          reviewed: "2026-10-13",
          note: "Curated historical source snapshots; not live data.",
          programs,
        },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fair-go-australia-evidence.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ProgramList({ audits = false }: { audits?: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All topics");
  const [status, setStatus] = useState("All evidence");
  const eligible = audits
    ? programs.filter((p) =>
        ["Audit concerns", "Partly effective"].includes(p.status),
      )
    : programs;
  const filtered = eligible.filter(
    (p) =>
      `${p.name} ${p.agency} ${p.finding}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "All topics" || p.category === category) &&
      (status === "All evidence" || p.status === status),
  );
  return (
    <>
      <div className="au-filters">
        <label className="au-search">
          <Search size={18} />
          <input
            aria-label="Search programs"
            placeholder="Search programs, agencies or findings…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <SlidersHorizontal size={17} aria-hidden="true" />
        <select
          aria-label="Filter by topic"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {["All topics", ...new Set(eligible.map((p) => p.category))].map(
            (c) => (
              <option key={c}>{c}</option>
            ),
          )}
        </select>
        <select
          aria-label="Filter by evidence"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {["All evidence", ...new Set(eligible.map((p) => p.status))].map(
            (c) => (
              <option key={c}>{c}</option>
            ),
          )}
        </select>
      </div>
      <p className="au-result" aria-live="polite">
        {filtered.length} {audits ? "audit records" : "programs"} · curated
        evidence collection
      </p>
      <div className="au-grid">
        {filtered.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="au-empty">
          <Search size={26} />
          <h2>No matching evidence</h2>
          <p>Try another search or reset your filters.</p>
          <button
            className="au-button"
            onClick={() => {
              setSearch("");
              setCategory("All topics");
              setStatus("All evidence");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}

function Overview() {
  return (
    <>
      <section className="au-hero">
        <div>
          <div className="au-eyebrow">
            <span className="au-live-dot" />
            AUSTRALIAN GOVERNMENT ACCOUNTABILITY
          </div>
          <h1>
            A fair go starts with
            <br />
            <em>the facts.</em>
          </h1>
          <p>
            What was promised. What was funded. What the evidence says.
            <br className="au-desktop" /> Follow public money and government
            delivery across Australia.
          </p>
          <div className="au-hero-actions">
            <Link className="au-button" href="/schemes">
              Explore the evidence <ArrowRight size={17} />
            </Link>
            <Link className="au-text-link" href="/about">
              How we assess it <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <aside className="au-principle">
          <ShieldCheck size={27} />
          <span className="au-eyebrow">PUBLIC MONEY. PUBLIC RECORD.</span>
          <h2>
            Accountability,
            <br />
            without the spin.
          </h2>
          <p>
            Primary sources. Clear reporting periods. Evidence you can check for
            yourself.
          </p>
          <div>
            <Check size={15} /> Independent of government and parties
          </div>
        </aside>
      </section>
      <section className="au-stats" aria-label="Collection coverage">
        <div>
          <strong>{programs.length.toString().padStart(2, "0")}</strong>
          <span>Programs in this collection</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Independent audit records</span>
        </div>
        <div>
          <strong>08</strong>
          <span>State & territory source guides</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Records link to primary sources</span>
        </div>
      </section>
      <div className="au-notice">
        <ShieldCheck size={18} />
        <p>
          <strong>Evidence, with context.</strong> This is a curated starting
          collection, not a live or exhaustive tracker. Historical findings
          retain their original reporting period. Unverified outcomes are not
          scored.
        </p>
        <Link href="/about">
          Our method <ArrowUpRight size={14} />
        </Link>
      </div>
      <section>
        <div className="au-section-heading">
          <div>
            <span className="au-eyebrow">FOLLOW THE EVIDENCE</span>
            <h2>Promises meet the public record.</h2>
          </div>
          <button className="au-text-link" onClick={downloadData}>
            <ArrowDownToLine size={16} /> Download data
          </button>
        </div>
        <ProgramList />
      </section>
      <section className="au-bottom-banner">
        <div>
          <span className="au-eyebrow">CLOSER TO HOME</span>
          <h2>Accountability doesn’t stop in Canberra.</h2>
          <p>
            Explore the official audit and government sources for your state or
            territory.
          </p>
        </div>
        <Link href="/state-facts" className="au-button">
          Find your state <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}

function PageHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <header className="au-page-heading">
      <span className="au-eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </header>
  );
}
function Detail({ slug }: { slug: string }) {
  const p = programs.find((p) => p.slug === slug);
  if (!p) return <NotFound />;
  return (
    <>
      <Link className="au-text-link au-back" href="/schemes">
        ← All programs
      </Link>
      <PageHeading eyebrow={p.category} title={p.name} text={p.agency} />
      <Badge status={p.status} />
      <div className="au-detail-grid">
        <article className="au-card au-detail">
          <span className="au-eyebrow">PROGRAM OBJECTIVE</span>
          <h2>What was promised</h2>
          <p>{p.promise}</p>
          <hr />
          <span className="au-eyebrow">THE PUBLIC RECORD</span>
          <h2>What the evidence says</h2>
          <p>{p.finding}</p>
          <div className="au-notice">
            <p>{p.caveat}</p>
          </div>
        </article>
        <aside className="au-card au-detail">
          <div className="au-metric">
            {p.metric}
            <small>{p.metricLabel}</small>
          </div>
          <h3>Read the original source</h3>
          <p>{p.period}</p>
          <Source href={p.source}>{p.sourceLabel}</Source>
          <hr />
          <p>
            Source reviewed 13 October 2026. The reporting period above is the
            date of the evidence, not a claim of current performance.
          </p>
        </aside>
      </div>
    </>
  );
}
function States() {
  const [q, setQ] = useState("");
  return (
    <>
      <PageHeading
        eyebrow="ACROSS THE COUNTRY"
        title="States & territories"
        text="Start with the public record in each of Australia’s six states and two mainland territories."
      />
      <label className="au-search au-state-search">
        <Search size={18} />
        <input
          aria-label="Search states"
          placeholder="Find a state or territory…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>
      <div className="au-grid">
        {jurisdictions
          .filter((s) =>
            `${s.name} ${s.code}`.toLowerCase().includes(q.toLowerCase()),
          )
          .map((s) => (
            <article className="au-card au-state-card" key={s.code}>
              <span className="au-state-code">{s.code}</span>
              <h2>{s.name}</h2>
              <p>Capital · {s.capital}</p>
              <hr />
              <Source href={s.audit}>Auditor-General’s office</Source>
              <Source href={s.government}>Government website</Source>
              <small>Source guide · performance not yet assessed</small>
            </article>
          ))}
      </div>
      {!jurisdictions.some((s) =>
        `${s.name} ${s.code}`.toLowerCase().includes(q.toLowerCase()),
      ) && <p className="au-empty">No states or territories match “{q}”.</p>}
    </>
  );
}
function ResourcePage({ kind }: { kind: keyof typeof resources }) {
  const labels = {
    parliament: [
      "PARLIAMENTARY TRANSPARENCY",
      "People in public office",
      "Explore official registers and representatives. Individual profiles and integrity scores have not been compiled in this edition.",
    ],
    funding: [
      "FOLLOW THE MONEY",
      "Political funding, on the record.",
      "Go directly to Australian Electoral Commission disclosures. Donation totals and party comparisons have not yet been imported.",
    ],
    outcomes: [
      "BEYOND THE ANNOUNCEMENT",
      "Measure what changes.",
      "Explore Australia’s official outcome datasets. This edition does not yet calculate state rankings or a development index.",
    ],
  };
  const [eyebrow, title, text] = labels[kind];
  return (
    <>
      <PageHeading eyebrow={eyebrow} title={title} text={text} />
      <div className="au-grid">
        {resources[kind].map((r) => (
          <article className="au-card au-resource" key={r.title}>
            <Landmark size={24} />
            <span className="au-eyebrow">{r.label}</span>
            <h2>{r.title}</h2>
            <p>{r.text}</p>
            <Source href={r.url}>Open official source</Source>
          </article>
        ))}
      </div>
    </>
  );
}
function About() {
  return (
    <>
      <PageHeading
        eyebrow="OUR METHOD"
        title="Trust the evidence. Check the source."
        text="Fair Go is an Australian adaptation of the Andhbhakt civic accountability project."
      />
      <div className="au-card au-prose">
        <h2>What’s included</h2>
        <p>
          Five curated program records, three historical ANAO audits, eight
          jurisdiction source guides, and links to parliamentary, electoral and
          outcome data. Records were reviewed on 13 October 2026. This is not
          comprehensive coverage of any government’s record.
        </p>
        <h2>How to read the labels</h2>
        <p>
          <strong>Audit concerns</strong> identifies adverse findings in the
          linked ANAO report. <strong>Partly effective</strong> reflects that
          audit’s assessment. <strong>Delivery reported</strong> is a statement
          from the responsible agency, not independent verification.{" "}
          <strong>Outcome tracking</strong> links to official measurement
          without assigning a verdict.
        </p>
        <h2>Compare like with like</h2>
        <p>
          Budget commitments, expenditure, contracted pipelines and completed
          outcomes are different measures. We show source periods and context
          beside the data. Historical audit findings do not establish
          present-day performance or personal wrongdoing.
        </p>
        <h2>Coverage still to be compiled</h2>
        <p>
          Individual minister profiles, election promise histories, comparative
          scores and imported political donation data require additional source
          review. No scores or live updates are implied by the source
          directories.
        </p>
        <h2>Corrections and reuse</h2>
        <p>
          Every program links to its primary source. Download the collection to
          inspect its records and citations, or open the original project to
          propose a sourced correction. This site is not affiliated with the
          Australian Government, ANAO, AEC or any political party.
        </p>
        <button className="au-button" onClick={downloadData}>
          Download evidence collection <ArrowDownToLine size={16} />
        </button>
        <hr />
        <Source href="https://github.com/Madhav-2/andhbhakt">
          Original project on GitHub
        </Source>
      </div>
    </>
  );
}
function NotFound() {
  return (
    <div className="au-empty">
      <h1>Page not found</h1>
      <p>This page isn’t part of the Australian edition.</p>
      <Link className="au-button" href="/">
        Back to federal overview
      </Link>
    </div>
  );
}
function Shell() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.lang = "en-AU";
    document.title = `${nav.find(([url]) => url === location)?.[1] ?? (location.startsWith("/schemes/") ? "Program evidence" : location === "/about" ? "Our methodology" : "Page not found")} | Fair Go Australia`;
  }, [location]);
  return (
    <div className="au-app">
      <a href="#main" className="au-skip">
        Skip to content
      </a>
      <header className="au-header">
        <div className="au-header-inner">
          <Link href="/" className="au-logo">
            <span className="au-logo-mark">
              <Landmark size={22} />
            </span>
            <span>
              fair go
              <span className="au-logo-sub">AUSTRALIA · ACCOUNTABILITY</span>
            </span>
            <span className="au-edition">AU</span>
          </Link>
          <div className="au-header-right">
            <span className="au-eyebrow">THE PUBLIC RECORD, MADE CLEAR.</span>
            <Source href="https://github.com/Madhav-2/andhbhakt">GitHub</Source>
          </div>
        </div>
        <nav className="au-nav" aria-label="Main navigation">
          {nav.map(([url, label]) => (
            <Link
              key={url}
              href={url}
              className={
                location === url ||
                (url === "/schemes" && location.startsWith("/schemes/"))
                  ? "active"
                  : ""
              }
              aria-current={location === url ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main id="main" className="au-main">
        <Switch>
          <Route path="/" component={Overview} />
          <Route path="/central-data" component={Overview} />
          <Route path="/schemes">
            <PageHeading
              eyebrow="FEDERAL PROGRAMS"
              title="The promise. The evidence."
              text="Search Australian programs and see the sources behind each assessment."
            />
            <ProgramList />
          </Route>
          <Route path="/schemes/:slug">
            {(params) => <Detail slug={params.slug} />}
          </Route>
          <Route path="/reports">
            <PageHeading
              eyebrow="INDEPENDENT SCRUTINY"
              title="ANAO audit reports"
              text="A curated collection of historical performance audits. Read each report for its scope, findings and agency response."
            />
            <ProgramList audits />
          </Route>
          <Route path="/state-facts" component={States} />
          <Route path="/parliament">
            <ResourcePage kind="parliament" />
          </Route>
          <Route path="/funding">
            <ResourcePage kind="funding" />
          </Route>
          <Route path="/development-index">
            <ResourcePage kind="outcomes" />
          </Route>
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="au-footer">
        <div>
          <Link href="/" className="au-footer-brand">
            fair go <span>AUSTRALIA</span>
          </Link>
          <p>Public money. Public promises. Public accountability.</p>
          <small>
            Curated source snapshots · Reviewed 13 October 2026 · Amounts in
            Australian dollars
          </small>
        </div>
        <div>
          <Link href="/about">Methodology & coverage</Link>
          <button onClick={downloadData}>Download data</button>
          <Source href="https://github.com/Madhav-2/andhbhakt">
            Built from Andhbhakt
          </Source>
        </div>
      </footer>
    </div>
  );
}
export default function AustraliaApp() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Shell />
    </Router>
  );
}
