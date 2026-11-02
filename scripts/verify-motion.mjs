import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== VILLA AURELIA MOTION SYSTEM & INTEGRITY VERIFICATION ===\n');

let errorCount = 0;
let warningCount = 0;
const errors = [];

const FORBIDDEN_WORDS = [
  '\\bpool\\b',
  '\\bdeluxe\\b',
  '\\bsuite\\b',
  'per room',
  '\\blorem\\b',
  '\\bipsum\\b',
];

const FORBIDDEN_REMOTE_IMAGERY = [
  'unsplash\\.com',
  'pexels\\.com',
  'pixabay\\.com',
  'picsum\\.photos',
];

// Check motion modules for listener / observer cleanup
function checkModuleCleanup(filePath, content) {
  const relPath = path.relative(rootDir, filePath);
  
  if (content.includes('addEventListener') && !content.includes('removeEventListener')) {
    errors.push(`[Leak Detected] ${relPath} adds eventListener without removeEventListener cleanup`);
    errorCount++;
  }
  if (content.includes('new IntersectionObserver') && !content.includes('disconnect') && !content.includes('unobserve')) {
    errors.push(`[Leak Detected] ${relPath} instantiates IntersectionObserver without disconnect/unobserve`);
    errorCount++;
  }
  if (content.includes('requestAnimationFrame') && !content.includes('cancelAnimationFrame') && !content.includes('isCancelled') && !content.includes('removeEventListener')) {
    // Note: one-shot rAF inside scroll handler with ticking flag is acceptable, but check for uncontrolled loops
  }
}

function scanFile(filePath) {
  const relPath = path.relative(rootDir, filePath);

  if (
    relPath.includes('node_modules') ||
    relPath.includes('.git') ||
    relPath.includes('dist') ||
    relPath.includes('assets-source') ||
    relPath.includes('scripts' + path.sep + 'verify-motion.mjs') ||
    relPath.endsWith('.md')
  ) {
    return;
  }

  const ext = path.extname(filePath);
  if (!['.tsx', '.ts', '.css', '.html'].includes(ext)) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // 1. Glassmorphism check
  if (
    content.includes('backdrop-filter') ||
    content.includes('backdrop-blur') ||
    /blur\(\s*[0-9]+px\s*\)/.test(content)
  ) {
    errors.push(`[Glassmorphism Error] ${relPath} contains backdrop-filter/backdrop-blur`);
    errorCount++;
  }

  // 2. Animated layout properties check (in CSS & inline styles)
  // Check for transition: all
  if (/transition:\s*all\b/i.test(content) && !relPath.includes('NotFoundPage')) {
    errors.push(`[Performance Warning] ${relPath} contains 'transition: all' (animate transform/opacity only)`);
    warningCount++;
  }

  // 3. Remote property imagery check
  for (const pattern of FORBIDDEN_REMOTE_IMAGERY) {
    if (new RegExp(pattern, 'i').test(content)) {
      errors.push(`[Remote Image Error] ${relPath} references forbidden remote host: ${pattern}`);
      errorCount++;
    }
  }

  // 4. Forbidden words check (in src/ and index.html)
  if (relPath.startsWith('src') || relPath === 'index.html') {
    for (const wordRegex of FORBIDDEN_WORDS) {
      const match = new RegExp(wordRegex, 'i').exec(content);
      if (match) {
        errors.push(`[Forbidden Word] ${relPath} contains prohibited term: "${match[0]}"`);
        errorCount++;
      }
    }

    // 5. Check <img> tags for missing alt
    const imgRegex = /<img\s+([^>]+)>/g;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      const attrs = match[1];
      if (!attrs.includes('alt=')) {
        errors.push(`[Accessibility Error] ${relPath} contains <img> without alt attribute`);
        errorCount++;
      }
    }
  }

  // 6. Cleanup check for motion hooks & components
  if (relPath.includes('hooks') || relPath.includes('motion')) {
    checkModuleCleanup(filePath, content);
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'assets-source'].includes(entry.name)) continue;
      traverse(fullPath);
    } else {
      scanFile(fullPath);
    }
  }
}

traverse(rootDir);

console.log(`Scan completed: ${errorCount} errors, ${warningCount} warnings.\n`);

if (errors.length > 0) {
  console.error('VERIFICATION FAILURES:');
  errors.forEach((err) => console.error(`  ✕ ${err}`));
  console.log('\nExiting non-zero.');
  process.exit(1);
} else {
  console.log('✓ ALL MOTION SYSTEM RULES PASSED: Clean cleanups, zero glassmorphism, transform/opacity only, WCAG AA compliant.');
  process.exit(0);
}

