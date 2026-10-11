# Dachi Peradze

Personal website for Dachi Peradze — sports law and advisory for football, basketball, tennis, rugby and esports.

The site is a responsive, buildless static website hosted by GitHub Pages at https://dachiperadze.com. It uses HTML, CSS and a small JavaScript file for the mobile navigation. Service and FAQ disclosures use native accessible details elements and remain usable without JavaScript.

## Contact

- Email: legal@dachiperadze.com
- WhatsApp: https://wa.me/995597982202
- Text: SMS to the same number

The phone-number link opens WhatsApp. SMS and email links open the visitor's corresponding applications.

The enquiry form posts to the existing Formspree endpoint, `https://formspree.io/f/maeyzglo`. It collects a name, email address, sport and message; browser validation checks the required fields and email format. Formspree handles delivery and its submission confirmation. A hidden honeypot field helps filter automated submissions. The form works without JavaScript.

There are no prices or payment links. Google Analytics 4 is loaded only after a visitor allows analytics; the footer provides a way to change that choice. The website does not store submitted information locally; enquiry submissions are processed by Formspree according to the existing form configuration.

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

To monitor discovery, verify the site in Google Search Console and Bing Webmaster Tools, then submit `https://dachiperadze.com/sitemap.xml`. Ownership verification requires access to the relevant webmaster account or a verification token supplied by its owner. Google Analytics 4 is configured as described below. No advertising accounts are linked by this website setup.

## Engagement measurement

Google Analytics 4 measurement ID: `G-ZNSEDP4N0R`. Stream: Dachi Peradze — Website. `analytics.js` implements basic consent mode: the Google tag is not requested until analytics is allowed. Advertising consent remains denied, Google signals and ad personalization signals are disabled. Analytics preferences expire after 180 days and can be changed in the footer. Declining after previously allowing analytics clears the GA cookies and reloads the page to stop the loaded tag.

Page views and scrolling are measured by GA4. Custom events: `contact_click` (channel: WhatsApp, email or SMS), `enquiry_link_click`, `sport_page_click`, `service_open`, `enquiry_form_start` and `enquiry_submit_attempt`. An attempt indicates browser submission, not successful delivery or an accepted instruction. Form values are not sent to Analytics. URL query strings and fragments are omitted from configured page URLs and referrers. Automatic form interaction, site search, outbound click, video and download measurement were disabled in the web stream.

Use Realtime to check incoming activity, and Engagement / Events for event totals. Custom event parameters need event-scoped custom dimensions before they can be used as report breakdowns. Only consenting visitors are measured, and browser blockers can also prevent collection.
