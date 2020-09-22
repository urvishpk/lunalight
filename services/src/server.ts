import "reflect-metadata";
import fs from "fs";
import https from "https";
import http from "http";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import codes from "./constants/codes.json";
import mikroConfig from "./config/mikro-orm.config";
import { MikroContext } from "./types";
import { createSchema } from "./config/createSchema";

dotenv.config();

let app: express.Application;
let appStarted: boolean = false;

export const initServer = async () => {
  if (appStarted) return app;
  const orm = await MikroORM.init(mikroConfig);
  app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  const origin = __prod__ ? process.env.CLIENT_URL : process.env.CLIENT_DEV_URL;
  app.use(
    cors({
      origin,
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: !__prod__,
        sameSite: __prod__ ? "none" : "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET!,
      resave: false,
    })
  );
  app.get("/", (_, res) => res.send(codes.SERVER.message));
  if (__prod__) {
    const key = fs.readFileSync(process.env.SSL_KEY!, "utf8");
    const cert = fs.readFileSync(process.env.SSL_CERT!, "utf8");
    const ca = fs.readFileSync(process.env.SSL_CHAIN!, "utf8");
    const credentials = { key, cert, ca };
    https.createServer(credentials, app).listen(443, () => {
      console.log("HTTPS Server running on port 443");
    });
    http
      .createServer((req, res) => {
        res.writeHead(301, {
          Location: "https://" + req.headers["host"] + req.url,
        });
        res.end();
      })
      .listen(80);
  } else {
    app.listen(process.env.SERVER_PORT);
  }
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }): MikroContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  appStarted = true;
  return app;
};

//initServer();
