// screenshot.mjs — capture screenshots from a URL into ./temporary screenshots/
// Usage:
//   node screenshot.mjs http://localhost:3000/page.html [label] [--full] [--width=1440] [--mobile]
//
// Defaults: 1440x900 desktop, viewport-only. Pass --full for a full-page capture.
// Output: ./temporary screenshots/screenshot-N[-label].png (auto-incremented, never overwritten).

import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, 'temporary screenshots');

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const [k, v] = arg.slice(2).split('=');
      flags[k] = v ?? true;
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

async function nextIndex(dir) {
  if (!existsSync(dir)) return 1;
  const files = await readdir(dir);
  let max = 0;
  for (const f of files) {
    const m = f.match(/^screenshot-(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max + 1;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [url, label] = args.positional;

  if (!url) {
    console.error('Usage: node screenshot.mjs <url> [label] [--full] [--width=1440] [--height=900] [--mobile] [--wait=500]');
    process.exit(1);
  }

  const width  = parseInt(args.flags.width, 10) || (args.flags.mobile ? 390 : 1440);
  const height = parseInt(args.flags.height, 10) || (args.flags.mobile ? 844 : 900);
  const fullPage = !!args.flags.full;
  const waitExtra = parseInt(args.flags.wait, 10) || 600;

  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
  const idx = await nextIndex(OUT_DIR);
  const suffix = label ? `-${label}` : '';
  const filename = `screenshot-${idx}${suffix}.png`;
  const outPath  = join(OUT_DIR, filename);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    const dpr = parseInt(args.flags.dpr, 10) || 2;
    await page.setViewport({ width, height, deviceScaleFactor: dpr });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Force any intersection-observer reveal animations to their final state
    // and disable transitions/animations so the screenshot is deterministic.
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        .reveal { opacity: 1 !important; transform: none !important; }
      `;
      document.head.appendChild(style);
    });

    // Scroll through the page to also fire any other lazy observers, then back to top
    if (fullPage) {
      await page.evaluate(async () => {
        const dist = 800;
        const max = document.documentElement.scrollHeight;
        for (let y = 0; y < max; y += dist) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
      });
    }

    // Optional: scroll to a specific Y before viewport capture (--scrollY=2000)
    if (args.flags.scrollY != null && !fullPage) {
      const targetY = parseInt(args.flags.scrollY, 10) || 0;
      await page.evaluate((y) => {
        // Disable smooth scroll, then jump
        const html = document.documentElement;
        const prev = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        window.scrollTo({ top: y, left: 0, behavior: 'instant' });
        html.style.scrollBehavior = prev;
      }, targetY);
      await new Promise(r => setTimeout(r, 400));
    }

    // Let fonts settle and layout reflow
    await new Promise(r => setTimeout(r, waitExtra));
    await page.screenshot({ path: outPath, fullPage });
    console.log(`Saved: temporary screenshots/${filename}  (${width}x${height}${fullPage ? ', full page' : ''})`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Screenshot failed:', err.message);
  process.exit(1);
});
