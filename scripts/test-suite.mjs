import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== VILLA AURELIA COMPREHENSIVE QA AUDIT ===\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  }
}

// 1. Asset verification
console.log('--- 1. Image Assets Audit ---');
const requiredImages = [
  'hero-courtyard.png',
  'room-deluxe.png',
  'room-premium.png',
  'room-family.png',
  'villa-architecture-main.png',
  'villa-architecture.png',
  'villa-gardens.png',
  'villa-common-spaces.png',
  'villa-dining.png',
  'experience-attractions.png',
  'experience-dining.png',
  'experience-unique.png',
  'experience-banner.png',
  'gallery-pool.png',
  'gallery-bedroom.png',
  'gallery-garden.png',
  'gallery-dining.png',
  'gallery-interior.png',
  'gallery-outdoor.png',
  'location-map.png',
  'location-beach.png',
  'location-temple.png',
  'location-viewpoint.png',
  'location-town.png',
  'location-trail.png',
  'contact-vase.png',
];

const imgDir = path.join(rootDir, 'public', 'images');
for (const img of requiredImages) {
  const p = path.join(imgDir, img);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  assert(exists && size > 1000, `Asset ${img} exists and is valid (${size} bytes)`);
}

// 2. Build output verification
console.log('\n--- 2. Production Build Artifacts Audit ---');
const distHtml = path.join(rootDir, 'dist', 'index.html');
assert(fs.existsSync(distHtml), 'dist/index.html was produced');
const htmlContent = fs.existsSync(distHtml) ? fs.readFileSync(distHtml, 'utf-8') : '';
assert(htmlContent.includes('Villa Aurelia'), 'dist/index.html contains title brand');
assert(htmlContent.includes('LodgingBusiness'), 'dist/index.html contains structured schema');
assert(htmlContent.includes('Cormorant Garamond'), 'dist/index.html includes serif font link');
assert(htmlContent.includes('DM Sans'), 'dist/index.html includes sans font link');
assert(htmlContent.includes('data-theme'), 'dist/index.html contains anti-flash script');

// 3. Theme tokens verification in index.css
console.log('\n--- 3. Theme Token Design System Audit ---');
const indexCss = fs.readFileSync(path.join(rootDir, 'src', 'index.css'), 'utf-8');
const lightTokens = [
  '--page-bg: #F4F0E6',
  '--surface: #FBF8F1',
  '--surface-deep: #E9E0D1',
  '--text-primary: #263321',
  '--accent: #AE8950',
  '--border: #D8C6A6',
  '--footer-bg: #263321',
];

const darkTokens = [
  '--page-bg: #493629',
  '--surface: #594333',
  '--surface-deep: #3D2D23',
  '--text-primary: #F3E8D4',
  '--accent: #D0AD70',
  '--border: #8A6D4F',
  '--footer-bg: #3D2D23',
];

for (const t of lightTokens) {
  assert(indexCss.includes(t), `Light token defined: ${t}`);
}

for (const t of darkTokens) {
  assert(indexCss.includes(t), `Dark token defined: ${t}`);
}

// 4. Verification of Components & Views
console.log('\n--- 4. Component Hierarchy Audit ---');
const componentsToCheck = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/HomeHero.tsx',
  'src/components/sections/RoomsSection.tsx',
  'src/components/sections/TheVillaSection.tsx',
  'src/components/sections/ExperiencesSection.tsx',
  'src/components/sections/GallerySection.tsx',
  'src/components/sections/LocationSection.tsx',
  'src/components/sections/ContactSection.tsx',
  'src/components/sections/AmenitiesSection.tsx',
  'src/components/sections/FAQSection.tsx',
  'src/components/sections/BookingPoliciesSection.tsx',
  'src/components/common/ThemeToggle.tsx',
  'src/components/common/BackToTop.tsx',
  'src/components/common/FloatingWhatsApp.tsx',
  'src/components/common/MobileBookingBar.tsx',
  'src/components/common/ConfirmationModal.tsx',
  'src/components/common/CookieConsent.tsx',
  'src/components/common/PolicyModal.tsx',
  'src/components/pages/NotFoundPage.tsx',
];

for (const comp of componentsToCheck) {
  assert(fs.existsSync(path.join(rootDir, comp)), `Component exists: ${comp}`);
}

console.log(`\nAudit Complete: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATION AUDITS PASSED!\n');
}
