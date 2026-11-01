# Villa Aurelia — DESIGN.md
## Unified Light + Dark Theme Design System for Google Stitch

**Project:** Villa Aurelia boutique villa accommodation website  
**Purpose:** One authoritative design specification for both the supplied Light Mode and Dark Beige Mode references, including a working theme toggle.  
**Reference images:** Use both user-provided 1024 × 1536 reference boards as visual sources. The light reference defines the original composition. The dark reference defines the dark-theme colour treatment and component appearance.

---

# 0. Non-negotiable design instruction

This is a faithful recreation of the two supplied Villa Aurelia reference designs, not an invitation to redesign them.

- Reproduce the same eight website views, in the same order, with the same hierarchy, proportions, page composition, image placements, navigation, text treatments, controls, borders, and decorative details.
- The Light Mode reference is the source of truth for the original layout and composition.
- The Dark Mode reference is the source of truth for the dark beige colour treatment.
- The only intended visual difference between modes is the theme treatment: backgrounds, surfaces, text, borders, icons, decorative botanical line art, and button contrast must adapt to the selected theme.
- Both themes must feel like the same Villa Aurelia brand. Do not create a different dark-mode design or rearrange sections.
- Do not remove, add, reorder, simplify, or reinterpret the eight views.
- Do not introduce generic AI website styling, trendy gradients, oversized rounded cards, excessive animation, or unrelated visual flourishes.
- Use the supplied Villa Aurelia logo asset if available. Preserve its monogram, proportions, and wordmark. Do not recreate it with generic text.

**The output must include a real, functional Light/Dark theme switch.** It must not be a static pair of screenshots or two unrelated themes.

---

# 1. Visual identity and atmosphere

Villa Aurelia is a boutique villa stay. Its identity is calm, intimate, architectural, nature-connected, and quietly luxurious.

The visual language is:
- Editorial hospitality rather than a booking marketplace.
- Heritage-inspired serif display typography paired with clean contemporary sans-serif UI.
- Warm ivory in Light Mode.
- Dark roasted-beige, cocoa, and warm umber in Dark Mode.
- Antique champagne gold as the restrained shared accent.
- Deep olive used selectively in Light Mode and as a subtle botanical detail in Dark Mode.
- Natural photographs of the actual villa, gardens, rooms, pool, dining, and nearby experiences.
- Botanical illustrations used sparingly at the same edge positions as the references.
- Thin borders, modest corner radii, delicate line icons, and generous whitespace.
- Quiet confidence. The site should never look glossy, loud, synthetic, or over-designed.

**Density:** airy editorial (4/10).  
**Layout variance:** balanced asymmetric splits and image-led sections (5/10).  
**Motion:** restrained and functional (2/10).  
**Visual priority:** photography, typography, and whitespace. UI decoration is secondary.

---

# 2. Two themes, one design system

Implement both themes through a single shared token system. Use semantic theme variables rather than duplicating page components or maintaining two separate designs.

## 2.1 Light Mode palette

Light Mode must closely match the supplied light reference.

- **Ivory Canvas** — `#F4F0E6`: primary page background.
- **Soft Linen Surface** — `#FBF8F1`: booking panel, form surface, and subtle raised content.
- **Warm Champagne Surface** — `#E9E0D1`: quiet secondary areas and subtle surface differentiation.
- **Deep Olive Ink** — `#263321`: primary headings, strong text, active filter, and selected details.
- **Muted Olive** — `#59614B`: secondary botanical and interface details.
- **Antique Gold** — `#AE8950`: main accent for fine rules, small labels, line icons, and outline actions.
- **Muted Body Ink** — `#655F54`: descriptions and secondary copy.
- **Soft Border** — `#D8C6A6`: outlines, separators, input borders, and dividers.
- **Warm White** — `#FFFDF8`: only for small high-contrast surfaces where needed; do not turn the site stark white.

## 2.2 Dark Beige Mode palette

Dark Mode must match the supplied dark reference. It is a warm brown/beige theme, not a black theme.

