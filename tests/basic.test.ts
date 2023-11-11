import { fileURLToPath } from "node:url";
import {
	ChildProcessWithoutNullStreams,
	spawn,
	spawnSync,
} from "node:child_process";
import { describe, test, beforeAll, afterAll } from "vitest";
import { expect } from '@playwright/test';
import { setup, createPage, useTestContext } from "@nuxt/test-utils";

describe("ssr", async () => {
	await setup({
		rootDir: fileURLToPath(
			new URL("./fixtures/nuxt-app/server-side-rendering", import.meta.url),
		),
		browser: true,
	});

	let laravel: ChildProcessWithoutNullStreams;

	beforeAll(async () => {
		spawnSync("php", ["artisan", "migrate:fresh", "--seed"], {
			cwd: fileURLToPath(new URL("./fixtures/laravel-api", import.meta.url)),
		});
		laravel = spawn("php", ["artisan", "serve"], {
			detached: true,
			cwd: fileURLToPath(new URL("./fixtures/laravel-api", import.meta.url)),
		});
	});

	afterAll(async () => {
		laravel.kill('SIGKILL');
	});

	test("unauthenticated users are redirected to the login page", async () => {
		const page = await createPage("/");
		const { url, nuxt } = useTestContext();
		const unauthenticatedURL =
			nuxt?.options.runtimeConfig.public.sanctum.middlewares.auth.redirectsTo.replace(/^\/+/,'');
		expect(page.url()).toBe(`${url}/${unauthenticatedURL}`);
	});

	test("unauthenticated users can access the login page", async () => {
		const page = await createPage("/login");
		const { url, nuxt } = useTestContext();
		const unauthenticatedURL =
			nuxt?.options.runtimeConfig.public.sanctum.middlewares.auth.redirectsTo.replace(/^\/+/,'');
		expect(page.url()).toBe(`${url}/${unauthenticatedURL}`);
	});

	test("authenticated users can access the home page", async () => {
		const page = await createPage("/login");

		const { url, browser } = useTestContext();

		await page.getByTestId('email').fill("test@example.com");
		await page.getByTestId('password').fill("password");
		await page.getByTestId('submit').click();
		await page.waitForTimeout(5000);
		
		await expect(page).toHaveURL(`${url}/`);
	}, {
		timeout: 20000,
	});
});
