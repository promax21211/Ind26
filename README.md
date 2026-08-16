# Freedom 79 — Independence Rewards 2026

A campaign site for India's 79th Independence Day (live until 16 August 2026). Frontend
is React + Vite + Tailwind. The backend is real: Cloudflare Pages Functions + D1, with
hashed passwords and signed session cookies — not a mockup.

This build has been tested end-to-end locally (signup, login, duplicate-email handling,
logout, admin routes) using Cloudflare's own local runtime. It's ready to deploy.

## 1. Project structure

```
freedom79/
├── src/                        Frontend (React)
│   ├── pages/                  One file per route (Landing, Signup, Dashboard, Admin, ...)
│   ├── components/
│   │   ├── layout/              Header, Footer, Sidebar, PublicLayout, AuthLayout, DashboardLayout
│   │   ├── landing/              Hero, HowItWorks, RewardsSection
│   │   └── ui/                   Button, Card, Badge, FormField, Countdown, PlatformCard, ...
│   ├── context/AuthContext.jsx  Talks to /api/*, holds the signed-in user in memory
│   ├── data/platforms.js        The 5 third-party platform cards (name, description, url, icon)
│   └── lib/                     Small helpers (icon registry, date formatting)
│
├── functions/api/              Backend (Cloudflare Pages Functions)
│   ├── signup.js  login.js  logout.js  me.js
│   └── admin/stats.js  admin/users.js
├── lib/                         Server-only helpers (password hashing, cookies, JSON responses)
│   ├── crypto.js                 PBKDF2 password hashing + signed session tokens
│   ├── cookies.js                httpOnly session cookie read/write
│   ├── http.js                   JSON response + validation helpers
│   └── admin.js                  Admin key check
│
├── migrations/0001_init.sql     D1 schema (one `users` table)
├── seed.sql                     Optional demo data for local testing
├── wrangler.toml                Cloudflare config (D1 binding, build output dir)
├── .dev.vars.example            Template for local secrets (copy to .dev.vars)
├── public/_redirects            Notes on SPA routing (see §5)
└── dist/                        Pre-built output, included so you can deploy without
                                  running npm at all if you're on a phone (see §4B)
```

## 2. What's real vs. what's a placeholder

| Feature | Status |
|---|---|
| Signup / login / logout | **Real.** PBKDF2-hashed passwords in D1, signed httpOnly session cookies |
| Name, nickname, email, promo code | **Real.** Collected at signup, stored in D1, shown on the dashboard/account page |
| Dashboard, Account, promo code | **Real.** Reads your actual account from the database |
| Live member count on the landing page | **Real**, via `functions/api/stats.js` — a public, deliberately minimal endpoint that only ever returns a total count |
| Rewards | **Gated.** Not shown on the public site — only visible once signed in (see §6.5) |
| Admin stats/users | **Real**, gated behind an admin key you set yourself (§6) |
| Discord verification | **Placeholder**, on purpose. No OAuth is wired up — clicking the button shows an explanatory message rather than faking success. Real Discord OAuth is a separate, deliberate next step. |
| Bitrefill / Bixberry / EarnPepe / Swagbucks / Studypool | Real outbound links to each platform's own site, clearly labeled "Third-party platform." Freedom79 has no partnership with any of them and makes no claims on their behalf. |

## 3. Requirements

- Node.js 18+
- A free Cloudflare account (only needed for deployment, not local frontend work)

## 4A. Run the frontend only (fastest way to look at the UI)

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Signup/login/admin calls will fail (there's no API
running yet) — that's expected, the UI still renders and degrades to a signed-out state.

## 4B. Run the full stack locally (frontend + real backend + real database)

This runs the actual Cloudflare runtime on your machine — the same one used in
production — via Wrangler, which is already in `package.json`.

```bash
npm install
cp .dev.vars.example .dev.vars     # then edit the two values inside
npx wrangler d1 migrations apply DB --local
npx wrangler d1 execute DB --local --file=./seed.sql   # optional demo data
npm run build
npx wrangler pages dev dist
```

Opens at `http://localhost:8788`. Signup, login, the dashboard, and `/admin` (using the
`ADMIN_KEY` you put in `.dev.vars`) all work against a local SQLite file — nothing
touches your real Cloudflare account yet.

## 5. A note on routing

