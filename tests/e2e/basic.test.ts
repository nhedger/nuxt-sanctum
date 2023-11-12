import { test, expect } from "@playwright/test";

test("unauthenticated users can login with correct credentials", async ({ page }) => {
	await page.goto("/login");

	await page.getByTestId("email").fill("test@example.com");
    await page.getByTestId("password").fill("password");
    await page.getByTestId("submit").click();

    await expect(page).toHaveURL("/");
});

test("unauthenticated users cannot login with incorrect credentials", async ({ page }) => {
	await page.goto("/login");

	await page.getByTestId("email").fill("test@example.com");
    await page.getByTestId("password").fill("incorrect");
    await page.getByTestId("submit").click();

    await expect(page).toHaveURL("/login");
});

test("unauthenticated users can access pages that have the guest middleware", async ({ page }) => {
	await page.goto("/login");

	await expect(page).toHaveURL("/login");
});

test("unauthenticated users cannot access pages that have the auth middleware", async ({ page }) => {
	await page.goto("/");

	await expect(page).not.toHaveURL("/");
});