- **Roasted Umber Canvas** — `#493629`: main page background. Use a warm, deep brown with visible beige undertone.
- **Deep Cocoa Surface** — `#3D2D23`: footer and deepest structural surfaces.
- **Warm Walnut Surface** — `#594333`: room rows, form surfaces, information panels, and raised content.
- **Soft Mocha Surface** — `#654D39`: secondary panels, subtle hover surfaces, and selected surface states.
- **Warm Ivory Text** — `#F3E8D4`: primary text and headlines.
- **Muted Linen Text** — `#D8C8AF`: body text and secondary descriptions.
- **Champagne Gold** — `#D0AD70`: primary accent, icons, thin borders, labels, and key decorative details.
- **Pale Gold Highlight** — `#E7C995`: filled primary buttons and active filters.
- **Dark Warm Border** — `#8A6D4F`: borders, input outlines, separators, and room-row edges.
- **Deep Olive Detail** — `#333A2A`: only for restrained botanical/photographic details where it naturally appears.

Dark Mode must preserve warm colour temperature. Do not use black, charcoal-blue, cool slate, purple, or neon accents. Avoid a flat single-brown page: use the canvas, cocoa, walnut, and mocha surfaces to create subtle depth while retaining the reference's restrained contrast.

## 2.3 Theme token mapping

Use semantic tokens so every component responds to the selected theme.

| Semantic token | Light Mode | Dark Beige Mode |
|---|---|---|
| `--page-bg` | `#F4F0E6` | `#493629` |
| `--surface` | `#FBF8F1` | `#594333` |
| `--surface-raised` | `#FFFDF8` | `#654D39` |
| `--surface-deep` | `#E9E0D1` | `#3D2D23` |
| `--text-primary` | `#263321` | `#F3E8D4` |
| `--text-secondary` | `#655F54` | `#D8C8AF` |
| `--accent` | `#AE8950` | `#D0AD70` |
| `--accent-strong` | `#8D6938` | `#E7C995` |
| `--border` | `#D8C6A6` | `#8A6D4F` |
| `--footer-bg` | `#263321` | `#3D2D23` |
| `--footer-text` | `#F4F0E6` | `#F3E8D4` |
| `--footer-muted` | `#D8C6A6` | `#D8C8AF` |

All components must use these semantic tokens. Do not hardcode Light Mode colours into components that should adapt to Dark Mode.

## 2.4 Theme contrast rules

- Text must remain comfortably readable in both modes.
- Do not use muted secondary text for essential instructions or form labels if it becomes too low contrast.
- Gold is an accent, not the default body-text colour.
- In Light Mode, use deep olive for text and antique gold for accents.
- In Dark Mode, use warm ivory for text and champagne gold for accents.
- Do not invert photographs or apply a dark overlay to every photograph just because Dark Mode is active. Keep natural image colours consistent between themes.
- Dark Mode surfaces should retain enough tonal distinction for room rows, forms, navigation, and panels to be understood.
- Focus indicators must be visible in both themes.

---

# 3. Theme toggle — required functional behaviour

Provide one discreet theme toggle that is accessible from every page.

## Placement
- Keep the existing header layout and navigation positions.
- Add a compact theme control in the header near the existing `ENQUIRE / BOOK` action without displacing or shrinking the logo or navigation.
- Use a small sun/moon line icon and a concise accessible label. Do not use a large switch card or prominent pill control.
- The toggle must look native to the Villa Aurelia design in both modes.
- On narrow screens, place it inside the mobile navigation menu with the same styling.

## Behaviour
- Selecting Light Mode applies all Light Mode semantic tokens.
- Selecting Dark Mode applies all Dark Beige Mode semantic tokens.
- The switch must update the entire site immediately, including header, navigation, page backgrounds, text, room rows, forms, filter states, footer, borders, icons, and decorative line art.
- The selected theme must persist across page navigation and browser refresh.
- On first visit, respect the visitor's operating-system preference if no saved preference exists.
- Once the visitor manually selects a theme, remember that selection for future visits.
- Provide a visible selected state and accessible name such as `Switch to dark theme` or `Switch to light theme`.
- Support keyboard operation and a visible focus state.
- Avoid flashing the wrong theme before the saved preference is applied.
- The toggle must not reset form input, selected dates, gallery state, or page scroll position.
- Do not create a separate dark-mode route or duplicate the site to achieve the theme change.

## Implementation guidance
Use a single theme state at the application root and semantic CSS variables or equivalent theme tokens. Persist the user's explicit preference in local storage or an equivalent client-side preference mechanism. Use `prefers-color-scheme` only as the initial default when no saved preference exists. Ensure the theme can be changed without a full page reload.

