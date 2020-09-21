import { Connection, IDatabaseDriver, EntityManager } from "@mikro-orm/core";
import { Request, Response } from "express";

export type MikroContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req?: Request;
  res?: Response;
};

export type Code = {
  success: boolean;
  message: string;
};
