import * as express from "express";
import { Cat, CatType } from "./app.model";
const app: express.Express = express();
const port: number = 8000;

const data = [1, 2, 3, 4];

app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

app.get("/test", (req: express.Request, res: express.Response) => {
  console.log(req.rawHeaders);
  res.send({ cats: Cat });
});
app.get("/cats/blue", (req, res, next: express.NextFunction) => {
  res.send({ blue: Cat[0] });
});
app.get("/cats/som", (req: express.Request, res: express.Response) => {
  res.send({ som: Cat[1] });
});

app.post("/test", (req, res) => {
  res.send({ person: "Yoon" });
});

app.use((req, res, next) => {
  console.log("this is logging middleware");
  res.send({ error: "404 not fond error" });
});

app.listen(port, () => {
  console.log(`server in on... http://localhost:${port}`);
});
