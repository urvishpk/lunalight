import { ApolloClient, InMemoryCache } from "@apollo/client";
import { __prod__ } from "../constants";

const uri = __prod__
  ? process.env.REACT_APP_PROD_SERVER_URI
  : process.env.REACT_APP_LOCALHOST_URI;
export const apolloClient = new ApolloClient({
  uri,
  credentials: "include",
  cache: new InMemoryCache(),
});
