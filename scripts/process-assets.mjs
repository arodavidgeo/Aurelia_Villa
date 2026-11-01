import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const originalsDir = path.join(rootDir, 'assets-source', 'originals');
const publicImagesDir = path.join(rootDir, 'public', 'images', 'villa');
const publicLogoDir = path.join(rootDir, 'public', 'logo');

fs.mkdirSync(publicImagesDir, { recursive: true });
fs.mkdirSync(publicLogoDir, { recursive: true });

async function processAll() {
  console.log('--- Processing Official Logo ---');
  const logoSource = path.join(originalsDir, 'logo.jpeg');
  
  // 1. Logo for light theme (high res WebP & PNG)
  await sharp(logoSource)
    .resize(800, null, { withoutEnlargement: true })
    .png({ quality: 95 })
    .toFile(path.join(publicLogoDir, 'villa-aurelia-logo.png'));

  await sharp(logoSource)
    .resize(400, null, { withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.join(publicLogoDir, 'villa-aurelia-logo.webp'));

  // 2. Favicon from logo mark (center crop of monogram mark)
  await sharp(logoSource)
    .extract({ left: 160, top: 40, width: 700, height: 700 })
    .resize(192, 192)
    .png()
    .toFile(path.join(rootDir, 'public', 'favicon.png'));

  // 3. Process property photos
  console.log('--- Processing Real Property Photographs ---');
  const photos = [
    {
      source: 'Modern Residence Behind a Geometric Gate.png',
      slug: 'villa-aurelia-exterior-01',
      category: 'Exterior',
      focal: 'center',
    },
    {
      source: 'Modern Living Room with Green Niches.png',
      slug: 'villa-aurelia-hall-01',
      category: 'Hall',
      focal: 'center',
    },
    {
      source: 'Tidy Green Bedroom with Floral Bed.png',
      slug: 'villa-aurelia-bedroom-01',
      category: 'Bedroom 1',
      focal: 'center',
    },
    {
      source: 'Modern Blue Bedroom with Built-In Niches.png',
      slug: 'villa-aurelia-bedroom-02',
      category: 'Bedroom 2',
      focal: 'center',
    },
    {
      source: 'Minimalist Kitchen with Maroon Accents.png',
      slug: 'villa-aurelia-kitchen-01',
      category: 'Kitchen',
      focal: 'center',
    },
    {
      source: 'Tiled Shower with Rainfall Fixture.png',
      slug: 'villa-aurelia-toilet-western-01',
      category: 'Toilet (Western)',
      focal: 'center',
    },
    {
      source: 'terrace-night.jpg',
      slug: 'villa-aurelia-terrace-night',
      category: 'Terrace (Night)',
      focal: 'center',
    },
    {
      source: 'bathroom-western.jpg',
      slug: 'villa-aurelia-bathroom-western',
      category: 'Bathroom (Western)',
      focal: 'center',
    },
    {
      source: 'living-room.jpg',
      slug: 'villa-aurelia-living-room',
      category: 'Living Room',
      focal: 'center',
    },
    {
      source: 'bathroom-indian.jpg',
      slug: 'villa-aurelia-bathroom-indian',
      category: 'Bathroom (Indian)',
      focal: 'center',
    },
  ];

  const widths = [480, 800, 1200, 1800];

  for (const item of photos) {
    const srcPath = path.join(originalsDir, item.source);
    if (!fs.existsSync(srcPath)) {
      console.error(`Missing source image: ${srcPath}`);
      continue;
    }

    const meta = await sharp(srcPath).metadata();
    console.log(`Processing ${item.slug} (Original: ${meta.width}x${meta.height})`);

    // Master WebP & JPEG
    await sharp(srcPath)
      .resize(1800, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(publicImagesDir, `${item.slug}.webp`));

    await sharp(srcPath)
      .resize(1800, null, { withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(path.join(publicImagesDir, `${item.slug}.jpg`));

    // Responsive widths
    for (const w of widths) {
      if (meta.width && w <= meta.width) {
        await sharp(srcPath)
          .resize(w, null, { withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(path.join(publicImagesDir, `${item.slug}-${w}w.webp`));
      }
    }
  }

  console.log('All property images and logo processed successfully into public/images/villa and public/logo!');
}

processAll().catch((err) => {
  console.error(err);
  process.exit(1);
});

