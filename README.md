# Vigneshwar Portfolio

A React 19 portfolio with a space-inspired portrait, selected project gallery, experience, skills, education, and contact details. Built with Vite.

## Local Development

Use Node.js 24.x, then run:

```sh
npm ci
npm run dev
```

Vite prints the local preview URL. No environment variables or backend services are required. Google Fonts loads Manrope and DM Sans; local sans-serif fallbacks work offline.

## Verification

```sh
npm test
npm run test:coverage
npm run build
npm audit
```

The focused suite covers shared gallery navigation, clear section headings, safe GitHub and Google Drive links, certification order, initials branding, mobile ranges, keyboard navigation, resizing, reduced-motion scrolling, theme persistence, career content, unranked languages, and cursor interaction and cleanup. Coverage thresholds apply to the changed React components and shared URL validator, not the entire repository. No CI workflow is configured yet; run these checks before deployment.

## Design and Content

- The page scrolls vertically. Projects, Experience, and Education share native horizontal scroll snapping: two cards on desktop and one on smaller screens, without a visible scrollbar. Arrow controls, keyboard navigation, and a wave-style position indicator remain available.
- The full-color portrait is cropped from the top to preserve the hairline, with a gentle animated fade starting around 55% down the image. There is no circular mask, pixel overlay, or duplicate name/location caption. Reduced-motion mode freezes the blend.
- The background shows 500 tiny animated star dots in dark mode and 550 in light mode, with stronger dark dots against the light background. There are no planets, photographs, or connecting lines. Skills uses the same transparent section background as the rest of the page; repeated content cards retain translucent surfaces.
- Projects, Experience, and Education are prominent section headings. Supporting descriptions sit below them. The navigation uses an S I monogram, and engineering interests use recognizable icons rather than plus symbols.
- Project illustrations represent the described architectures; they are not screenshots. Add an HTTPS GitHub repository URL to each project's `repositoryUrl` field in `src/components/Projects.jsx`. The entire card becomes a keyboard-accessible link when a valid URL is present. Blank or invalid URLs display a pending state instead of an invented destination.
- Dark and light themes are available. The selected theme is stored locally. Reduced-motion preferences disable decorative animation and smooth gallery scrolling.
- Fine-pointer users receive a white luminous cursor trail. Touch and reduced-motion devices retain native cursors. The custom cursor hides on blur or pointer exit and never captures clicks.
- Experience includes Software Engineer I at Deloitte, June 2026 to present: Selenium-to-Playwright migration, new automation scripts, and Azure DevOps-to-GitHub Actions migration. Languages are listed without rankings.
- Certifications appear between Education and Languages. The three owner-supplied entries cover Google Cloud machine learning, Amazon Bedrock, and Playwright automation on Udemy. Add a Google Drive sharing URL to each entry's `driveUrl` in `src/components/Certifications.jsx` to activate its full-card certificate link. Use sharing permissions appropriate for the intended visitors. Empty or invalid URLs remain inactive. Dates and exact course details can be added when supplied.

## Images

The portrait is supplied by the portfolio owner. The star background uses CSS animation and requires no image download.

## Deployment

`npm run build` generates `dist/`. Deploy that directory to a static host. `npm run preview` serves the production build locally.

## Design Update

The latest revision unifies the Skills background, promotes section names to main headings, preserves the portrait hairline with an animated lower fade, strengthens light-mode stars, enlarges the current-role highlight, adds S I branding and interest icons, and introduces configurable Google Drive certificate links alongside the existing GitHub repository links.