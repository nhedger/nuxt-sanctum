export default defineNuxtConfig({
	modules: ["../src/module"],
	devtools: { enabled: true },
	sanctum: {
		url: "http://127.0.0.1:8000",
	},
});
