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

  if (reqPath === '/index.html') {
    let content = fs.readFileSync(filePath, 'utf8');
    if (req.url.includes('test_enquiry=1')) {
      const injection = `
        <style>
          header, footer, #mobile-booking-bar, main > *:not(#contact) {
            display: none !important;
          }
          #contact {
            padding-top: 1rem !important;
            padding-bottom: 2rem !important;
          }
        </style>
        <script>
          try {
            sessionStorage.setItem('va_pending_whatsapp_enquiry', JSON.stringify({
              fullName: 'David Geo',
              phone: '9629668800',
              email: 'david@example.com',
              checkInDate: '2026-11-06',
              checkOutDate: '2026-11-07',
              guests: 4,
              purposeOfVisit: 'Family Stay',
              message: 'Looking forward to our stay.'
            }));
          } catch (e) {}
        </script>
      `;
      content = content.replace('</head>', `${injection}</head>`);
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(content);
    return;
  }

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
    { name: 'whatsapp-thankyou-1440-light', width: 1440, height: 1300, url: `http://localhost:${PORT}/?test_enquiry=1&theme=light` },
    { name: 'whatsapp-thankyou-1440-dark', width: 1440, height: 1300, url: `http://localhost:${PORT}/?test_enquiry=1&theme=dark` },
    { name: 'whatsapp-thankyou-375-light', width: 375, height: 2300, url: `http://localhost:${PORT}/?test_enquiry=1&theme=light` },
    { name: 'whatsapp-thankyou-375-dark', width: 375, height: 2300, url: `http://localhost:${PORT}/?test_enquiry=1&theme=dark` },
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
