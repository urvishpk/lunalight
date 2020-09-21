const schemaURI =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_SERVER_URI
    : process.env.REACT_APP_LOCALHOST_URI;

module.exports = {
  schema: [
    {
      [schemaURI]: {},
    },
  ],
  documents: ["src/graphql/**/*.graphql"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
