import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { protectedRouter } from "./routes/protectedRoutes";
import { unprotectedRouter } from "./routes/unprotectedRouter";

const app = new Koa();

// Enable bodyParser with default options
app.use(bodyParser());

// these routes are NOT protected by whatever aws cognito returns (jwt)
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

// auth here
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

app.listen(3000);
