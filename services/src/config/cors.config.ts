import dotenv from "dotenv";
import cors from "cors";
import { __prod__ } from "../constants";

dotenv.config();

const origin = __prod__ ? process.env.CLIENT_URL : process.env.CLIENT_DEV_URL;
export default cors({
  origin,
  credentials: true,
});
