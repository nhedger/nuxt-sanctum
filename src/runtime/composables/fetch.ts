import type { UseFetchOptions } from "#app";
import {
	useCookie,
	useFetch,
	useRequestHeaders,
	useRuntimeConfig,
	useSanctum,
} from "#imports";
import { defu } from "defu";
import { parse, splitCookiesString } from "set-cookie-parser-es";

export const useSanctumFetch = <T>(
	url: string | (() => string),
	options?: UseFetchOptions<T>,
) => {
	const { csrfToken } = useSanctum();
	const config = useRuntimeConfig().public.sanctum;

	const defaults: UseFetchOptions<T> = {
		baseURL: config.url,
		mode: "cors",
		redirect: "manual",
		credentials: "include",
		key: typeof url === "string" ? url : url(),
		headers: {
			...(process.server ? useRequestHeaders(["cookie"]) : {}),
			...(csrfToken.value && { "X-XSRF-TOKEN": csrfToken.value }),
		} as HeadersInit,
		onResponse: (response) => {
			if (process.server) {
				const split = splitCookiesString(
					response.response.headers.get("set-cookie") ?? "",
				);
				const cookies = parse(split);
				csrfToken.value = cookies.find(
					(cookie) => cookie.name === "XSRF-TOKEN",
				)?.value;
			}

			if (process.client) {
				csrfToken.value = useCookie("XSRF-TOKEN").value;
			}
		},
	};

	const params = defu(options, defaults);

	return useFetch(url, params);
};