---

# 4. Typography system

Use the same typography in both themes. Only text colour changes.

- **Display / editorial headings:** `Cormorant Garamond`, regular weight (400). Use for the Home hero, page headings, room titles, editorial statements, and footer quotation.
- **Body / UI:** `DM Sans`, regular weight (400), with 500 for concise labels and navigation where necessary. Use for navigation, descriptions, form labels, buttons, booking controls, metadata, and utility text.
- **Brand wordmark:** use the actual supplied Villa Aurelia logo artwork. Do not approximate the wordmark with a substitute typeface.

Typography rules:
- Keep headings elegant and controlled. Do not make them oversized or excessively bold.
- Use a calm line-height and generous surrounding whitespace.
- Use small uppercase eyebrow labels with moderate letter spacing.
- Use compact, readable navigation.
- Use a maximum body-copy measure of approximately 60–65 characters.
- Use consistent type scale across all eight views.
- Keep prices visually distinct but not oversized.
- Do not introduce additional font families without a strong brand reason.

**Do not use:** Inter, Montserrat, Poppins, generic system fonts as the primary visual identity, Playfair Display, generic decorative scripts, or arbitrary font mixing. Avoid the typical AI-generated Playfair + Inter pairing.

---

# 5. Shared site shell and navigation

Repeat the same header on all light/dark page views:
- Villa Aurelia logo at the upper left.
- Navigation labels: `STAY`, `THE VILLA`, `EXPERIENCES`, `GALLERY`, `LOCATION`.
- A compact theme toggle.
- Outlined `ENQUIRE / BOOK` action at the far right.
- Warm ivory header in Light Mode; warm roasted-umber header in Dark Mode.
- Fine lower border or subtle separation.
- Small, carefully spaced typography.
- No oversized sticky header.

The header may remain sticky if implemented, but its height, background, and visual density must remain consistent with the reference. The header must not obscure page headings or anchor destinations.

---

# 6. Required page views — preserve the reference composition

The supplied board contains eight views arranged in a two-column by four-row design board. Recreate each as a coherent website page/section using the same shared design system.

1. Home — top-left.
2. Rooms & Suites — top-right.
3. The Villa — second-row left.
4. Experiences — second-row right.
5. Gallery — third-row left.
6. Location — third-row right.
7. Contact & Enquiries — bottom-left.
8. Footer — bottom-right.

The layout below is shared between both themes. Do not rearrange content to make Dark Mode look different.

## 6.1 Home

- Shared header.
- Large asymmetric split hero: text on the left, sunlit villa courtyard/pool photograph on the right.
- Subtle botanical line art entering from the far left.
- Eyebrow: `A BOUTIQUE VILLA STAY`.
- Main heading on two lines: `A quieter` / `kind of luxury.` The word `luxury.` receives the accent treatment.
- Supporting copy: `Thoughtfully appointed rooms. Unhurried mornings. A stay that feels entirely your own.`
- Understated `DISCOVER THE VILLA` text/outline action with fine gold detail.
- Horizontal booking strip across the lower hero area with check-in, check-out, guest count, and `CHECK AVAILABILITY`.
- Four compact feature summaries below:
  - `ELEGANT ROOMS`
  - `PEACEFUL SURROUNDINGS`
  - `CURATED EXPERIENCES`
  - `PERSONALISED HOSPITALITY`
- Each feature uses a fine line icon and concise supporting text.

Theme treatment:
- Light: ivory text panel, deep olive headline, antique-gold emphasis, pale booking strip.
- Dark: warm umber text panel, warm ivory headline, champagne-gold emphasis, walnut booking strip with warm borders.
- Keep the hero photograph natural and bright in both modes. Do not apply a dark overlay to the entire image.

## 6.2 Rooms & Suites

- Shared header.
- Eyebrow: `ROOMS & SUITES`.
- Heading: `Thoughtfully designed for real rest`.
- One short supporting sentence.
- Compact filter controls: `All Rooms`, `Deluxe Room`, `Premium Room`, `Family Suite`.
- Three horizontal room rows, not a generic three-column card grid.
- Each row contains: rectangular room image at left, room title and description in the middle, compact amenities, right-aligned price, and outlined `VIEW DETAILS` action.
- Reference room names and sample prices:
  - `Deluxe Room` — `₹4,500 / night`
  - `Premium Room` — `₹5,500 / night`
  - `Family Suite` — `₹8,500 / night`
