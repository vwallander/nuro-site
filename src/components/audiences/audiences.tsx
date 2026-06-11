import Reveal from "@/components/motion/reveal";
import styles from "./audiences.module.css";

/**
 * Audiences dark band (`#audience`) — SPEC §4 Audiences / card N-08.
 *
 * Server component: all copy is verbatim from the spec and present in the
 * SSR HTML. Three columns (Students / Teachers / Parents), each a frosted
 * pitch-deck preview card (white headline pill + gradient accent) + title +
 * mono eyebrow + 3 dash bullets. Columns reveal with a per-column 0.08s
 * stagger; cards float gently (desynced); the closing paragraph reveals
 * after the grid. The preview-card pill is decorative (a styled <span>,
 * not a control).
 */

type Audience = {
  kicker: string;
  headingPlain: string;
  headingGradient: string;
  body?: string;
  roster?: readonly string[];
  pill: string;
  title: string;
  eyebrow: string;
  bullets: readonly string[];
};

const AUDIENCES: readonly Audience[] = [
  {
    kicker: "TUESDAY · APR 21 · 8:42 AM",
    headingPlain: "Morning, Maya.",
    headingGradient: "A gentle start today.",
    body: "You have 2 focus blocks and 1 reading assignment scheduled.",
    pill: "Start first block",
    title: "For Students",
    eyebrow: "Personalized support",
    bullets: [
      "24/7 personalized support",
      "Zero overwhelm",
      "Research-backed structure",
    ],
  },
  {
    kicker: "ENGLISH · PERIOD 3",
    headingPlain: "24 students.",
    headingGradient: "Focus score 72.",
    roster: [
      "Maya Jones · ADHD",
      "Elijah Park · Autism",
      "Sofia Reyes · Dyslexia",
    ],
    pill: "Open class",
    title: "For Teachers",
    eyebrow: "Adaptive efficiency",
    bullets: [
      "Automated adaptation",
      "Saves 40+ hours per month",
      "Easier documentation and follow-up",
    ],
  },
  {
    kicker: "THIS WEEK · MAYA",
    headingPlain: "She's had a",
    headingGradient: "strong week.",
    body: "Maya completed 93% of her focus blocks and finished her English reading two days early.",
    pill: "View full progress",
    title: "For Parents",
    eyebrow: "Full transparency",
    bullets: [
      "Real-time progress feed",
      "Auto-compliance documentation",
      "Direct connection with teachers",
    ],
  },
];

const CLOSING =
  "By automating support, Nuro doesn't just save time, it prevents the lifetime societal cost of student dropouts due to lack of bandwidth.";

function PreviewCard({ audience }: { audience: Audience }) {
  return (
    <div className={styles.previewCard}>
      <div className={styles.kicker}>{audience.kicker}</div>
      <h4 className={styles.previewHeading}>
        <span className={styles.headingPill}>
          {audience.headingPlain}{" "}
          <span className={styles.accent}>{audience.headingGradient}</span>
        </span>
      </h4>
      {audience.body !== undefined && (
        <p className={styles.previewBody}>{audience.body}</p>
      )}
      {audience.roster !== undefined && (
        <div className={styles.roster}>
          {audience.roster.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      )}
      <span className={styles.pill}>
        <span aria-hidden="true">▶</span> {audience.pill}
      </span>
    </div>
  );
}

export default function Audiences() {
  return (
    <section id="audience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {AUDIENCES.map((audience, i) => (
            <Reveal
              key={audience.title}
              className={styles.col}
              delay={i * 0.08}
            >
              <PreviewCard audience={audience} />
              <h3 className={styles.title}>{audience.title}</h3>
              <div className={styles.eyebrow}>{audience.eyebrow}</div>
              <ul className={styles.bullets}>
                {audience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className={styles.closing} delay={0.24}>
          {CLOSING}
        </Reveal>
      </div>
    </section>
  );
}
