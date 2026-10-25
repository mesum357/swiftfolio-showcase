import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src", "assets", "optimized");

await mkdir(outDir, { recursive: true });
await mkdir(path.join(root, "public"), { recursive: true });

async function emit(input, basename, { width, quality = 78, effort = 4 }) {
  const src = path.join(root, input);
  const webp = path.join(outDir, `${basename}.webp`);
  const avif = path.join(outDir, `${basename}.avif`);
  const jpg = path.join(outDir, `${basename}.jpg`);

  const pipeline = () => sharp(src).rotate().resize({ width, withoutEnlargement: true });

  await pipeline().webp({ quality, effort }).toFile(webp);
  await pipeline().avif({ quality: Math.max(quality - 8, 45), effort }).toFile(avif);
  await pipeline().jpeg({ quality: quality + 4, mozjpeg: true }).toFile(jpg);

  const webpKb = ((await pipeline().webp({ quality, effort }).toBuffer()).length / 1024).toFixed(1);
  console.log(`${basename}: ${width}w webp ~${webpKb} KB`);
}

await emit("IMG_58221.png", "hero-390", { width: 390, quality: 72 });
await emit("IMG_58221.png", "hero-780", { width: 780, quality: 74 });
await emit("IMG_58221.png", "hero-1200", { width: 1200, quality: 76 });
await emit("IMG_58221.png", "cta-640", { width: 640, quality: 55 });

await emit("src/assets/img3.jpeg", "about-primary", { width: 960, quality: 72 });
await emit("src/assets/img4.jpeg", "about-secondary", { width: 768, quality: 72 });

const services = ["fullstack", "saas", "mvp", "frontend", "backend", "cloud"];
for (const name of services) {
  await emit(`src/assets/services/${name}.jpg`, `service-${name}`, { width: 1200, quality: 72 });
}

const projects = [
  ["edunia", "src/assets/projects/edunia.png"],
  ["museum", "src/assets/projects/museum.png"],
  ["magpie", "src/assets/projects/magpie.png"],
  ["vitalgeo", "src/assets/projects/vitalgeo.png"],
  ["gbit", "src/assets/projects/gbit.png"],
];
for (const [name, file] of projects) {
  await emit(file, `project-${name}`, { width: 1400, quality: 70 });
}

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="16" fill="#0A0F0E"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#2dd4a0">M</text>
</svg>`;
await writeFile(path.join(root, "public", "favicon.svg"), faviconSvg);

const svgBuffer = Buffer.from(faviconSvg);
await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(root, "public", "favicon-32.png"));
await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(root, "public", "apple-touch-icon.png"));
await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(root, "public", "favicon.ico"));

console.log("favicon set written to public/");
