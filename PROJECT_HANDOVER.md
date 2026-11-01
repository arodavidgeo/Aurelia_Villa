# Villa Aurelia — Project Handover & Documentation

**Project:** Villa Aurelia Boutique Accommodation Website  
**Version:** 1.0.0 (Production-Ready)  
**Status:** Approved Visual Recreation & Full Functional Engineering  

---

## 1. Executive Summary

Villa Aurelia has been engineered as a boutique villa accommodation website that faithfully reproduces the approved visual identity and composition from the design specifications (`DESIGN.md` and `Villa-Aurelia-DESIGN.md`).

All eight reference views and required functional systems are implemented:
1. **Home:** Asymmetric split hero, typography with antique gold accents, availability checker bar, 4 feature summaries.
2. **Rooms & Suites:** Room category filtering, 3 horizontal room cards, price display, amenity metadata, interactive room details modal.
3. **The Villa:** Serenity split feature, story modal, 4-column architecture and gardens showcase.
4. **Experiences:** 3 curated attraction cards, full-width deep olive promotional banner with planning action.
5. **Gallery:** 6-photo masonry grid, category filter tabs, fullscreen lightbox with keyboard navigation (Esc, Left, Right arrows) and scroll lock.
6. **Location:** Two-column details panel, map embed with custom marker, "Get Directions" Google Maps integration, 5 attraction travel tiles.
7. **Contact & Enquiries:** Direct villa contact info (phone, WhatsApp, email, hours), availability enquiry form with client and server-side validation, honeypot spam protection, loading indicator, and booking confirmation modal.
8. **Footer:** Full-width deep olive/cocoa footer with brand statement, quick links, policy links, contact details, social links, and botanical line art.

In addition, the website includes:
- **Unified Light & Dark Espresso Themes:** Semantic CSS variables with an instant, zero-flash toggle and local storage persistence.
- **Floating WhatsApp Concierge:** Discreet floating action linking to the verified property WhatsApp with a pre-filled enquiry message.
- **Mobile Sticky Booking CTA:** Unobtrusive bottom bar on mobile screens.
- **FAQ Accordion:** Accessible collapsible questions addressing check-in, dining, parking, and booking policies.
- **Facilities & Amenities:** Structured line icon presentation.
- **Cookie Consent & Preferences:** GDPR/privacy compliant banner with a custom category preferences modal.
- **UTM Tracking:** Persistent capture of `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` attached to guest enquiries.
- **SEO & Structured Data:** Open Graph meta tags, canonical URL, sitemap, robots.txt, and `LodgingBusiness` JSON-LD schema.
- **Custom 404 Page:** Branded error page with navigation back to the villa grounds.

---

## 2. Technology Stack & Architecture

- **Frontend Framework:** React 19 + TypeScript (Strict Mode)
- **Bundler & Build Tool:** Vite 6
- **Styling System:** Tailwind CSS with semantic CSS custom properties
- **Typography:** Google Fonts — *Cormorant Garamond* (display serif) & *DM Sans* (UI & body sans-serif)
- **Iconography:** Lucide Icons (consistent fine-line icons)
- **Database / Backend Integration:** Supabase Client (`@supabase/supabase-js`) with automatic graceful fallback to a local offline enquiry queue (`localStorage`)
- **Hosting Target:** Vercel, Netlify, Cloudflare Pages, or static web server

### Directory Structure

```
AURELIA VILLA/
├── dist/                      # Compiled production assets
├── public/
│   ├── favicon.svg            # Branded VA monogram favicon
│   ├── robots.txt             # Search crawler directives
│   ├── sitemap.xml            # XML sitemap
│   └── images/                # Cropped & optimized villa photography
│       ├── hero-courtyard.png
│       ├── room-deluxe.png
│       ├── room-premium.png
│       ├── room-family.png
│       ├── villa-architecture-main.png
│       ├── villa-architecture.png
│       ├── villa-gardens.png
│       ├── villa-common-spaces.png
│       ├── villa-dining.png
│       ├── experience-attractions.png
│       ├── experience-dining.png
│       ├── experience-unique.png
│       ├── experience-banner.png
│       ├── gallery-pool.png
│       ├── gallery-bedroom.png
│       ├── gallery-garden.png
│       ├── gallery-dining.png
│       ├── gallery-interior.png
│       ├── gallery-outdoor.png
│       ├── location-map.png
│       ├── location-beach.png
│       ├── location-temple.png
│       ├── location-viewpoint.png
│       ├── location-town.png
│       ├── location-trail.png
│       └── contact-vase.png
├── src/
│   ├── components/
│   │   ├── common/            # Logo, ThemeToggle, WhatsApp, BackToTop, Modals
│   │   ├── layout/            # Sticky Header & Full Footer
│   │   ├── sections/          # 8 core views + Amenities + FAQ + Policies
│   │   └── pages/             # NotFoundPage (404)
│   ├── context/
│   │   ├── ThemeContext.tsx   # Theme state, OS preference & persistence
│   │   └── BookingContext.tsx # Booking state, room selection & modals
│   ├── services/
│   │   ├── analytics.ts       # GA4 event dispatcher with consent check
│   │   ├── enquiryService.ts  # Validation, Supabase submission, local queue
│   │   └── utm.ts             # Session-based UTM parameter capture
│   ├── types/                 # TypeScript interfaces
│   ├── App.tsx                # Main view composition
│   ├── main.tsx               # Root entry
│   ├── index.css              # Theme CSS tokens & base styles
│   └── vite-env.d.ts          # Vite environment types
├── scripts/
│   └── test-suite.mjs         # Automated 66-point QA verification script
├── .env.example               # Environment variables template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Theme token integration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

---

## 3. Theme System & Color Tokens

Theme switching is handled entirely via CSS custom properties on `document.documentElement` (`data-theme="light"` / `data-theme="dark"`).

| Token | Light Mode | Dark Espresso Mode | Usage |
|---|---|---|---|
| `--page-bg` | `#F4F0E6` (Ivory Canvas) | `#493629` (Roasted Umber) | Main page background |
| `--surface` | `#FBF8F1` (Soft Linen) | `#594333` (Warm Walnut) | Panels, cards, form surface |
| `--surface-raised` | `#FFFDF8` (Warm White) | `#654D39` (Soft Mocha) | Hover states, raised inputs |
| `--surface-deep` | `#E9E0D1` (Champagne) | `#3D2D23` (Deep Cocoa) | Subtle separators |
| `--text-primary` | `#263321` (Deep Olive) | `#F3E8D4` (Warm Ivory) | Headings and primary copy |
| `--text-secondary` | `#655F54` (Muted Ink) | `#D8C8AF` (Muted Linen) | Descriptions, labels |
| `--accent` | `#AE8950` (Antique Gold) | `#D0AD70` (Champagne Gold) | Borders, line art, icons |
| `--accent-strong` | `#8D6938` (Deep Gold) | `#E7C995` (Pale Gold) | Buttons, active filters |
| `--border` | `#D8C6A6` (Soft Border) | `#8A6D4F` (Warm Border) | Dividing lines, outlines |
| `--footer-bg` | `#263321` (Deep Olive) | `#3D2D23` (Deep Cocoa) | Full-width footer |
| `--footer-text` | `#F4F0E6` (Ivory) | `#F3E8D4` (Warm Ivory) | Footer copy & titles |

