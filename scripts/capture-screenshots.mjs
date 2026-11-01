import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const screenshotsDir = path.resolve(rootDir, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Simple MIME types map
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback
    const indexPath = path.join(distDir, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    fs.createReadStream(indexPath).pipe(res);
  }
});

const PORT = 4173;
server.listen(PORT, async () => {
  console.log(`Static server running at http://localhost:${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const viewports = [
    { name: 'desktop-light', width: 1440, height: 900, url: `http://localhost:${PORT}/?theme=light` },
    { name: 'desktop-dark', width: 1440, height: 900, url: `http://localhost:${PORT}/?theme=dark` },
    { name: 'tablet-light', width: 768, height: 1024, url: `http://localhost:${PORT}/?theme=light` },
    { name: 'tablet-dark', width: 768, height: 1024, url: `http://localhost:${PORT}/?theme=dark` },
    { name: 'mobile-light', width: 375, height: 812, url: `http://localhost:${PORT}/?theme=light` },
    { name: 'mobile-dark', width: 375, height: 812, url: `http://localhost:${PORT}/?theme=dark` },
    // Specific sections
    { name: 'villa-section-desktop', width: 1440, height: 1100, url: `http://localhost:${PORT}/#the-villa` },
    { name: 'terrace-section-desktop', width: 1440, height: 1100, url: `http://localhost:${PORT}/#terrace` },
    { name: 'gallery-section-desktop', width: 1440, height: 1100, url: `http://localhost:${PORT}/#gallery` },
    { name: 'location-section-desktop', width: 1440, height: 1100, url: `http://localhost:${PORT}/#location` },
    { name: 'contact-section-desktop', width: 1440, height: 1100, url: `http://localhost:${PORT}/#contact` }
  ];

  for (const vp of viewports) {
    const outPath = path.join(screenshotsDir, `${vp.name}.png`);
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);

    await new Promise((resolve) => {
      const child = spawn(
        chromePath,
        [
          '--headless=new',
          `--screenshot=${outPath}`,
          `--window-size=${vp.width},${vp.height}`,
          '--hide-scrollbars',
          '--virtual-time-budget=2500',
          vp.url,
        ],
        { stdio: 'inherit' }
      );
      child.on('exit', () => resolve());
    });
  }

  console.log('All screenshots captured successfully.');
  server.close(() => process.exit(0));
});

