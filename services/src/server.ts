import "reflect-metadata";
import fs from "fs";
import https from "https";
import http from "http";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import codes from "./constants/codes.json";
import mikroConfig from "./config/mikro-orm.config";
import { MikroContext } from "./types";
import { createSchema } from "./config/createSchema";
import corsConfig from "./config/cors.config";
import sessionConfig from "./config/session.config";

dotenv.config();

let app: express.Application;
let appStarted: boolean = false;

export const initServer = async () => {
  if (appStarted) return app;
  const orm = await MikroORM.init(mikroConfig);
  app = express();
  app.use(corsConfig);
  app.use(sessionConfig);
  app.get("/", (_, res) => res.send(codes.SERVER.message));
  configureAppListener(app);
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }): MikroContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  appStarted = true;
  return app;
};

const configureAppListener = (expressApp: express.Application) => {
  if (__prod__) {
    const key = fs.readFileSync(process.env.SSL_KEY!, "utf8");
    const cert = fs.readFileSync(process.env.SSL_CERT!, "utf8");
    const ca = fs.readFileSync(process.env.SSL_CHAIN!, "utf8");
    const credentials = { key, cert, ca };
    https.createServer(credentials, expressApp).listen(443, () => {
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
    expressApp.listen(process.env.SERVER_PORT);
  }
};

initServer();
