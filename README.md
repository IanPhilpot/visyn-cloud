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
