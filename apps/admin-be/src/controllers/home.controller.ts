import express, { Request, Response } from "express";

// bolierplate controller file
class HomeController {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.#initRoutes();
  }

  #initRoutes = () => {
    this.router.get("/", this.home);
  };

  // boilerplate
  home = (req: Request, res: Response) => {
    res.send("Success");
  };
}

export default HomeController;
