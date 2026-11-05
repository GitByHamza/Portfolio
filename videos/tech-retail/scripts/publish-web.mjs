import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const master = fileURLToPath(new URL('../out/texcodes-tech-retail-4k.mp4', import.meta.url));
const destination = new URL('../../../public/video/', import.meta.url);
await mkdir(destination, { recursive: true });
const web = fileURLToPath(new URL('tech-retail-overview.mp4', destination));
const poster = fileURLToPath(new URL('tech-retail-poster.webp', destination));
execFileSync('ffmpeg', ['-hide_banner', '-y', '-i', master,
  '-vf', 'scale=1920:1080', '-c:v', 'libx264', '-preset', 'medium', '-crf', '21',
  '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', web], { stdio: 'inherit' });
execFileSync('ffmpeg', ['-hide_banner', '-y', '-ss', '2.5', '-i', master,
  '-frames:v', '1', '-vf', 'scale=1600:900', '-quality', '85', poster], { stdio: 'inherit' });
console.log(`Website video: ${web}\nPoster: ${poster}`);
