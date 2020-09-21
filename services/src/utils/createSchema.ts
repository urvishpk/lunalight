import { buildSchema } from "type-graphql";
import { AdminResolver } from "../resolvers/admin.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [AdminResolver],
    validate: false,
  });
