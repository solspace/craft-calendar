const isDevEnvironment = process.env.NODE_ENV === "development";

export const isDebugMode = () => {
  if (!isDevEnvironment) {
    return false;
  }

  if (typeof window === "undefined") {
    return false;
  }

  return new URLSearchParams(window.location.search).get("debug") === "1";
};
