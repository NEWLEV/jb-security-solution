# J&B Security Solutions — jbsecuritysolution.com
# Professional Security Guard Company | Miramar, FL | Miami-Dade & Broward County

## Project Overview
Full 12-page static website for J&B Security Solutions.
Hosted at: jbsecuritysolution.com
Built with: HTML5, Vanilla CSS, Vanilla JavaScript

---

## File Structure

```
/
├── index.html                    # Homepage
├── healthcare-security.html      # Healthcare Security service page
├── event-security.html           # Event Security service page
├── sporting-event-security.html  # Sporting Event Security service page
├── secure-transport.html         # Secure Executive Transport service page
├── miami-security-services.html  # Miami-Dade location page
├── broward-security-services.html # Broward County location page
├── about.html                    # About / Company page
├── industries.html               # Industries Served page
├── testimonials.html             # Client Testimonials page
├── free-quote.html               # Multi-step Free Quote form
├── contact.html                  # Contact page
├── thank-you.html                # Post-submission confirmation (noindex)
├── sitemap.xml                   # XML Sitemap (all 12 pages)
├── robots.txt                    # Search engine directives
├── css/
│   └── style.css                 # Complete master stylesheet
├── js/
│   └── main.js                   # All interactive JS (navbar, FAQ, counter, form, chat)
├── images/
│   └── logo.png                  # ← CLIENT MUST UPLOAD: Company logo file
└── components/
    └── nav.html                  # Shared nav reference (for copy-paste)
```

---

## CLIENT ACTION REQUIRED — Before Launch

### 1. PHONE NUMBER
Replace all instances of `(954) 000-0000` and `+19540000000` with the real business phone number.
Search: `grep -r "954.*000-0000" .`

### 2. LOGO
Upload the J&B Security Solutions logo image to `/images/logo.png`
Recommended: WebP format, minimum 200x200px, transparent background.

### 3. EMAIL ADDRESS
In `contact.html` — update `info@jbsecuritysolutions.com` to the actual email address.

### 4. TESTIMONIALS
In `testimonials.html` — replace all placeholder review names and text with actual verified client reviews.

### 5. GOOGLE ANALYTICS 4
In `index.html` (and ideally all pages) — uncomment and update the GA4 block:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```
Replace `G-XXXXXXXXXX` with the client's real GA4 Measurement ID.

### 6. GOOGLE ADS CONVERSION
In `thank-you.html` — uncomment and update:
```js
gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/XXXXXXXXXXX' });
```
Replace with the client's Google Ads conversion ID (for Google Ads campaign tracking).

### 7. SITEMAP DATES
Update `<lastmod>` dates in `sitemap.xml` to the real launch date.

### 8. HERO BACKGROUND IMAGE
In `index.html` — the hero uses an Unsplash placeholder image URL. 
For best performance, download and host a local WebP image at `/images/hero-bg.webp`.

### 9. OPEN GRAPH IMAGES
Create og:image files for each page (1200x630px recommended) and upload to `/images/`:
- og-home.jpg, og-healthcare.jpg, og-event.jpg, og-sports.jpg
- og-transport.jpg, og-miami.jpg, og-broward.jpg, og-about.jpg
- og-industries.jpg, og-testimonials.jpg, og-quote.jpg, og-contact.jpg

### 10. SOCIAL MEDIA LINKS
In footer across all pages — replace `href="#"` in social links with actual Facebook, Instagram, LinkedIn URLs.

### 11. PRIVACY & TERMS PAGES
`privacy-policy.html` and `terms-of-service.html` pages are linked but not yet created.
Add standard legal pages (can use a legal template generator).

---

## Design System

| Token | Value | Use |
|---|---|---|
| --navy | #0D1B2A | Primary page background |
| --midnight | #1B2D45 | Section backgrounds, cards |
| --orange | #E8761A | CTAs, accents, highlights |
| --steel | #C0CBD8 | Body text / muted content |
| --light-bg | #F7F9FC | Light sections (industries strip) |
| --font-display | Barlow Condensed | Headlines — uppercase, bold |
| --font-body | DM Sans | Body copy, labels |

---

## SEO Implementation

- ✅ Unique `<title>` tags on all 12 pages
- ✅ Unique meta descriptions (150-160 chars) on all pages
- ✅ Self-referencing `<link rel="canonical">` on all pages
- ✅ Open Graph tags on all pages
- ✅ LocalBusiness JSON-LD on homepage
- ✅ FAQPage JSON-LD on homepage and all service pages
- ✅ sitemap.xml at /sitemap.xml
- ✅ robots.txt at /robots.txt
- ✅ Semantic HTML5 throughout
- ✅ One H1 per page (no duplicates)
- ✅ Alt text on all images
- ✅ Internal links between related pages on all pages
- ✅ Local keywords in all page copy (Miami, Broward, Miramar, South Florida)

---

## Performance Notes

- All images should be WebP format with width/height attributes
- Font preconnect already implemented for Google Fonts
- JS is deferred (`defer` attribute) on all pages
- Images use `loading="lazy"` (except hero which uses eager + fetchpriority)
- No render-blocking CSS (single stylesheet, loaded in `<head>`)

---

## Deployment

For static hosting (Netlify, Vercel, GitHub Pages, Hostinger Static):
1. Upload all files maintaining directory structure
2. Set document root to `/` (site root)
3. Configure 301 HTTPS redirect
4. Point `jbsecuritysolutions.com` DNS to host

For Apache servers, add `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
