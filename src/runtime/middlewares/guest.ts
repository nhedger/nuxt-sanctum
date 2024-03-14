import { defineNuxtRouteMiddleware, useRuntimeConfig } from "#imports";
import { useSanctum } from "../composables/sanctum";

/**
 * Guest Middleware
 *
 * The guest middleware is used to protect routes that should only be accessible
 * to guests. Authenticated users will be redirected to the home page.
 */
export const guest = defineNuxtRouteMiddleware(async (to, from) => {
  const { authenticated, check } = useSanctum();

  const config = useRuntimeConfig().public.sanctum;

  let checkAuth = false;
  if (config.check.always) {
    checkAuth = await check();
  }

  // If the user is authenticated, redirect to the authenticated page.
  if (authenticated.value || checkAuth) {
    return config.middlewares.guest.redirectsTo;
  }
});
