import { merge } from "lodash";
import user from "./user";

const rootResolvers = {
  Query: {}
};

const resolvers = merge(rootResolvers, user);

export default resolvers;
