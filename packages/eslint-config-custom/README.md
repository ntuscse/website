# eslint-config-custom

Custom ESLint config for SCSE Club projects

## Usage

In the package.json file in your app/package add the following:

```json5
{ 
  // ...
  "devDependencies": {
    // ...
    "eslint-config-custom": "*",
    // ...
  }
}
```

Then in your app/package's root directory (same level as the package.json file), create a file called `.eslintrc.json` and add the following:

```javascript
module.exports = {
  root: true,
  extends: ["custom"],
};

```

Finally, run `yarn install` to install the dependency.


