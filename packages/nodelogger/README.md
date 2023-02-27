# nodelogger

This package allows for easy console logging of nodejs applications.

## Setup

Add the following to your app's package.json:
```json5
{
  "dependencies": {
    // ...
    "nodelogger": "*"
    // ...
  }
}
```

Add the nodelogger middleware to ur express app:

```typescript
// server.js

import { nodeloggerMiddleware } from "nodelogger"

...

app.use(morganMiddleware)

```

## Usage

```typescript
import { Logger } from "nodelogger"

// ...

Logger.error("Hello World")
Logger.warn("Hello World")
Logger.info("Hello World")
Logger.http("Hello World")
Logger.debug("Hello World")

```
