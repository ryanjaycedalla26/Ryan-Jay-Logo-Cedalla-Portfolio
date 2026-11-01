# Ryan Jay Logo Cedalla — Portfolio Website

## What's included
- Responsive portfolio homepage (desktop, tablet, and mobile layouts)
- Home, About, Skills, Experience, Education, Projects, and Contact sections
- Mobile hamburger navigation
- Light/dark mode saved in browser local storage
- Live project search and category filtering
- Four individual project detail pages under `/projects/`
- Basic SEO metadata and accessible labels/focus states

## Open locally
1. Extract this folder.
2. Open `index.html` in a browser, or use VS Code with the Live Server extension.
3. Test the navigation, theme toggle, project search, category filters, and detail pages.

## IMPORTANT: Personal details to complete before publishing
Search for the following placeholders:
- `College / University name to be confirmed` in `index.html`
- `Replace with your email address` in `index.html`
- `Add your LinkedIn / GitHub URLs` in `index.html`
- `PORTFOLIO_EMAIL = ""` in `assets/js/script.js`

Set `PORTFOLIO_EMAIL` to your actual public contact email if you want the contact form to open a pre-filled email in the visitor's email application. This is a mailto-based form; it does not send messages directly or store them on a server. For true website form delivery, connect a backend or trusted form service and add spam protection.

## CV
The approved CV is stored at `assets/documents/Ryan_Jay_Logo_Cedalla_CV.pdf`. The View CV button opens this PDF, and the Download CV button downloads the same file. Replace this file at the same path whenever the CV is updated.

## Project content
The Projects section now contains five supplied project works:
1. Spheres of Sweetness — hand-drawn fruit illustration
2. Personal Brand Identity — logo variations and process screenshots
3. Brew Haven — digital marketing graphic and process images
4. Anchor — typography poster and process images
5. Portfolio Website Wireframes — hand-drawn layout planning

Each project has its own detail page and image gallery. The images were taken from the supplied `projects.zip`. Review project descriptions, role wording, and any course-specific details before publishing.

## Hosting / SEO
Before public deployment:
1. Choose the final hosting provider and public domain.
2. Add the canonical URL and Open Graph URL/image metadata to `index.html`.
3. Create `sitemap.xml` using the final public domain and include the homepage and project detail URLs.
4. Set the sitemap URL in `robots.txt`.
5. Upload the site to the hosting root so `/assets/` and `/projects/` paths resolve.
6. Enable HTTPS and test all pages and links.
7. Test on a real phone, tablet, laptop, and desktop.

This starter is a static front-end site. A static host can serve it, but the contact form needs a backend/form service to actually receive submissions.

LOCAL PREVIEW (WITHOUT A SERVER)
1. Extract the complete ryan-portfolio folder. Do not move index.html away from its assets and projects folders.
2. Open the main index.html file in your browser.
3. Open a project from the Projects section. The project detail pages now use relative paths so their CSS and JavaScript can load when opened with file://.
4. Use each page's “Back to portfolio” link to return to the main page.

Note: Some browser features and deployment-only clean URLs may behave differently when using file://. For the final public website, deploy the folder to a web host and test the public URL.


CONTACT FORM (FORMSPREE)
------------------------
The contact form submits to the Formspree endpoint supplied by the site owner: https://formspree.io/f/moeekpyl
It uses an AJAX POST request with an Accept: application/json header, so visitors remain on the page and see inline success or error feedback. The form includes browser-side required-field validation, a hidden _gotcha honeypot field, and a disabled submit button while sending. Formspree handles final acceptance, spam filtering, and email notifications.

TESTING NOTE
------------
The code integration is complete, but actual message delivery must be verified by submitting a test from the website and checking the Formspree dashboard and configured recipient inbox. Complete any recipient verification or activation requested by Formspree. A browser success message alone does not prove that an email reached the inbox.
