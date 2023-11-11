# nuxt-sanctum

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

The `nuxt-sanctum` package brings Laravel Sanctum support to Nuxt.

## Features

<!-- Highlight some of the features your module provide here -->

-   🚀 &nbsp;[**Universal rendering**](https://nuxt.com/docs/guide/concepts/rendering#universal-rendering)
-   🍪 &nbsp;Cookie-based authentication
-   ⚙️ &nbsp;Sensible defaults, but configurable

## Quick Setup

1. Add `@hedger/nuxt-sanctum` dependency to your project

```bash
# Using bun
bun add @hedger/nuxt-sanctum

# Using pnpm
pnpm add @hedger/nuxt-sanctum

# Using yarn
yarn add @hedger/nuxt-sanctum

# Using npm
npm install @hedger/nuxt-sanctum
```

2. Add `@hedger/nuxt-sanctum` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
	modules: ["@hedger/nuxt-sanctum"],
});
```

## Usage

The following examples should get your started. To customize the behavior, have a look a the [options](src/options.ts).

### Signing In

To sign a user in, use the `login` method exposed by the `useSanctum` composable.

```ts
const { login } = useSanctum();

await login({
	email: "john.snow@example.com",
	password: "winteriscoming",
});
```

### Signing Out

To sign a user out, use the `logout` method exposed by the `useSanctum` composable.

```ts
const { logout } = useSanctum();

await logout();
```

#### Redirecting after signing out

By default, the user will be redirected to the URL specified in the `logout.redirectsTo` option. You may override this behavior by passing an alternative URL to the `logout` method. Additionally, you may pass `false` to the `logout` method to prevent redirection altogether.

```ts
// Override the default redirect
await logout("/somewhere-else");

// Prevent redirection
await logout(false);
```

### Checking if a user is signed in

To check if a user is signed in, use the `authenticated` variable exposed by the `useSanctum` composable.

```ts
const { authenticated } = useSanctum();

if (authenticated.value) {
	// The user is signed in
}
```

### Retrieving the user's details

To retrieve the details about the currently signed in user, use the `user` variable exposed by the `useSanctum` composable.

```ts
const { user } = useSanctum();

console.log(user.value?.name) // John Snow
```

#### Type safety

You may specify the type of the user object by passing it as a generic type argument to the `useSanctum` composable.

```ts
interface User {
	id: number;
	name: string;
	email: string;
}

const { user } = useSanctum<User>();
```

### Restricting access to routes

This package provides the `auth` and `guest` middlewares to restrict access to routes.

#### Restricting to authenticated users

Use the `auth` middleware to ensure that only authenticated users can access a route. Unauthenticated users will be redirected to the URL specified in the `middlewares.auth.redirectsTo` option.

```html
<script setup lang="ts">
	definePageMeta({
		middleware: "auth",
	});
</script>
```

#### Restricting to guest users

Use the `guest` middleware to ensure that only guest users can access a route.
Authenticated users will be redirected to the URL specified in the `middlewares.guest.redirectsTo` option.

```html
<script setup lang="ts">
	definePageMeta({
		middleware: "guest",
	});
</script>
```

## Troubleshooting

### Using HTTPS in development

When your Laravel API is served over HTTPS in a development environment, SSL errors may occur due to Node.js rejecting self-signed certificates. To fix this, set `NODE_TLS_REJECT_UNAUTHORIZED` to `0` when starting your development server.

```bash
{
	"scripts": {
		"dev": "NODE_TLS_REJECT_UNAUTHORIZED=0 nuxt dev"
	}
}
```

> [!NOTE]
> Bun does not seem affected by this issue.



<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@hedger/nuxt-sanctum/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@hedger/nuxt-sanctum
[npm-downloads-src]: https://img.shields.io/npm/dm/@hedger/nuxt-sanctum.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@hedger/nuxt-sanctum
[license-src]: https://img.shields.io/npm/l/@hedger/nuxt-sanctum.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@hedger/nuxt-sanctum
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com