- Use the sample values only as reference content. Confirm real rates before publishing.

Theme treatment:
- Light: pale linen row surfaces, deep olive titles, antique-gold outlines, dark text.
- Dark: walnut row surfaces, warm ivory titles, champagne-gold outlines, muted linen descriptions.
- Active filter: deep olive with light text in Light Mode; pale gold fill with dark warm text in Dark Mode.
- Maintain the horizontal image/details/price structure.

## 6.3 The Villa

- Shared header.
- Eyebrow: `THE VILLA`.
- Split feature section with left-side text and large right-side villa photograph.
- Heading: `A home of serenity and charm`, with `serenity` highlighted in antique gold/champagne gold.
- Short property story paragraph.
- Small `OUR STORY` action.
- Beneath: four compact image-and-caption items:
  - `Architecture`
  - `Lush Gardens`
  - `Common Spaces`
  - `Dining Experience`
- Each item contains a rectangular photograph, small serif title, and short supporting text.

Theme treatment:
- Keep photographs unchanged.
- Light uses ivory and olive text.
- Dark uses roasted umber and warm ivory text.
- Keep the gold emphasis consistent with the active theme.

## 6.4 Experiences

- Shared header.
- Eyebrow: `EXPERIENCES`.
- Heading: `More than just a stay`.
- Short supporting introduction.
- Three image-led panels in one horizontal row:
  - `Local Attractions`
  - `Food & Dining`
  - `Unique Experiences`
- Each panel has a rectangular photo, title, concise copy, and a small understated text action.
- Beneath the panels, preserve the wide dark olive/nature promotional banner:
  - Nature/waterfront photograph integrated on the left.
  - Ivory serif heading: `Create memories that stay with you.`
  - Short supporting text.
  - Small outlined `PLAN YOUR STAY` action at the right.
- This banner remains visually dark and nature-led in both themes, with enough contrast for its text.

## 6.5 Gallery

- Shared header.
- Eyebrow: `GALLERY`.
- Heading: `A glimpse of Villa Aurelia`.
- Short introductory copy.
- Compact filter controls: `All`, `Rooms`, `Outdoor`, `Dining`, `Interiors`, `Surroundings`.
- Three-column by two-row image grid with six rectangular photographs:
  - Courtyard/pool.
  - Bedroom.
  - Garden/courtyard.
  - Dining.
  - Interior.
  - Outdoor lounge.
- Small outlined `VIEW FULL GALLERY` action below.
- Botanical detail in the upper-right whitespace.
- Do not add captions to every image if not shown in the reference.

Theme treatment:
- Only page surfaces, typography, filters, borders, and controls change.
- Gallery photography retains its natural colour and exposure.

## 6.6 Location

- Shared header.
- Eyebrow: `LOCATION`.
- Heading: `Find us with ease`.
- Short location introduction.
- Two-column information/map area:
  - Left information panel with rows for `Address`, `Nearby Attractions`, and `Distance from Key Locations`.
  - Right map panel with location marker and compact map controls.
- Beneath: five attraction tiles:
  - `Local Beach`
  - `Heritage Temple`
  - `Scenic Viewpoint`
  - `Cultural Town`
  - `Nature Trail`
- Each tile contains a small landscape photograph, compact title, and distance metadata.
- Botanical decoration remains in the upper-right whitespace.
- Use verified property address, map coordinates, attractions, and distances in production. Do not publish illustrative reference values as factual.

Theme treatment:
- Light: pale ivory information panel and warm map border.
- Dark: walnut information panel with ivory text and champagne-gold icons/borders.
- Map imagery remains legible and should not be forcibly colour-inverted. Use a suitable map style only if it remains clear and geographically accurate.

## 6.7 Contact & Enquiries

- Shared header.
- Eyebrow: `CONTACT & ENQUIRIES`.
- Left column:
  - Heading: `We’d love to hear from you`.
  - Short welcoming copy.
  - Contact rows with line icons: `Call Us`, `WhatsApp`, `Email`, `Our Hours`.
