import { defineNuxtRouteMiddleware, useRuntimeConfig } from "#imports";
import { useSanctum } from "../composables/sanctum";

/**
 * Auth Middleware
 *
 * The auth middleware is used to protect routes that require authentication.
 */
export const auth = defineNuxtRouteMiddleware(async () => {
	const { authenticated, check } = useSanctum();
	const config = useRuntimeConfig().public.sanctum;

	// Because we know the last authenticated state, we can use it to determine
	// if we should make a request to the server to check if the user is still
	// authenticated.
	if (authenticated.value || (await check())) {
		return;
	}

	return config.middlewares.auth.redirectsTo;
});
