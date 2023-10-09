# NTU School of Computer Science and Engineering Club Website

This monorepo contains the source code for the website of the School of Computer Science and Engineering Club (SCSE
Club) at Nanyang Technological University (NTU), along with related applications and packages.

This repo uses turborepo to manage the monorepo. You can find more information about turborepo at https://turborepo.com

## Apps

- [cms](./apps/cms/README.md): The CMS & Admin Panel for the SCSE Club website
- [merch](./apps/merch/README.md): Backend for the merchandise store for the SCSE Club
- [web](./apps/web/README.md): The SCSE Club website, built with Next.js

## Packages

- [eslint-custom-config](./packages/eslint-custom-config/README.md): Custom ESLint config for SCSE Club projects
- [nodelogger](./packages/nodelogger/README.md): A simple logger for Node.js
- [schemas](./packages/schemas/README.md): Schemas for SCSE Club projects
- [tsconfig](./packages/tsconfig/README.md): Custom TypeScript config for SCSE Club projects
- [types](./packages/types/README.md): Types for SCSE Club projects
- [ui](./packages/ui/README.md): UI components for SCSE Club projects

## Scripts

- `yarn dev`: Run the development servers
- `yarn build`: Build the production bundles
- `yarn lint`: Lint the codebase with eslint
- `yarn format`: Format the codebase with prettier
- `yarn test`: Run unit tests
- `yarn cypress`: Run end-to-end tests

You can view all the scripts in the root `package.json` file.

## License

Apache-2.0
