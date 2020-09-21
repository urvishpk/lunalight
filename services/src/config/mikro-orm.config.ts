import { __prod__ } from "../constants";
import { MikroORM } from "@mikro-orm/core";
import dotenv from "dotenv";
import { BaseEntity } from "../entities/BaseEntity";
import { Admin } from "../entities/Admin";

dotenv.config();

export default {
  entities: [BaseEntity, Admin],
  dbName: process.env.DB_NAME,
  clientUrl: process.env.MONGO_URL,
  type: process.env.DB_TYPE,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
