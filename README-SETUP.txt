# Ryan Jay Logo Cedalla — Portfolio Website

Live website: https://ryan-jay-portfolio.vercel.app/

## Website contents
- Responsive portfolio homepage with Home, About, Skills, Experience, Education, Projects, and Contact sections
- Mobile navigation and light/dark theme toggle
- Project search and category filters
- Five individual project detail pages under `projects/`
- CV PDF in `assets/documents/`
- Contact form connected to Formspree
- SEO metadata, canonical URLs, Open Graph/Twitter sharing metadata, `robots.txt`, and `sitemap.xml`

## Run locally
1. Download or clone the complete repository.
2. Keep `index.html`, `assets/`, `projects/`, `robots.txt`, and `sitemap.xml` together in the website root.
3. Open `index.html` in a browser, or open the folder in VS Code and use the Live Server extension.
4. Test the navigation, theme toggle, project search and filters, all five project detail pages, CV links, and contact form.

## Project pages
The portfolio includes these five project detail pages:
1. Spheres of Sweetness — fruit illustration
2. Personal Brand Identity — logo variations and design process
3. Brew Haven — coffee shop brand and digital marketing graphics
4. Anchor — typography poster for a volleyball apparel brand concept
5. Portfolio Website Wireframes — website layout planning

Each project page is located in its own folder inside `projects/`.

## CV
The CV is stored at `assets/documents/Ryan_Jay_Logo_Cedalla_CV.pdf`. Replace the file at the same path when publishing an updated CV so the existing CV links continue to work.

## Contact form (Formspree)
The contact form submits to the Formspree endpoint configured in `index.html` / the form markup: `https://formspree.io/f/moeekpyl`. It uses an AJAX POST request and displays inline success or error feedback. The form includes required-field validation and a hidden `_gotcha` honeypot field.

**Important:** The form code is connected, but successful email delivery still needs to be tested. Submit a test message from the live website, then check the Formspree dashboard and the configured recipient inbox. Complete any recipient verification or activation steps requested by Formspree. A success message in the browser alone does not confirm inbox delivery.

## SEO and hosting
- The canonical website URL is `https://ryan-jay-portfolio.vercel.app/`.
- `sitemap.xml` lists the homepage and all five project detail pages.
- `robots.txt` allows public crawling and points search engines to the sitemap.
- The site is configured for static hosting. Keep the repository's website files in the deployment root so the `assets/` and `projects/` paths resolve correctly.
- Vercel is connected to this GitHub repository. Commits pushed to the production branch (`main`) should trigger a new deployment automatically.

## Before considering the site fully finished
- Open the live site on a phone and a desktop browser.
- Test every navigation link, project page, image, and CV link.
- Submit a real test through the contact form and verify receipt through Formspree.
- After deployment, submit the sitemap URL to Google Search Console if you want Google to discover the pages more easily. Search indexing is not immediate or guaranteed.

## Website analytics (Vercel Web Analytics)

Analytics tracking has been added to the homepage and all five project detail pages.

### What it tracks
- Page views and popular pages/projects (each project detail page has its own URL).
- Visitor totals and daily unique visitors.
- Device category (mobile, tablet, desktop), browser, operating system, and referrer information.
- CV link clicks as two custom events: `CV Download` (download button) and `CV Open` (open-in-new-tab links).

### Privacy approach
- No analytics fields contain a visitor's name, email address, phone number, or form contents.
- The CV event records only the action name; it does not send a visitor identifier or personal details.
- Vercel Web Analytics is designed to use anonymized, aggregated data and does not use cookies. Vercel uses a short-lived, daily visitor hash rather than cross-site tracking.
- The existing contact form remains separate; do not send its form values to analytics.

### Enable it in Vercel
1. Open https://vercel.com/dashboard and select this portfolio project.
2. Open **Analytics** in the project sidebar.
3. Click **Enable** for Web Analytics.
4. Deploy the updated website (push the updated files to the connected GitHub production branch, or redeploy from Vercel).
5. Visit the live homepage and at least one project page. Then check **Analytics** in the Vercel dashboard.

Page-view and device reports are available in Web Analytics. Vercel's current documentation lists custom events as available on Pro and Enterprise plans; therefore, the CV `CV Download` / `CV Open` event reporting may require one of those plans. If the project is on Hobby, page views and device reports can still work, but do not assume the CV custom-event panel will be available.

The analytics script is served by Vercel at `/_vercel/insights/script.js`; it will not collect production data when the site is simply opened from a local `file://` path. Analytics also needs to be enabled in the Vercel project dashboard before data appears.

