import {
	addImports,
	addPlugin,
	createResolver,
	defineNuxtModule,
} from "@nuxt/kit";
import { defu } from "defu";
import { type Options, defaultOptions } from "./options";

export default defineNuxtModule<Options>({
	meta: {
		name: "@hedger/nuxt-sanctum",
		configKey: "sanctum",
		compatibility: {
			nuxt: "^3.0.0",
		},
	},
	defaults: defaultOptions,
	setup(options, nuxt) {
		// Expose module options to the runtime
		nuxt.options.runtimeConfig.public.sanctum = defu(
			nuxt.options.runtimeConfig.public.sanctum,
			{ ...options },
		);

		// Create resolver to resolve relative paths
		const { resolve } = createResolver(import.meta.url);

		// Add runtime plugin
		addPlugin(resolve("./runtime/plugin"));

		// Register auth composable
		addImports({
			name: "useSanctum",
			as: "useSanctum",
			from: resolve("runtime/composables/sanctum"),
		});

		// Register fetch composable
		addImports({
			name: "useSanctumFetch",
			as: "useSanctumFetch",
			from: resolve("runtime/composables/fetch"),
		});
	},
});
