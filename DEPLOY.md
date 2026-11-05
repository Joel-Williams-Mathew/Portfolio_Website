# Deploy Joel Williams Mathew Portfolio — README

## Option A — GitHub Pages (recommended, free, uses your GitHub)
1. Create/push this folder as a repo: `joel-portfolio` on GitHub (upload via GitHub web UI or git push).
2. Repo → Settings → Pages → Source: **Deploy from branch** → `main` / `/ (root)` → Save.
3. Your live URL: `https://joel-williams-mathew.github.io/joel-portfolio/`

## Option B — Netlify (drag & drop, no git needed)
1. Go to netlify.com → Add new site → Deploy manually.
2. Drag the `J:\portfolio_website` folder onto the dropzone.
3. Netlify gives you a URL like `https://joel-nebula.netlify.app`. Rename in Site settings → Site details.

## Option C — Vercel
1. vercel.com → New Project → Import GitHub repo (or upload folder).
2. Framework: **Other**. Build command: empty. Output: `.`.
3. Your live URL will be `https://joel-portfolio.vercel.app`.

## Pro tips
- Add a custom domain in host settings if you buy one (e.g. joelwilliams.dev).
- Update `og:url` in index.html to your live URL for perfect LinkedIn/WhatsApp previews.
- Keep `netlify.toml` / `vercel.json` — they set clean URLs + security headers.
