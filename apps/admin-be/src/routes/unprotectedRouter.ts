import { SwaggerRouter } from "koa-swagger-decorator";
import { loginUser } from "../controllers/auth";

const unprotectedRouter = new SwaggerRouter();

// Auth
unprotectedRouter.get("/login", loginUser);

export { unprotectedRouter };
