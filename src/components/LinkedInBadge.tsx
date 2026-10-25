import { useEffect, useRef } from "react";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { useTheme } from "@/hooks/useTheme";

declare global {
  interface Window {
    IN?: { parse?: () => void };
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  }
}

const LINKEDIN_BADGE_SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";

function loadBadgeScript() {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${LINKEDIN_BADGE_SCRIPT_SRC}"]`,
  );

  const parseBadges = () => window.IN?.parse?.();

  if (existing) {
    parseBadges();
    return;
  }

  const script = document.createElement("script");
  script.src = LINKEDIN_BADGE_SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  script.type = "text/javascript";
  script.onload = parseBadges;
  document.body.appendChild(script);
}

export default function LinkedInBadge() {
  const { theme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let loaded = false;

    const run = () => {
      if (loaded) return;
      loaded = true;
      loadBadgeScript();
    };

    const schedule = () => {
      if (window.requestIdleCallback) {
        idleId = window.requestIdleCallback(run, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(run, 1200);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          schedule();
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (idleId !== undefined && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="border border-[color:var(--color-border)]">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow">Let's connect</p>
            <h3 className="mt-3 font-display text-xl font-bold">
              Find me on LinkedIn
            </h3>
            <p className="mt-1 text-sm text-[color:var(--color-fg-light)]">
              Profile badge and a direct link for hiring teams.
            </p>
          </div>
          <a
            href="https://pk.linkedin.com/in/mesumabbas357"
            target="_blank"
            rel="noreferrer"
            className="button-secondary button shrink-0"
          >
            Visit profile <ArrowSquareOut weight="regular" className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-0 sm:grid-cols-3">
            <div className="border-t border-[color:var(--color-border)] py-4 sm:border-r sm:pr-4">
              <div className="meta-label">Role</div>
              <div className="mt-1 font-display font-semibold">Full Stack Developer</div>
            </div>
            <div className="border-t border-[color:var(--color-border)] py-4 sm:border-r sm:px-4">
              <div className="meta-label">Focus</div>
              <div className="mt-1 font-display font-semibold">React · Node · Cloud</div>
            </div>
            <div className="border-t border-[color:var(--color-border)] py-4 sm:pl-4">
              <div className="meta-label">Location</div>
              <div className="mt-1 font-display font-semibold">Gilgit Baltistan</div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="medium"
              data-theme={theme === "dark" ? "dark" : "light"}
              data-type="VERTICAL"
              data-vanity="mesumabbas357"
              data-version="v1"
            >
              <a
                className="badge-base__link LI-simple-link"
                href="https://pk.linkedin.com/in/mesumabbas357?trk=profile-badge"
                target="_blank"
                rel="noreferrer"
              >
                Mesum Abbas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
