import type { MetaData, PluginOptions } from './types';
import type { Plugin, ResolvedConfig } from 'vite';

import { writeFile } from 'node:fs/promises';
import { parse } from 'node:path/posix';

import { getGitHash, getHash } from './utils';

export default function VitePluginBuildMetaData(opts: PluginOptions = {}): Plugin {
    const {
        fileName = 'meta',
    } = opts;

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
            const metaFilename = `${options.dir}/${parse(fileName).name}.json`;
            const metaData: MetaData = {
                buildHash: getHash(JSON.stringify(bundle)),
                commitHash: getGitHash(),
                date: new Date().toJSON(),
            };

            await writeFile(
                metaFilename,
                JSON.stringify(metaData, null, 2),
            );

            config.logger.info(`\n✨ [vite-plugin-build-metadata] - Hash has been created in ${fileName}.json\n`);
        },
    };
}

export { getGitHash, getHash, VitePluginBuildMetaData };
