# Schemas

This package contains schemas for SCSE Club projects.

## Usage

In the package.json file in your app/package add the following:

```json5
{ 
  // ...
  "devDependencies": {
    // ...
    "schemas": "*",
    // ...
  }
}
```

Then use the schemas in your app/package's codebase as follows:

```typescript
import { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'src/packages/schemas/lib/cms.graphql',
  // ...
};
export default config;
```

### CMS - GraphQL

In the `apps/cms` directory, run `yarn generate:graphQLSchema` to generate the GraphQL schema.


