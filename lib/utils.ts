import childProcess from 'node:child_process';
import { createHash } from 'node:crypto';

import { createLogger } from 'vite';

const logger = createLogger();

// https://github.com/vitejs/vite/blob/d6bde8b03d433778aaed62afc2be0630c8131908/packages/vite/src/node/utils.ts#L990C17-L990C24
export function getHash(text: globalThis.Buffer | string) {
    try {
        return createHash('sha256')
            .update(text)
            .digest('hex')
            .substring(0, 8);
    }
    catch (e) {
        logger.error(`[getHash] - Error while creating hash: ${e}`);
        return '';
    }
}

export function getGitHash() {
    try {
        return childProcess.execSync('git rev-parse --short HEAD').toString().replace('\n', '');
    }
    catch (e) {
        logger.error(`[getGitHash] - Error while getting git hash: ${e}`);
        return '';
    }
}
