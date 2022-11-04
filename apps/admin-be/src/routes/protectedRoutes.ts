import { SwaggerRouter } from "koa-swagger-decorator";
import { getMerch } from "../controllers/merch";

const protectedRouter = new SwaggerRouter();

// XXX ROUTES
protectedRouter.get("/", getMerch);

export { protectedRouter };
