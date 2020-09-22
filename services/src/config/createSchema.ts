import { buildSchema } from "type-graphql";
import { AdminResolver } from "../resolvers/admin.resolver";
import { ProductResolver } from "../resolvers/product.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [AdminResolver, ProductResolver],
    validate: false,
  });
