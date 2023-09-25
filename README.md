# nuxt-sanctum

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

The `nuxt-sanctum` package brings Laravel Sanctum support to Nuxt.

## Features

<!-- Highlight some of the features your module provide here -->
- 🚀 &nbsp;**SPA** and **SSR** support.
- 🍪 &nbsp;**Cookie**-based authentication.
- 🌲 &nbsp;Sensible defaults, but configurable.

## Quick Setup

1. Add `@nhedger/nuxt-sanctum` dependency to your project

```bash
# Using pnpm
pnpm add -D @hedger/nuxt-sanctum

# Using yarn
yarn add --dev @hedger/nuxt-sanctum

# Using npm
npm install --save-dev @hedger/nuxt-sanctum
```

2. Add `@hedger/nuxt-sanctum` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@hedger/nuxt-sanctum'
  ]
})
```


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@hedger/nuxt-sanctum/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@hedger/nuxt-sanctum

[npm-downloads-src]: https://img.shields.io/npm/dm/@hedger/nuxt-sanctum.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@hedger/nuxt-sanctum

[license-src]: https://img.shields.io/npm/l/@hedger/nuxt-sanctum.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@hedger/nuxt-sanctum

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
