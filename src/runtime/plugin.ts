import { addRouteMiddleware, defineNuxtPlugin, useRuntimeConfig } from "#app";
import { auth } from "./middlewares/auth";
import { guest } from "./middlewares/guest";

export default defineNuxtPlugin(async () => {
	const config = useRuntimeConfig().public.sanctum;

	// Register middlewares
	addRouteMiddleware(config.middlewares.auth.name, auth);
	addRouteMiddleware(config.middlewares.guest.name, guest);
});
