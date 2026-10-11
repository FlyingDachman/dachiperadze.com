# Dachi Peradze

Personal website for Dachi Peradze — sports law and advisory for football, basketball, tennis, rugby and esports.

The site is a responsive, buildless static website hosted by GitHub Pages at https://dachiperadze.com. It uses HTML, CSS and a small JavaScript file for the mobile navigation. Service and FAQ disclosures use native accessible details elements and remain usable without JavaScript.

## Contact

- Email: legal@dachiperadze.com
- WhatsApp: https://wa.me/995597982202
- Text: SMS to the same number

The phone-number link opens WhatsApp. SMS and email links open the visitor's corresponding applications.

The enquiry form posts to the existing Formspree endpoint, `https://formspree.io/f/maeyzglo`. It collects a name, email address, sport and message; browser validation checks the required fields and email format. Formspree handles delivery and its submission confirmation. A hidden honeypot field helps filter automated submissions. The form works without JavaScript.

There are no prices, payment links or analytics trackers. The website does not store submitted information locally; enquiry submissions are processed by Formspree according to the existing form configuration.

## Files

- `index.html` — content, search/social metadata and structured data
- `legal-services.css` — responsive styles, focus states, print and reduced-motion support
- `legal-services.js` — mobile navigation and current copyright year
- `assets/stadium.webp` — optimised stadium hero image
- `assets/stadium.jpg` — image fallback and social sharing image
- `assets/favicon.svg` — DP monogram
- `CNAME` — existing custom domain

## Preview

Serve the repository root with any static web server. No installation or build step is required.

## Search visibility

Five linked sport pages describe the matters covered and the information useful for an initial enquiry. Each page has a distinct title, description, canonical URL, social preview tags and structured data. `sitemap.xml` lists the six public pages; `robots.txt` advertises the sitemap.

To monitor discovery, verify the site in Google Search Console and Bing Webmaster Tools, then submit `https://dachiperadze.com/sitemap.xml`. Ownership verification requires access to the relevant webmaster account or a verification token supplied by its owner. No analytics, tracking pixels or advertising accounts are configured.
