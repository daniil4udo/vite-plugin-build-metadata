<h2 align='center'><samp>vite-plugin-build-metadata</samp></h2>

<p align='center'>Create Vite build meta</p>

<p align='center'>
<a href='https://www.npmjs.com/package/vite-plugin-build-metadata'>
<img src='https://img.shields.io/npm/v/vite-plugin-build-metadata?color=222&style=flat-square'>
</a>
</p>

<br>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/daniil4udo/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/daniil4udo/static/sponsors.svg'/>
  </a>
</p>

<br>

## Usage

Install

```bash
pnpm i vite-plugin-build-metadata -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import VitePluginBuildMetadata from 'vite-plugin-build-metadata'

export default {
    plugins: [
        VitePluginBuildMetadata({
            fileName: 'build-meta.json',
        }),
    ],
}
```

After the build, file will be created in the root build directory under specified file name (`meta.json` by default)

Exaple of the created file:

```json
{
  "buildHash": "GENERATED_BUILD_HASH",
  "commitHash": "LAST_COMMIT_HASH",
  "date": "BUILD_DATE"
}
```

## Motivation

Find out if deployed version of a frontend is relevant,

## License

MIT License © 2021 [Daniil Chumachenko](https://github.com/daniil4udo)
