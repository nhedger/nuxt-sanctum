import { defineNuxtRouteMiddleware, useNuxtApp } from "#imports";
import { useSanctum } from "../composables/sanctum";

/**
 * Check Middleware
 *
 * The check middleware is used to check if the user is authenticated
 * by performing a request to the user endpoint.
 */
export const check = defineNuxtRouteMiddleware(async (to, from) => {
	const { authenticated, check: authCheck } = useSanctum();

	// If the user is already considered authenticated, we don't need to
	// run the check. If by chance the user is not actually authenticated,
	// the next request to the server will return an error that we will
	// catch and reset the authenticated state.
	if (authenticated.value === true) {
		return;
	}

	// On initial load, there is not need to run the check middleware if
	// the application is server rendered. This is because the server will
	// already have performed the check and set the authenticated state.
	const nuxtApp = useNuxtApp();
	if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
		return;
	}

	await authCheck();
});
