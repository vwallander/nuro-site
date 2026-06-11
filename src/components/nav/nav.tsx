"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./nav.module.css";
import { InstagramIcon, LinkedInIcon } from "./social-icons";

/**
 * Fixed nav header (SPEC §4 Nav + §5.4 nav behavior).
 *
 * Transparent at the top of the page; once the user scrolls past 24px the
 * header gains a frosted-glass treatment (color-mix bg + backdrop blur) and
 * its padding tightens — both transition over 0.5s var(--ease) via the
 * `data-scrolled` attribute styled in nav.module.css.
 *
 * Anchors are plain <a href="#…"> links — smooth scrolling comes from CSS
 * `scroll-behavior: smooth` (globals.css), so navigation works pre-hydration
 * and without JS. The only client JS here is the rAF-throttled scroll
 * listener and the logo's scroll-to-top handler.
 */

const LEFT_LINKS = [
  { label: "The Problem", href: "#problem" },
  { label: "Business Case", href: "#business-case" },
  { label: "Solution", href: "#features" },
] as const;

const INSTAGRAM_URL = "https://www.instagram.com/nuroai.dev/";
const LINKEDIN_URL = "https://www.linkedin.com/company/nuroaidev/";

const SCROLL_THRESHOLD_PX = 24;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <header
      className={styles.nav}
      data-scrolled={scrolled ? "true" : undefined}
    >
      <nav className={styles.inner} aria-label="Main">
        <ul className={styles.links}>
          {LEFT_LINKS.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.logo}
          onClick={scrollToTop}
          aria-label="Nuro — scroll to top"
        >
          <Image
            src="/logo-symbol.png"
            alt=""
            width={34}
            height={34}
            priority
          />
        </button>

        <div className={styles.actions}>
          <a
            className={styles.social}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nuro on Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            className={styles.social}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nuro on LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a className={`${styles.cta} focusable`} href="#waitlist">
            Join waitlist
          </a>
        </div>
      </nav>
    </header>
  );
}
