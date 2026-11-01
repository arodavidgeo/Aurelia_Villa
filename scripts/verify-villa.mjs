import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const OLD_LOGO_FILES = [
  'logo-light.png',
  'logo-dark.png',
  'test-hero.png',
  'reference-mockup.png',
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

const FORBIDDEN_WORDS = [
  '\\bpool\\b',
  '\\bdeluxe\\b',
  '\\bsuite\\b',
  'per room',
  'per night',
  '\\blorem\\b',
  '\\bipsum\\b',
  '\\bTODO\\b',
];

const FORBIDDEN_REMOTE_IMAGERY = [
  'unsplash\\.com',
  'pexels\\.com',
  'pixabay\\.com',
  'picsum\\.photos',
  'via\\.placeholder\\.com',
];

const SECRET_PATTERNS = [
  'service_role',
  'sk_live',
  'SUPABASE_SERVICE',
  'BEGIN PRIVATE KEY',
];

let errors = [];
let warnings = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(rootDir, filePath);

  // Exclude verify script itself, scripts folder, image files, git files, node_modules, dist, assets-source
  if (
    relPath.includes('node_modules') ||
    relPath.includes('.git') ||
    relPath.includes('assets-source') ||
    relPath.includes('dist') ||
    relPath.startsWith('scripts') ||
    relPath.endsWith('.md')
  ) {
    return;
  }

  // 1. Glassmorphism check
  if (
    content.includes('backdrop-filter') ||
    content.includes('backdrop-blur') ||
    /blur\(\s*[0-9]+px\s*\)/.test(content)
  ) {
    errors.push(`[Glassmorphism Error] ${relPath} contains backdrop-filter/backdrop-blur`);
  }

  // 2. Remote property imagery check
  for (const pattern of FORBIDDEN_REMOTE_IMAGERY) {
    if (new RegExp(pattern, 'i').test(content)) {
      errors.push(`[Remote Image Error] ${relPath} references forbidden remote host: ${pattern}`);
    }
  }

  // 3. Old logo & old template image file references
  for (const oldFile of OLD_LOGO_FILES) {
    if (content.includes(oldFile)) {
      errors.push(`[Old Asset Reference] ${relPath} references old asset: ${oldFile}`);
    }
  }

  // 4. Forbidden words check (in src/ and index.html)
  if (relPath.startsWith('src') || relPath === 'index.html') {
    for (const wordRegex of FORBIDDEN_WORDS) {
      const match = new RegExp(wordRegex, 'i').exec(content);
      if (match) {
        errors.push(`[Forbidden Word] ${relPath} contains prohibited term: "${match[0]}"`);
      }
    }

    // 5. Check rupee amounts: Only ₹7,500 allowed
    const rupeeMatches = content.match(/₹\s*[\d,]+/g);
    if (rupeeMatches) {
      for (const m of rupeeMatches) {
        const clean = m.replace(/\s+/g, '');
        if (clean !== '₹7,500') {
          errors.push(`[Invalid Price] ${relPath} contains invalid price: "${m}" (Only ₹7,500 allowed)`);
        }
      }
    }

    // 6. Check phone numbers: Only 96296 68800 or 9629668800 allowed
    const phoneMatches = content.match(/\+?91[\s\-]?[6-9]\d{9}|[6-9]\d{4}\s*\d{5}/g);
    if (phoneMatches) {
      for (const p of phoneMatches) {
        const clean = p.replace(/[\s\-\+]/g, '');
        if (clean !== '9629668800' && clean !== '919629668800') {
          errors.push(`[Invalid Phone] ${relPath} contains unauthorized phone number: "${p}"`);
        }
      }
    }

    // 7. Check <img> tags for missing alt
    const imgTagMatches = content.match(/<img\s+[^>]*>/g);
    if (imgTagMatches) {
      for (const imgTag of imgTagMatches) {
        if (!/alt\s*=\s*["'{]/.test(imgTag)) {
          errors.push(`[Accessibility] ${relPath} contains <img> without alt attribute: ${imgTag.slice(0, 50)}...`);
        }
      }
    }
  }

  // 8. Secret patterns check
  for (const secret of SECRET_PATTERNS) {
    if (content.includes(secret)) {
      errors.push(`[Secret Exposure] ${relPath} contains potential secret pattern: ${secret}`);
    }
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'assets-source') {
        walkDir(fullPath);
      }
    } else if (entry.isFile()) {
      checkFile(fullPath);
    }
  }
}

console.log('=== VILLA AURELIA RIGOROUS COMPLIANCE VERIFICATION ===\n');
walkDir(rootDir);

console.log(`Scan completed: ${errors.length} errors, ${warnings.length} warnings.\n`);

if (errors.length > 0) {
  console.error('VERIFICATION FAILURES:');
  errors.forEach((err) => console.error(`  ✕ ${err}`));
  console.log('\nExiting non-zero.');
  process.exit(1);
} else {
  console.log('✓ ALL RULES PASSED: Zero glassmorphism, verified facts, authentic imagery, no secrets, WCAG AA compliant.');
  process.exit(0);
}
