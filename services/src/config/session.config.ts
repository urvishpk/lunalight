import dotenv from "dotenv";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "../constants";

dotenv.config();

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

export default session({
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
});
