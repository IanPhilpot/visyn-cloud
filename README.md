# Visyn Studio Software

The public website for [visyn.cloud](https://visyn.cloud), built as a lightweight static site for GitHub Pages.

## Local preview

Run `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Publishing

GitHub Pages serves the `main` branch from the repository root. The custom domain is configured by `CNAME`.

## Legal note

The privacy policy and terms are a practical first draft and should be reviewed when each product's exact data access, billing, subprocessors, and legal entity details are finalized.

## Help ticket form

`help.html` posts tickets to [FormSubmit](https://formsubmit.co), which emails them to `cloud@visyn.studio`. The endpoint lives in one constant, `TICKET_ENDPOINT`, in `assets/js/site.js`.

**One-time setup (per address):** FormSubmit activates each destination address separately. The first ticket submitted triggers an "Activate form" email to `cloud@visyn.studio`. Tickets are only delivered after that link is clicked. Until then — or if FormSubmit is ever unreachable — the page offers the visitor a pre-filled email instead, so nothing is lost silently.

To move to a different form service later, change `TICKET_ENDPOINT` and the success check in the same block.

## Logo

`assets/img/logo/` holds the prism-V lockup, shown via two `<img>` tags per placement and swapped by `[data-theme]`:

- `visyn-cloud-logo.svg` — supplied, byte-for-byte. Light theme.
- `visyn-cloud-logo-dark-bg.svg` — **derived** from the file above by changing only the wordmark fill to `#FCFCFC`. Dark theme. The two "visyn-cloud" dark and mono files originally supplied spell "Visyn Studio", so they aren't used. Replace this one if an official dark version is produced.

## Favicon

The prism V, supplied as a square transparent PNG, built into:

- `favicon.ico` at the site root: 16, 32 and 48px, for browser tabs.
- `assets/img/favicon/favicon-192.png`: Android and high-density tabs.
- `assets/img/favicon/apple-touch-icon.png`: 180px, the V on white with
  padding, because iOS paints transparency black and rounds the corners.

Every page links all three in `<head>`, after the Google tag. visyn.studio
and visyn.cloud use the same files; replace both sets together.
