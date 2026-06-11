import Aurora from "@/components/motion/aurora";
import Reveal from "@/components/motion/reveal";
import styles from "./business-case.module.css";

/**
 * Business case section (`#business-case`) — SPEC §4 Business case.
 *
 * Server component: all copy is verbatim from the spec and present in the
 * SSR HTML. Two-column layout (text left, 15M SEK stat card right) that
 * collapses to one column at the single 920px breakpoint.
 *
 * The stat card carries the SPEC §5.3 treatments: a drifting gradient
 * numeral, a soft holographic <Aurora variant="card"> background overlay,
 * and a blurred card glow rendered as a pointer-events-none span stacked
 * behind the card surface (the card wrapper isolates its own stacking
 * context so `z-index: -1` cannot fall behind the page background).
 */
export default function BusinessCase() {
  return (
    <section id="business-case" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <Reveal className={styles.eyebrow}>The Business Case</Reveal>

            <Reveal as="h2" className={styles.heading} delay={0.06}>
              This isn&apos;t just the right thing to do.
            </Reveal>

            <Reveal as="p" className={styles.subLead} delay={0.12}>
              It&apos;s the smartest investment a school can make.
            </Reveal>

            <Reveal as="p" className={styles.body} delay={0.18}>
              When students with special needs don&apos;t get timely support,
              they become school refusers. Schools then face spiralling costs:
              specialist programs, home tuition, social services and eventually
              welfare dependency. Nuro is a preventative intervention that pays
              for itself many times over.
            </Reveal>
          </div>

          <Reveal className={styles.cardWrap} delay={0.16}>
            <span aria-hidden className={styles.cardGlow} />
            <article className={styles.card}>
              <Aurora variant="card" />
              <div className={styles.cardContent}>
                <div className={styles.statValue}>15M SEK</div>
                <p className={styles.statBody}>
                  estimated lifetime societal cost of one student dropping out
                  due to lack of support.
                </p>
                <div className={styles.statSource}>Skandia Stiftelse</div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
