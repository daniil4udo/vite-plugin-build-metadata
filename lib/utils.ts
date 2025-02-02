import childProcess from 'node:child_process';
import crypto from 'node:crypto';

import { createLogger } from 'vite';

const logger = createLogger();

const hash
  // eslint-disable-next-line n/no-unsupported-features/node-builtins -- crypto.hash is supported in Node 21.7.0+, 20.12.0+
  = crypto.hash
      ?? ((
          algorithm: string,
          data: crypto.BinaryLike,
          outputEncoding: crypto.BinaryToTextEncoding,
      ) => crypto.createHash(algorithm).update(data).digest(outputEncoding));

export function getHash(text: Buffer | string, length = 8): string {
    try {
        const h = hash('sha256', text, 'hex').substring(0, length);
        if (length <= 64)
            return h;
        return h.padEnd(length, '_');
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
