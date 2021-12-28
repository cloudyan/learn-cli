import { fileURLToPath } from 'url';
import { dirname } from 'path';

// https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
