import * as jwt from "jsonwebtoken";
import { JWT_KEY } from "./constants";

export function getUser(request: any) {
  const Authorization = request.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const user = jwt.verify(token, JWT_KEY);
    return {
      user,
      token
    };
  }

  return {
    user: {},
    token: ""
  };
}
