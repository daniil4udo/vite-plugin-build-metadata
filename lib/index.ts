import type { Plugin, ResolvedConfig } from 'vite';

import childProcess from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

interface Options {
    /**
    * Name of the file where to write
    *
    * @default 'meta'
    */
    fileName?: string
}

// https://github.com/vitejs/vite/blob/632fedf87fbcb81b2400571886faf8a8b92376e4/packages/vite/src/node/utils.ts#L900
export function getHash(text: globalThis.Buffer | string): string {
    return createHash('sha256')
        .update(text)
        .digest('hex')
        .substring(0, 8);
}

export function getGitHash() {
    try {
        return childProcess.execSync('git rev-parse --short HEAD').toString().replace('\n', '');
    }
    catch {
        return null;
    }
}

export default function VitePluginBuildMetadata(options: Options = {}): Plugin {
    const {
        fileName = 'meta',
    } = options;

    let config: ResolvedConfig;

    return {
        // this name will show up in warnings and errors
        name: 'vite-plugin-build-metadata',
        apply: 'build',
        enforce: 'post',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        writeBundle: async (options, bundle) => {
            // save metadata as file
            const metaFilename = `${options.dir}/${fileName.replace(/\.[^/.]+$/, '')}.json`;

            await writeFile(metaFilename, JSON.stringify({
                buildHash: getHash(JSON.stringify(bundle)),
                commitHash: getGitHash(),
                date: new Date(),
            }));

            config.logger.info(`\n✨ [vite-plugin-build-metadata] - Hash has been created in ${fileName}.json\n`);
        },
    };
}
