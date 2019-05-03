import { checkLocalStorage } from "../utils/localStorage";

export const toQueryParams = (args: { [x: string]: any }) => {
  const params: string[] = [];

  Object.keys(args).forEach(key => {
    const value = args[key];

    if (typeof value === "undefined" || value === null) return;

    if (value && typeof value === "object") {
      Object.keys(value).forEach(subkey => {
        params.push(`${key}[]=${encodeURIComponent(args[key][subkey])}`);
      });
    } else {
      params.push(`${key}=${encodeURIComponent(args[key])}`);
    }
  });

  return params.join("&");
};

export const isAuth = () => {
  const authStorage = checkLocalStorage("auth", null);
  console.log(authStorage);
  return authStorage ? JSON.parse(authStorage) : null;
};
