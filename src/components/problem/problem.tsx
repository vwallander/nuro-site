import Reveal from "@/components/motion/reveal";
import styles from "./problem.module.css";

/**
 * Problem section (`#problem`) — SPEC §4 Problem.
 *
 * Server component: all copy is verbatim from the spec and present in the
 * SSR HTML. Motion comes from the shared <Reveal> primitive; the three stat
 * cards stagger at 0.08s steps. Stat numerals use per-card tinted
 * (single-stop-shifted) holo gradients — blue / purple / pink.
 */

type Stat = {
  value: string;
  tint: "blue" | "purple" | "pink";
  body: string;
  source: string;
};

const STATS: readonly Stat[] = [
  {
    value: "94%",
    tint: "blue",
    body: "of teachers say they do not have the right tools to support neurodivergent students.",
    source: "Karolinska Institute, Emma Leifler (2022)",
  },
  {
    value: "82%",
    tint: "purple",
    body: "of teachers say they do not have enough time to properly support students with additional needs.",
    source: "Skolverket, 2018",
  },
  {
    value: "51%",
    tint: "pink",
    body: "of schools admit that students with NDD diagnoses are NOT getting the support they are legally entitled to.",
    source: "Lärarnas Riksförbund",
  },
];

const TINT_CLASS: Record<Stat["tint"], string> = {
  blue: styles.tintBlue,
  purple: styles.tintPurple,
  pink: styles.tintPink,
};

export default function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.metaRow}>
          <span className={styles.eyebrow}>The Problem</span>
          <span className={styles.chip}>🇸🇪 Initial market, Sweden</span>
        </Reveal>

        <Reveal as="h2" className={styles.heading} delay={0.06}>
          The system is failing our{" "}
          <span className="holo-text">most vulnerable students.</span>
        </Reveal>

        <Reveal as="p" className={styles.subLead} delay={0.12}>
          And it&apos;s costing <strong>EVERYONE</strong>, teachers, families
          and schools.
        </Reveal>

        <Reveal as="p" className={styles.subDetail} delay={0.18}>
          225,000+ neurodivergent students in Sweden have a legal right to
          support they are not receiving.
        </Reveal>

        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <Reveal
              as="article"
              key={stat.value}
              className={styles.card}
              delay={i * 0.08}
            >
              <div className={`${styles.statValue} ${TINT_CLASS[stat.tint]}`}>
                {stat.value}
              </div>
              <p className={styles.statBody}>{stat.body}</p>
              <div className={styles.statSource}>{stat.source}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
