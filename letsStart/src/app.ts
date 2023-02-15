import * as express from "express";
import catRouter from "./cats/cats.route";

const app: express.Express = express();
const port: number = 8000;
class Server {
  public app: express.Application;
  constructor() {
    const app: express.Application = express();
    this.app = app;
  }
  private setRoute() {
    this.app.use(catRouter);
  }
  private setMiddleware() {
    //* looging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middleware");
      next();
    });
    //*JSON middleware
    this.app.use(express.json());

    this.setRoute();
    //* 404 middleware
    this.app.use((req, res, next) => {
      console.log("this is logging middleware");
      res.send({ error: "404 not fond error" });
    });
  }
  public listen() {
    this.setMiddleware();
    this.app.listen(port, () => {
      console.log(`server in on... http://localhost:${port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}
init();
