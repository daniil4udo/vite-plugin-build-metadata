import type { MetaData, PluginOptions } from './types';
import type { Plugin, ResolvedConfig } from 'vite';

import { writeFile } from 'node:fs/promises';
import { parse } from 'node:path/posix';

import { getGitHash, getHash } from './utils';

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
