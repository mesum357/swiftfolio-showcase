import { useEffect } from "react";

type SeoHeadProps = {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  ogType?: string;
  jsonLd?: unknown;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(data: unknown) {
  const id = "ld-webpage";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SeoHead({
  title,
  description,
  canonical,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  ogType,
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "title", title);
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    if (ogType) upsertMeta("property", "og:type", ogType);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertLink("canonical", canonical);
    const alternate = document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]');
    alternate.forEach((link) => {
      if (link.hreflang === "en" || link.hreflang === "x-default") {
        link.setAttribute("href", canonical);
      }
    });
    if (jsonLd) upsertJsonLd(jsonLd);
  }, [title, description, canonical, robots, ogType, jsonLd]);

  return null;
}
