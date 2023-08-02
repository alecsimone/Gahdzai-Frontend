import { CodegenConfig } from "@graphql-codegen/cli";
import { devEndpoint } from "./globalConstants";

const config: CodegenConfig = {
  schema: devEndpoint,
  documents: ["./**/*.gql.ts"],
  generates: {
    "./__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  verbose: true,
  silent: false,
  debug: true,
};

export default config;
