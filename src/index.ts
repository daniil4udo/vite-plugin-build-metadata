import type { Plugin, ResolvedConfig } from 'vite'

interface Options {
    /**
   * Name of the file where to write
   *
   * @default 'meta.json'
   */
    fileName?: string;
}

function VitePluginBuildMetadata(options: Options = {}): Plugin {
    const {
        fileName = 'meta',
    } = options

    const root = process.cwd()
    let config: ResolvedConfig

    return {
        name: `vite-plugin-build-metadata:${i++}`,
        apply: 'serve',
        config(c) {
            if (!enableGlob)
                return
            if (!c.server)
                c.server = {}
            if (!c.server.watch)
                c.server.watch = {}
            c.server.watch.disableGlobbing = false
        },
        configResolved(config) {
            // famous last words, but this *appears* to always be an absolute path
            // with all slashes normalized to forward slashes `/`. this is compatible
            // with path.posix.join, so we can use it to make an absolute path glob
            config = config
        },
    }
}

export default VitePluginBuildMetadata
