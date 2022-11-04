# Node - Express - Typescript admin backend server

## Getting Started

- Clone the repository

```
git clone https://github.com/ntuscse/website.git
```

- Install dependencies

```
cd ./apps/admin-be
yarn install
```

- Run the project directly in TS

```
yarn devStart
```

- Build and run the project in JS

```
yarn build
yarn start
```

- Run tests

```
yarn test
```

## Running ESLint

```
yarn build   // runs full build including ESLint format check
yarn lint    // runs ESLint check + fix
```

## Design

### Project File Structure

- The project is written in Typescript. After Typescript compiles, all subsequently built javascript files are in `/dist`
- The entry point for the server is `src/index.ts`
- Program flow: `index` --> `routes` --> `controllers` --> `services` --> `entities`
- Custom Middlewares are in the `src/middleware` folder
- Custom types for Typescript Types are in `src/types`
- Modeling and schemas are in `src/models`
- Tests are in the `tests` folder
