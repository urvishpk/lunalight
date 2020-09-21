export const __prod__ = process.env.NODE_ENV === "production";

export const regex = {
  USERNAME: /^[a-zA-Z0-9_]*$/,
  NAME: /^[a-zA-Z ,.'-]+$/i,
  PHONE: /\d{10}/,
  PINCODE: /\d{6}/,
  CITY: /^[a-zA-Z- ']+$/,
  STATE: /^[a-zA-Z- ]+$/,
  COUNTRY: /^[a-zA-Z ]+$/,
  WHOLE_NUMBER: /^[0-9]*$/gm,
  DECIMAL: /^\d*(\.)?\d+$/gm,
  EMAIL: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
};

export const COOKIE_NAME = "qid";
