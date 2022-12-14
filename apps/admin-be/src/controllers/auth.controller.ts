import express, { Request, Response } from "express";

// bolierplate controller file
class AuthController {
  public path = "/auth";
  public router = express.Router();

  constructor() {
    this.#initRoutes();
  }

  #initRoutes = () => {
    this.router.get("/signin", this.signin); // boilerplate, GET method for demostration purposes
  };

  // boilerplate
  signin = (req: Request, res: Response) => {
    res.status(201).send("from sign in");
  };
}

export default AuthController;
