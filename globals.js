import path from 'path';
import { fileURLToPath } from 'url';

const __filename = await (async () => {
    return fileURLToPath(import.meta.url);
})();

const serverDirname = path.dirname(__filename);

export { serverDirname }