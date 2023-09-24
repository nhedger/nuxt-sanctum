import { defineNuxtRouteMiddleware, useRuntimeConfig } from "#imports";
import { useAuth } from "../composables/auth";

/**
 * Auth Middleware
 *
 * The auth middleware is used to protect routes that require authentication.
 */
export const auth = defineNuxtRouteMiddleware(async (to, from) => {
	const config = useRuntimeConfig().public.sanctum;

	// If the user is not authenticated, redirect to the unauthenticated page.
	if (!useAuth().authenticated.value) {
		return config.middlewares.auth.redirectsTo;
	}
});
