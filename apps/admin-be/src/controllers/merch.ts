import { BaseContext } from "koa";

const getMerch = async (ctx: BaseContext): Promise<void> => {
  ctx.body = "get merch";
};

export { getMerch };
