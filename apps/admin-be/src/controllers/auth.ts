import { BaseContext } from "koa";

const loginUser = async (ctx: BaseContext): Promise<void> => {
  ctx.body = "login user";
};

export { loginUser };
