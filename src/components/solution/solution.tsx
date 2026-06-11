import Reveal from "@/components/motion/reveal";
import styles from "./solution.module.css";

/**
 * Solution section (`#features`) — SPEC §4 Solution.
 *
 * Server component: all copy is verbatim from the spec and present in the
 * SSR HTML. Two-column before/after comparison — "Before Nuro" (X icons)
 * vs "With Nuro" (gradient check icons, soft holo tint overlay + glow).
 * Collapses to one column at the single 920px breakpoint.
 */

const BEFORE_ITEMS: readonly string[] = [
  "Individual strengths go unseen, individual needs go unmet.",
  "Lessons follow one rigid format that doesn't fit everyone.",
  "Teachers firefight instead of adapting support.",
  "Parents are left guessing how their child is really doing.",
  "Help arrives late, generic, or not at all.",
];

const AFTER_ITEMS: readonly string[] = [
  "Every student gets a profile built around their strengths and needs.",
  "Lessons are auto-adapted into clear, structured steps each child can follow.",
  "Teachers deliver targeted help without extra planning hours.",
  "Parents see exactly how their child is progressing, in real time.",
];

function XIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="solution-check-grad"
          x1="2"
          y1="3"
          x2="14"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6f9bff" />
          <stop offset="0.5" stopColor="#9d86ff" />
          <stop offset="1" stopColor="#ff7eb8" />
        </linearGradient>
      </defs>
      <path
        d="M3 8.5l3.4 3.4L13 4.5"
        stroke="url(#solution-check-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CardProps = {
  title: string;
  items: readonly string[];
  icon: () => React.ReactNode;
  elevated?: boolean;
  delay: number;
};

function ComparisonCard({
  title,
  items,
  icon: Icon,
  elevated,
  delay,
}: CardProps) {
  return (
    <Reveal
      as="article"
      className={
        elevated ? `${styles.card} ${styles.cardElevated}` : styles.card
      }
      delay={delay}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item}
            className={
              elevated ? `${styles.item} ${styles.itemCheck}` : styles.item
            }
          >
            <Icon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function Solution() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <Reveal as="span" className={styles.eyebrow}>
          The Solution
        </Reveal>

        <Reveal as="h2" className={styles.heading} delay={0.06}>
          One platform.
        </Reveal>

        <Reveal as="p" className={styles.subLead} delay={0.12}>
          For every person who cares about the child.
        </Reveal>

        <div className={styles.grid}>
          <ComparisonCard
            title="Before Nuro"
            items={BEFORE_ITEMS}
            icon={XIcon}
            delay={0.08}
          />
          <ComparisonCard
            title="With Nuro"
            items={AFTER_ITEMS}
            icon={CheckIcon}
            elevated
            delay={0.16}
          />
        </div>
      </div>
    </section>
  );
}
