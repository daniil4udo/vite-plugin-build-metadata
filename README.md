<h2 align='center'><samp>vite-plugin-build-metadata</samp></h2>

<p align='center'>Create Vite build meta</p>

<p align='center'>
<a href='https://www.npmjs.com/package/vite-plugin-build-metadata'>
<img src='https://img.shields.io/npm/v/vite-plugin-build-metadata?color=222&style=flat-square'>
</a>
</p>

<br>

## 💙 SPECIAL SPONSOR

<!--special start-->

<p align="center">
  <a href="https://www.democrance.com" target="_blank">
    <img width="260px" src="https://www.democrance.com/wp-content/uploads/2021/11/democrance_new_logo_1200dpi.png">
  </a>
</p>

## Usage

### Installation

Install the vite-plugin-build-metadata package as a development dependency using pnpm:

```bash
pnpm i vite-plugin-build-metadata -D
```

## Configuration

Add the plugin to your `vite.config.js` file:

```ts
// vite.config.js
import VitePluginBuildMetadata from 'vite-plugin-build-metadata';

export default {
  plugins: [
    VitePluginBuildMetadata(),
  ],
};
```

Once the plugin is installed and configured, it will generate a file in the root build directory (default filename: meta.json) after each build. This file will contain the following information:

```json
{
  "buildHash": "GENERATED_BUILD_HASH",
  "commitHash": "LAST_COMMIT_HASH",
  "date": "BUILD_DATE"
}
```

You can customize the filename by passing an options object to the VitePluginBuildMetadata constructor:

```ts
// vite.config.js
import VitePluginBuildMetadata from 'vite-plugin-build-metadata';

export default {
  plugins: [
    VitePluginBuildMetadata({ filename: 'custom-meta.json' }), // or without .json extension
  ],
};
```

## Motivation

The `vite-plugin-build-metadata` plugin provides a way to determine the relevance of the deployed version of a frontend application. By including build and commit hashes, as well as the build date, in the generated metadata file, you can easily track and verify the version of your application in production.

This information can be useful in various scenarios, such as:

- Ensuring that the correct version of the application is deployed in production environments.
- Debugging issues by identifying the specific build and commit associated with a deployed version.
- Comparing different builds to track changes and assess their impact.

Including build metadata in your frontend builds adds an extra layer of transparency and accountability to your development process.

## License

MIT License © 2021 [Daniil Chumachenko](https://github.com/daniil4udo)
