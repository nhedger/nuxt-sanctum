import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "tests/e2e",
	use: {
		baseURL: "http://localhost:3000",
		trace: "on",
	},
	webServer: [
        {
            command: "composer --no-interaction install && touch database/database.sqlite && php artisan migrate:fresh --seed  && php artisan serve --host=localhost --port=8000",
            cwd: "./tests/fixtures/laravel-api",
            url: "http://localhost:8000",
        },
		{
			command: "pnpm install && pnpm build && pnpm dev",
            cwd: "./tests/fixtures/nuxt-app",
			url: "http://localhost:3000",
		},
	],
});
