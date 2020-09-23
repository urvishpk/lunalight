import dotenv from "dotenv";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "../constants";
import { BaseEntity } from "../entities/BaseEntity";
import { Admin } from "../entities/Admin";
import { Product } from "../entities/Product";

dotenv.config();

export default {
  entities: [BaseEntity, Admin, Product],
  dbName: process.env.DB_NAME,
  clientUrl: process.env.MONGO_URL,
  type: process.env.DB_TYPE,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
