import { Request, Response } from "../lib/types";

const genericInfo = {
  github: "https://github.com/ntuscse/website",
  website: "https://ntuscse.com",
  service: "Merch",
};

export const index = (req: Request, res: Response<typeof genericInfo>) => {
  res.json(genericInfo);
};

export const notFound = (req: Request, res: Response<never>) => {
  res.status(404).json({ error: "NOT_FOUND" });
};
