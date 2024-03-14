export interface Options {
  /**
   * The base URL of the API.
   *
   * @example "http://localhost:8000"
   * @default "http://localhost:8000"
   */
  url?: string;

  csrf?: {
    /**
     * URL of the CSRF endpoint on the server.
     *
     * @example "/sanctum/csrf-cookie"
     * @default "/sanctum/csrf-cookie"
     */
    endpoint?: string;
  };

  check?: {
    /**
     * URL of the endpoint to check if the user is authenticated.
     *
     * @example "/api/user"
     * @default "/api/user"
     */
    endpoint?: string;

    /**
     * Make sure to always make a request to endpoint.
     *
     * @default false
     */
    always?: boolean;
  };

  login?: {
    /**
     * URL of the login endpoint on the server.
     *
     * @example "/login"
     * @default "/login"
     */
    endpoint?: string;

    /**
     * The URL to redirect to after the user has logged in.
     *
     * @example "/"
     * @default "/"
     */
    redirectsTo?: string;
  };

  logout?: {
    /**
     * URL of the logout endpoint on the server.
     *
     * @example "/logout"
     * @default "/logout"
     */
    endpoint?: string;

    /**
     * The URL to redirect to after the user has logged out.
     *
     * @example "/login"
     * @default "/login"
     */
    redirectsTo?: string;
  };

  middlewares?: {
    /**
     * Check middleware options.
     */
    check?: {
      /**
       * The name of the middleware.
       *
       * You may change this if you already have a middleware with the same name.
       *
       * @default "sanctum.check"
       */
      name?: string;
    };

    /**
     * Auth middleware options
     */
    auth?: {
      /**
       * The name of the middleware.
       *
       * You may change this if you already have a middleware with the same name.
       *
       * @default "auth"
       */
      name?: string;

      /**
       * The URL to redirect to when an unauthenticated user tries to access
       * a page that requires authentication.
       *
       * @default "/login"
       * @example "/login"
       */
      redirectsTo?: string;
    };

    /**
     * Guest middleware options.
     */
    guest?: {
      /**
       * The name of the middleware.
       *
       * You may change this if you already have a middleware with the same name.
       *
       * @default "guest"
       */
      name?: string;

      /**
       * The URL to redirect to when an authenticated user tries to access
       * a page that should only be accessible to guests.
       *
       * @default "/"
       * @example "/"
       */
      redirectsTo?: string;
    };
  };
}

/**
 * The default module options.
 */
export const defaultOptions: Options = {
  url: "http://localhost:8000",
  csrf: {
    endpoint: "/sanctum/csrf-cookie",
  },
  check: {
    endpoint: "/api/user",
  },
  login: {
    endpoint: "/login",
    redirectsTo: "/",
  },
  logout: {
    endpoint: "/logout",
    redirectsTo: "/login",
  },
  middlewares: {
    check: {
      name: "sanctum.check",
    },
    auth: {
      name: "auth",
      redirectsTo: "/login",
    },
    guest: {
      name: "guest",
      redirectsTo: "/",
    },
  },
};
