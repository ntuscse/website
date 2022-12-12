import express from "express";
import { Application } from "express";

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.routes(appInit.controllers);
    this.middlewares(appInit.middlewares);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App has started on port ${this.port}`);
    });
  }

  /* eslint-disable */
  private routes(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use(controller.path, controller.router);
    });
  }

  private middlewares(middlewares: any) {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }
  /* eslint-enable */
}

export default App;
