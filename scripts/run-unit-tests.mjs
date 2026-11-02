import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

async function run() {
  await build({
    root,
    build: {
      lib: {
        entry: path.resolve(__dirname, 'test-whatsapp.mjs'),
        formats: ['es'],
        fileName: () => 'test-whatsapp-bundled.mjs',
      },
      outDir: path.resolve(__dirname, '../dist-test'),
      emptyOutDir: true,
      minify: false,
    },
  });

  console.log('\n--- EXECUTING TEST SUITE ---');
  await import(`file://${path.resolve(root, 'dist-test/test-whatsapp-bundled.mjs')}?t=${Date.now()}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

