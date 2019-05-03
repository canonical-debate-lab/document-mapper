import { checkLocalStorage } from "../utils/localStorage";

export const useAuth = () => {
  const authStorage = checkLocalStorage("auth", null);
  const auth = authStorage ? JSON.parse(authStorage) : null;
  return {
    auth
  };
};
