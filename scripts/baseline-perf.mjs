import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

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
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const indexPath = path.join(distDir, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    fs.createReadStream(indexPath).pipe(res);
  }
});

const PORT = 4173;
server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);

  // Calculate JS and CSS sizes
  const assetsDir = path.join(distDir, 'assets');
  const files = fs.readdirSync(assetsDir);
  let jsBytes = 0;
  let cssBytes = 0;
  for (const f of files) {
    const stat = fs.statSync(path.join(assetsDir, f));
    if (f.endsWith('.js')) jsBytes += stat.size;
    if (f.endsWith('.css')) cssBytes += stat.size;
  }

  console.log(`\n--- Baseline Bundle Metrics ---`);
  console.log(`Total JS Size: ${(jsBytes / 1024).toFixed(2)} KB raw`);
  console.log(`Total CSS Size: ${(cssBytes / 1024).toFixed(2)} KB raw`);

  server.close(() => process.exit(0));
});
