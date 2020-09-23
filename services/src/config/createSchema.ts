import { buildSchema } from "type-graphql";
import { AdminResolver } from "../resolvers/admin.resolver";
import { ProductResolver } from "../resolvers/product.resolver";

export default () =>
  buildSchema({
    resolvers: [AdminResolver, ProductResolver],
    validate: false,
  });
