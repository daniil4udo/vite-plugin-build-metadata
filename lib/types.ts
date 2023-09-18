export interface PluginOptions {
    /**
     * Name of the file where to write
     *
     * @default 'meta'
     */
    fileName?: string
}

export interface MetaData {
    /**
     * Hash of the OutputBundle from writeBundle hook that Vite produces
     *
     * Using getHash() function from Vite source code
     * https://github.com/vitejs/vite/blob/632fedf87fbcb81b2400571886faf8a8b92376e4/packages/vite/src/node/utils.ts#L900
     */
    buildHash: string
    /**
     * Git commit hash
     */
    commitHash: string | null
    /**
     * Date of build
     */
    date: string
}
