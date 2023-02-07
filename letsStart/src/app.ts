import * as express from "express";
import { Cat, CatType } from "./app.model";
const app: express.Express = express();
const port: number = 8000;

const data = [1, 2, 3, 4];

app.get("/test", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send({ cats: Cat });
});

app.post("/test", (req, res) => {
  res.send({ person: "Yoon" });
});

app.listen(port, () => {
  console.log(`server in on... http://localhost:${port}`);
});
