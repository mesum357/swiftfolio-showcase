import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    IN?: { parse?: () => void };
  }
}

const LINKEDIN_BADGE_SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";

export default function LinkedIn() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${LINKEDIN_BADGE_SCRIPT_SRC}"]`,
    );

    const parseBadges = () => window.IN?.parse?.();

    if (existing) {
      // Script is already present; ensure badges are parsed on route changes.
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">LinkedIn</h1>
          <p className="mt-2 text-muted-foreground">
            Connect with me on LinkedIn.
          </p>

          <div className="mt-10 flex justify-center">
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
      </main>
      <Footer />
    </div>
  );
}

