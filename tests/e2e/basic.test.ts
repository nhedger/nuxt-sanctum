import { test, expect } from "@playwright/test";

test("unauthenticated user can login with correct credentials", async ({ page }) => {
	await page.goto("/login");

	await page.getByTestId("email").fill("test@example.com");
    await page.getByTestId("password").fill("password");
    await page.getByTestId("submit").click();

    await expect(page).toHaveURL("/");
});

test("unauthenticated user cannot login with incorrect credentials", async ({ page }) => {
	await page.goto("/login");

	await page.getByTestId("email").fill("test@example.com");
    await page.getByTestId("password").fill("incorrect");
    await page.getByTestId("submit").click();

    await expect(page).toHaveURL("/login");
});

test("unauthenticated users cannot access the home page", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveURL("/login");
});

test("unauthenticated user can access the login page", async ({ page }) => {
	await page.goto("/login");
	expect(await page.getByRole("heading", { name: "Login" }).textContent()).toBe(
		"Login",
	);
});

