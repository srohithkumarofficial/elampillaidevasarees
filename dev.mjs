import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawArgs = process.argv.slice(2);
let port = '3000';
let host = '0.0.0.0';

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--port' || arg === '-p') {
    port = rawArgs[++i] || '3000';
  } else if (arg.startsWith('--port=')) {
    port = arg.split('=')[1];
  } else if (arg === '--host' || arg === '-H' || arg === '--hostname') {
    host = rawArgs[++i] || host;
  } else if (arg.startsWith('--host=')) {
    host = arg.split('=')[1];
  } else if (arg.startsWith('--hostname=')) {
    host = arg.split('=')[1];
  }
}

const nextBin = path.resolve(__dirname, 'node_modules/next/dist/bin/next');
const env = { ...process.env, PORT: port };

const child = spawn(process.execPath, [nextBin, 'dev', '-p', port, '-H', host], {
  stdio: 'inherit',
  env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