- Right column:
  - Enquiry form panel headed `Send an Enquiry`.
  - Fields: Name, Email, Check-in Date, Check-out Date, Guests, Preferred Room.
  - Full-width optional message field.
  - Primary action: `SEND ENQUIRY`.
- Keep labels above inputs.
- Fine borders, restrained corner radii, clear field spacing, and compact date controls.
- Preserve the botanical detail and decorative vase/plant at the far right.
- Use verified phone, email, opening hours, and business details only.

Theme treatment:
- Light: soft linen form panel, olive text, antique-gold button and borders.
- Dark: walnut/mocha form panel, warm ivory text, champagne-gold button and borders.
- Inputs must remain visually distinct from their containing panel.
- Error, success, disabled, and focus states must be styled for both themes.

## 6.8 Footer

- Full-width deep olive footer in Light Mode.
- Full-width deep cocoa/umber footer in Dark Mode.
- Centre Villa Aurelia logo near the top.
- Brand statement: `A quieter kind of luxury.`
- Fine gold separator and `STAY CONNECTED` label.
- Restrained social icons.
- Thin horizontal divider.
- Three columns:
  - **Quick Links:** Home, Rooms & Suites, The Villa, Experiences, Gallery, Location, Contact.
  - **Our Policies:** Terms of Stay, Cancellation Policy, Privacy Policy, FAQ.
  - **Contact:** verified address, phone, and email.
- Ivory/warm beige text and muted gold details.
- Botanical line art at the outer edges.
- No black footer and no gradient.

---

# 7. Components and interaction styling

## Buttons
- Primary buttons use a restrained antique/champagne-gold fill.
- Secondary buttons use transparent or theme-surface fill with a fine gold border.
- Small uppercase labels with modest tracking.
- Square or subtly rounded corners; no pill buttons.
- Tactile active state: a restrained 1px press or subtle opacity shift.
- Focus rings must be clearly visible in both themes.

## Cards and rows
- Use cards only where the reference shows a distinct panel or content grouping.
- Room entries remain horizontal rows.
- Keep borders thin and warm.
- Shadows are minimal or absent.
- No oversized radius, floating glass cards, or unnecessary elevation.

## Forms
- Label above each field.
- Input background distinct from its panel.
- Fine warm border.
- Visible focus, error, disabled, and success states.
- Date and guest selectors must remain accessible.
- Never rely on placeholder text as the only label.

## Filters
- Small, restrained controls.
- Active filter uses a clear theme-appropriate fill.
- Inactive filters use subtle surfaces and borders.
- Preserve the reference's compact filter placement and shape.

## Icons
- Use simple, consistent fine-line icons.
- Antique gold in Light Mode; champagne gold in Dark Mode.
- No emoji icons.
- Do not mix unrelated icon families or filled and outlined styles arbitrarily.

## Loading, empty, and error states
- Loading states use subtle skeletons that match the final component dimensions.
- Errors appear inline near the affected form or content.
- Empty states should be calm and informative, without illustrations that change the brand aesthetic.
- Do not use generic full-screen spinners.

---

# 8. Photography and botanical illustration

Photography is the emotional centre of the site.

Use a cohesive collection of natural, realistic hospitality photographs:
- Sunlit villa courtyard and pool.
- Warm architecture and timber details.
- Bedrooms with natural linen and warm wood.
- Garden paths and outdoor seating.
- Dining tables and breakfast details.
- Nearby nature and local attractions.

Image rules:
- Keep the same image placement and crop ratios as the references.
- Prefer real Villa Aurelia photographs whenever available.
- Use consistent warm natural colour grading.
- Do not make photographs artificially darker in Dark Mode.
- Do not use synthetic-looking interiors, unrelated luxury hotel imagery, neon grading, excessive HDR, or visibly artificial AI imagery.
- Avoid broken image URLs and generic placeholder images in the final product.

Botanical details:
- Fine, elegant leaf illustrations in restrained olive/gold tones.
- Keep them at the same edge positions as the reference.
- Do not let botanical illustrations overlap text, controls, or photographs.
- In Dark Mode, shift botanical line art to muted champagne/beige so it remains visible without glowing.

---

# 9. Layout, spacing, and responsive behaviour

