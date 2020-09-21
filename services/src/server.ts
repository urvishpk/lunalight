import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import codes from "./constants/codes.json";
import mikroConfig from "./config/mikro-orm.config";
import { createSchema } from "./utils/createSchema";
import { MikroContext } from "./types";
import cors from "cors";

dotenv.config();

let app: express.Application;
let appStarted: boolean = false;

export const initServer = async () => {
  if (appStarted) return app;
  const orm = await MikroORM.init(mikroConfig);
  app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "secret",
      resave: false,
    })
  );
  app.get("/", (_, res) => res.send(codes.SERVER.message));
  app.listen(process.env.SERVER_PORT);
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }): MikroContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  appStarted = true;
  return app;
};

initServer();
