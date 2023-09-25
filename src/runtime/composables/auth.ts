import {
	useCookie,
	useNuxtApp,
	useRequestHeaders,
	useRouter,
	useRuntimeConfig,
	useState,
} from "#imports";
import { ofetch } from "ofetch";

export const useAuth = () => {
	const config = useRuntimeConfig().public.sanctum;
	const csrfToken = useCookie("XSRF-TOKEN", { watch: true });
	const authenticated = useState<boolean>("sanctum.authenticated", () => false);

	const sanctumFetch = ofetch.create({
		baseURL: config.url,
		credentials: "include",
		redirect: "manual",
		mode: "cors",
		headers: {
			Origin: useRequestHeaders(["host"]).host,
			Accept: "application/json",
		} as HeadersInit,
	});

	/**
	 * Refreshes the CSRF token.
	 *
	 * This method will call the CSRF endpoint and update the CSRF token.
	 *
	 * @returns The new CSRF token.
	 */
	const refreshCsrfToken = async (): Promise<string | null | undefined> => {
		await sanctumFetch(config.csrf.endpoint);
		csrfToken.value = useCookie("XSRF-TOKEN").value;
		return csrfToken.value;
	};

	/**
	 * Checks whether the user is authenticated.
	 *
	 * @returns Whether the user is authenticated.
	 */
	const check = async (): Promise<boolean> => {
		try {
			await sanctumFetch.raw(config.check.endpoint, {
				headers: {
					...useRequestHeaders(["cookie"]),
					"X-XSRF-TOKEN": csrfToken.value,
				} as HeadersInit,
			});
			authenticated.value = true;
		} catch (error) {
			authenticated.value = false;
		}
		return authenticated.value;
	};

	/**
	 * Signs the user in.
	 *
	 * This method will attempt to sign the user in by sending the provided
	 * credentials to the API's login endpoint. It will also update the user's
	 * authentication state in the store.
	 *
	 * If a redirection URL has been provided, the user will be redirected to
	 * that URL after being signed in. If no redirection URL has been provided,
	 * you are responsible for handling it yourself.
	 *
	 * @param data The credentials to use to sign the user in.
	 * @returns Whether the user was successfully signed in.
	 */
	const login = async (data: Record<string, string>): Promise<boolean> => {
		// Refresh the CSRF token before attempting to sign in.
		await refreshCsrfToken();

		try {
			// Attempt to authenticate the user.
			await sanctumFetch(config.login.endpoint, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"X-XSRF-TOKEN": csrfToken.value,
				} as HeadersInit,
			});

			// Set the user as authenticated.
			authenticated.value = true;

			// Redirect if a redirect is provided.
			if (config.login.redirectsTo) {
				useRouter().push(config.login.redirectsTo);
			}

			return true;
		} catch {
			authenticated.value = false;
			return false;
		}
	};

	/**
	 * Signs in the user out.
	 *
	 * This method will attempt to sign the user out by sending a request to
	 * the API's logout endpoint. It will also update the user's authentication
	 * state in the store.
	 *
	 * If a redirection URL has been provided, the user will be redirected to
	 * that URL after being signed out. If no redirection URL is provided to
	 * the function, the default redirection URL will be used, and if no
	 * default redirection URL is provided, no redirection will occur.
	 *
	 * @returns Whether the user was successfully signed out.
	 */
	const logout = async (redirectTo?: string): Promise<boolean> => {
		try {
			// Attempt to logout the user.
			console.log("logout", "csrf token");
			await sanctumFetch(config.logout.endpoint, {
				method: "POST",
				headers: {
					"X-XSRF-TOKEN": csrfToken.value,
				} as HeadersInit,
			});

			// Set the user as unauthenticated.
			authenticated.value = false;

			// Redirect if a redirect is provided.
			if (redirectTo ?? config.logout.redirectsTo) {
				useRouter().push(config.logout.redirectsTo);
			}

			return true;
		} catch {
			return false;
		}
	};

	return {
		check,
		login,
		logout,
		refreshCsrfToken,
		csrfToken,
		authenticated,
	};
};
