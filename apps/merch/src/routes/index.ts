import { JSONResponse, Request } from "../lib/types";

const genericInfo = {
  github: "https://github.com/ntuscse/website",
  website: "https://ntuscse.com",
  service: "Merch",
};

export const index = (req: Request, res: JSONResponse<typeof genericInfo>) => {
  res.json(genericInfo);
};

export const notFound = (req: Request, res: JSONResponse<never>) => {
  res.status(404).json({ error: "NOT_FOUND" });
};
