type CraftGlobal = {
  csrfTokenValue?: string;
};

const getCraftCsrfToken = (): string | null => {
  const craft = (window as typeof window & { Craft?: CraftGlobal }).Craft;

  if (!craft?.csrfTokenValue) {
    return null;
  }

  return craft.csrfTokenValue;
};

const shouldAttachCsrf = (method?: string): boolean => {
  if (!method) {
    return false;
  }

  const normalizedMethod = method.toUpperCase();

  return !["GET", "HEAD", "OPTIONS"].includes(normalizedMethod);
};

export const craftFetch = (input: RequestInfo | URL, init: RequestInit = {}) => {
  const headers = new Headers(init.headers);

  if (shouldAttachCsrf(init.method)) {
    const csrfToken = getCraftCsrfToken();
    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }
  }

  return fetch(input, {
    ...init,
    credentials: init.credentials ?? "same-origin",
    headers,
  });
};