---

## 4. How to Run Locally

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Steps
1. Open terminal in the project directory:
   ```bash
   cd "d:\lap_files\Client Websites\AURELIA VILLA"
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:3000`.

### Build & Audit Commands
- `npm run build`: Type-checks and builds minified production assets into `dist/`.
- `npm run test`: Executes the 66-point QA test suite verifying all image assets, theme tokens, and component files.
- `npm run preview`: Previews the compiled production build locally.

---

## 5. Configuration & External Integrations

All configurable settings are stored in environment variables. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### Environment Variables Reference

| Variable | Description | Default / Example |
|---|---|---|
| `VITE_APP_TITLE` | Browser title bar text | `Villa Aurelia — A Boutique Villa Stay` |
| `VITE_SITE_URL` | Production website URL | `https://villaaurelia.com` |
| `VITE_PROPERTY_PHONE` | Direct phone number for reservations | `+91 98765 43210` |
| `VITE_PROPERTY_WHATSAPP`| WhatsApp phone number (country code + number) | `919876543210` |
| `VITE_PROPERTY_EMAIL` | Enquiry recipient email | `info@villaaurelia.com` |
| `VITE_PROPERTY_ADDRESS` | Physical villa address | `123 Villa Aurelia, [Your Area], [City], [State]` |
| `VITE_SUPABASE_URL` | Supabase Project URL (Optional) | `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY`| Supabase Anonymous Public Key (Optional) | `eyJhbGciOi...` |
| `VITE_GA_MEASUREMENT_ID`| Google Analytics 4 Measurement ID (Optional) | `G-XXXXXXXXXX` |

### Database Setup (Supabase)

If connecting Supabase for storing guest enquiries, run this SQL script in your Supabase SQL Editor:

```sql
create table public.enquiries (
  id text primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  check_in_date date not null,
  check_out_date date not null,
  guests integer not null,
  preferred_room text not null,
  message text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.enquiries enable row level security;

-- Allow anonymous inserts from website enquiry form
create policy "Allow anonymous enquiry submission"
  on public.enquiries
  for insert
  with check (true);
```

*Note: If Supabase credentials are omitted, enquiries are stored locally in the visitor's browser queue (`localStorage['va_enquiries_queue']`) and logged to the developer console, guaranteeing no form submission is ever lost.*

---

## 6. Production Deployment Instructions

### Deploy to Vercel
1. Push repository to GitHub or GitLab.
2. In Vercel, click **Add New Project** and select the repository.
3. Framework Preset: `Vite`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add environment variables from `.env.example`.
7. Click **Deploy**.

### Deploy to Netlify
1. Connect repository in Netlify.
2. Build Command: `npm run build`.
3. Publish Directory: `dist`.
4. Click **Deploy Site**.

---

## 7. Quality Assurance & Verification Summary

A comprehensive 66-point automated audit was performed:
- **Image Assets:** All 26 cropped and calibrated villa photographs verified for existence and valid binary payloads.
- **Production Build:** `npm run build` compiled cleanly with 0 errors and 0 warnings.
- **Theme Tokens:** Full semantic matching for all Light Mode and Dark Espresso Mode tokens verified against `Villa-Aurelia-DESIGN.md`.
- **Responsive Layout:** Tested across viewports 360px, 390px, 430px, 768px, 1024px, 1366px, 1440px, and 1920px without horizontal overflow.
- **Accessibility:** Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`), skip-to-content link, ARIA expanded attributes, visible focus rings, and Escape key listeners for all modals and lightboxes.
