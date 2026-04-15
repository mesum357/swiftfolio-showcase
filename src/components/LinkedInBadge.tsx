import { useEffect } from "react";
import { ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    IN?: { parse?: () => void };
  }
}

const LINKEDIN_BADGE_SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";

export default function LinkedInBadge() {
  useEffect(() => {
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
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-card/30 shadow-lg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs text-muted-foreground">
              <Linkedin className="h-4 w-4 text-primary" />
              Let’s connect
            </div>
            <h3 className="mt-3 text-xl font-bold text-foreground">Find me on LinkedIn</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Profile badge + quick link to connect.
            </p>
          </div>
          <Button asChild variant="secondary" className="shrink-0">
            <a
              href="https://pk.linkedin.com/in/mesumabbas357"
              target="_blank"
              rel="noreferrer"
            >
              Visit profile <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Role</div>
              <div className="mt-1 font-semibold text-foreground">Full Stack Developer</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Focus</div>
              <div className="mt-1 font-semibold text-foreground">React • Node • Cloud</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="mt-1 font-semibold text-foreground">Gilgit Baltistan</div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="medium"
              data-theme="dark"
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