## Desktop
- Preserve the wide editorial composition and the reference's split sections.
- Use a centred content frame with consistent margins.
- Maintain the compact header.
- Keep the hero asymmetrical: text on the left, image on the right.
- Preserve the two-column information layout on Location and Contact.
- Keep the gallery image grid and horizontal room rows.

## Tablet
- Reduce outer margins and column gaps.
- Keep the main hierarchy and image/text relationship.
- Allow room rows to compress without hiding prices or actions.
- Avoid text/image collisions.

## Mobile (below 768px)
- Collapse split sections into a single-column reading order.
- Convert the header into a compact accessible menu.
- Put the theme toggle inside the mobile menu.
- Stack or compact the booking controls without hiding any field.
- Convert room rows into stacked room entries while preserving image, details, rate, and action.
- Gallery columns reduce to two and then one as viewport width requires.
- Stack Location details and map.
- Stack Contact details and enquiry form.
- Keep all controls usable with touch targets of at least 44px.
- No horizontal page overflow.
- Use fluid headline sizing and comfortable body text.
- Preserve the same colours, typography, image style, and design language in both themes.

---

# 10. Motion and accessibility

Motion should be almost invisible:
- Subtle colour transitions for links and buttons.
- Small opacity/transform transitions for interaction feedback.
- No dramatic page transitions.
- No excessive parallax.
- No perpetual floating, pulsing, shimmer, or decorative motion.
- Respect `prefers-reduced-motion`.
- Never animate layout dimensions in ways that cause reflow or content jumps.

Accessibility:
- Semantic heading hierarchy.
- Keyboard-operable navigation, theme toggle, filters, gallery, and forms.
- Visible focus states in both themes.
- Useful image alt text.
- Accessible names for icon-only controls.
- Correct form labels and error announcements.
- Sufficient text/background contrast.
- Do not communicate selected states using colour alone.

---

# 11. Production content integrity

The reference board contains sample room rates, address, distances, contact details, opening hours, map markers, and attraction information. Treat these as visual placeholders until the owner confirms them.

- Do not invent guest reviews, ratings, awards, occupancy numbers, or business claims.
- Do not publish sample prices or contact details as real.
- Do not claim that a reservation is confirmed when the form only sends an enquiry.
- Clearly explain the enquiry and confirmation process.
- Use the property's actual photographs and approved brand assets.
- Preserve the reference copy where it is intended as final brand copy; otherwise replace placeholders only with customer-approved text.

---

# 12. Explicit anti-patterns — prohibited in both themes

- No redesign or reinterpretation of either supplied reference.
- No changes to page order, page hierarchy, or section composition.
- No separate visual identity for Dark Mode.
- No black or blue-black Dark Mode.
- No purple, blue, neon, or oversaturated gradients.
- No glossy glassmorphism.
- No pill-shaped buttons.
- No oversized rounded cards.
- No fake reviews, ratings, statistics, or awards.
- No generic AI copywriting clichés.
- No emojis.
- No Inter, Montserrat, Poppins, Playfair Display, or arbitrary font mixing.
- No custom cursors.
- No bouncing arrows or “scroll to explore” filler.
- No excessive parallax or decorative animation.
- No text/image overlap.
- No generic three-equal-card feature row replacing the specific reference composition.
- No unrelated stock photography or synthetic-looking villa imagery.
- No hardcoded light-only colours in components that must support Dark Mode.
- No theme toggle that only changes the page background while leaving cards, text, forms, navigation, or footer unchanged.
- No flash of the wrong theme on page load.
- No loss of theme preference after navigation or refresh.

---

# 13. Final Google Stitch generation instruction

Use both attached reference images together:
- **Light reference:** exact layout, composition, hierarchy, and Light Mode appearance.
- **Dark reference:** exact Dark Beige Mode appearance and colour treatment.

Create one coherent Villa Aurelia website system with both themes and a working theme toggle. The same pages, content, image placements, component geometry, and layout must remain consistent when switching themes. Apply the correct semantic palette to every component.

Generate all eight views:
1. Home
2. Rooms & Suites
3. The Villa
4. Experiences
5. Gallery
6. Location
7. Contact & Enquiries
8. Footer

The result must feel like one carefully art-directed boutique villa website, not a generic template. Match the references first. **Do not make unrequested design changes.**