Cloudflare's usual SPA trick — a `_redirects` file with `/* /index.html 200` — currently
has an open bug in Cloudflare's own tooling where that exact pattern gets misdetected as
an infinite loop and can block deployment
([issue](https://github.com/cloudflare/workers-sdk/issues/10992),
[issue](https://github.com/cloudflare/workers-sdk/issues/11824)). To sidestep it, `npm run
build` copies `dist/index.html` to `dist/404.html`, and Cloudflare Pages serves that
automatically for any URL that isn't a real file (e.g. someone refreshing on
`/dashboard/account`). React Router then takes over and renders the right page. The only
side effect is that deep links technically return an HTTP 404 status before the page
renders — invisible to users, but if that status code ever matters for your use case
(e.g. SEO on a specific route), Cloudflare's newer `not_found_handling:
"single-page-application"` config is the cleaner long-term fix; it just requires moving
from the Pages model to the newer Workers-with-static-assets model, which is a bigger
change than made sense to bundle into this pass.

## 6. Deploying to Cloudflare

Cloudflare treats `wrangler.toml` as the **source of truth** once it's part of your
deployed project — the dashboard's binding UI becomes view-only for anything the file
already defines ([official docs](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#source-of-truth)).
In practice this means: the D1 database ID has to be correct *in the file itself*
before you deploy — you can't fix it by clicking "Add binding" in the dashboard
afterward. Secrets (`SESSION_SECRET`, `ADMIN_KEY`) are the one exception — those are
never put in the file, and are still set via the dashboard or CLI as usual.

### Step 1 — Get the code onto GitHub

Pick whichever fits what you have available:

- **A computer, even briefly**: create a repo at github.com → **Add file → Upload
  files** → drag the whole unzipped `freedom79` folder in → commit.
- **Android + Termux**: `pkg install git`, move the unzipped folder into Termux's
  storage, `git init && git add . && git commit -m "init"`, create an empty repo on
  github.com from your phone browser, then `git remote add origin <repo-url>` and
  `git push -u origin main` (use a
  [Personal Access Token](https://github.com/settings/tokens?type=beta) as the password
  when prompted).
- **Have Claude push it for you**: create an empty repo on github.com (just the name +
  Create button, no files), generate a fine-grained Personal Access Token scoped to
  *only that repo* with **Contents: Read and write**, and share the repo URL + token —
  it can be revoked right after the push completes.

### Step 2 — Create the D1 database

Dashboard → **Workers & Pages → D1 SQL Database → Create Database** → name it (e.g.
`freedom79-db`) → **Create**. Copy the **Database ID** shown.

### Step 3 — Put that ID into `wrangler.toml`

On github.com, open `wrangler.toml` in your repo → tap the pencil (edit) icon → replace
`REPLACE_WITH_YOUR_D1_DATABASE_ID` with the real ID from Step 2 → commit directly to
`main`. This works fine from a phone browser — it's a one-line text edit.

### Step 4 — Create the Pages project

Dashboard → **Workers & Pages → Create → Pages → Connect to Git** → select the repo →
**Build command** `npm run build`, **Build output directory** `dist` → **Save and
Deploy**. This one connection deploys the frontend *and* picks up `functions/` for the
backend, and reads the D1 binding from `wrangler.toml` automatically — no separate
"add binding" step needed.

### Step 5 — Set your two secrets

Dashboard → your Pages project → **Settings → Environment variables → Add variable** →
add `SESSION_SECRET` and `ADMIN_KEY`, each a long random string, both marked
**Encrypted**. Do this for the Production environment (and Preview too, if you want
preview deployments to work).

Or via CLI, if you have one: `npx wrangler pages secret put SESSION_SECRET` and
`npx wrangler pages secret put ADMIN_KEY`.

### Step 6 — Create the database tables

No CLI needed — the D1 dashboard has a query console:

Dashboard → **Workers & Pages → D1 → freedom79-db → Console** → paste the contents of
`migrations/0001_init.sql` → run it. Then do the same with
`migrations/0002_add_name_nickname.sql` — migrations are numbered and must run in
order. Optionally also paste `seed.sql` last, if you want demo rows to show up in
`/admin` (it needs both migrations applied first, since it fills in the `name` and
`nickname` columns).

(Or via CLI: `npx wrangler d1 migrations apply freedom79-db --remote` — this applies
any migration you haven't run yet, in order, automatically.)

### Step 7 — Redeploy

Secrets only take effect on the *next* deployment. Dashboard → your Pages project →
**Deployments** → **Retry deployment** on the latest one (or just push any small commit).

### Step 8 — Verify

Visit `<project-name>.pages.dev`. Sign up for a real account, confirm you land on the
dashboard, then check `/admin` with the `ADMIN_KEY` you set in Step 5 — you should see
your new account plus the seed rows if you loaded them.

### Updating an already-deployed site

1. Get the changed files onto GitHub the same way you did the first time (if you used
   the zip + GitHub Action method, just re-upload a fresh `freedom79.zip` and re-run the
   same workflow — it overwrites in place).
2. Pushing to `main` triggers Cloudflare to rebuild and redeploy automatically.
3. If a new migration file was added (like `0002_add_name_nickname.sql`), run it against
   the *remote* database via the D1 Console (Step 6) — new columns don't appear on their
   own just because the code changed.

## 7. Extending this later

- **Real Discord OAuth**: add `functions/api/discord/start.js` and
  `functions/api/discord/callback.js` following Discord's standard OAuth2 flow, then
  update `discord_status` in D1 on a successful callback. `DiscordVerification.jsx` is
  already wired to read `account.discordStatus` — no frontend change needed once the
  backend sets it to `"verified"`.
- **Admin auth**: `/api/admin/*` currently checks a single shared `ADMIN_KEY` header —
  fine for one or two people, not real role-based access. If more admins need access,
  add an `is_admin` column to `users` and check the session instead.
- **Rate limiting / bot protection**: signup and login currently have no rate limiting.
  Cloudflare's dashboard has built-in Rate Limiting rules that can be pointed at
  `/api/signup` and `/api/login` without any code changes.
- **Email verification**: not implemented. Accounts are usable immediately after signup.

## 8. On the listed platforms

Bitrefill, Swagbucks and Studypool are established, well-known platforms. EarnPepe and
Bixberry are both very new, small-scale services (crypto-token collection and
device-bandwidth-sharing, respectively) with limited track records — worth knowing
before pointing people at them, even though the site treats all five identically and
makes no claim of partnership with any of them.
