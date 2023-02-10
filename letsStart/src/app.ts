import * as express from "express";
import catRouter from "./cats/cats.route";
const app: express.Express = express();
const port: number = 8000;

const data = [1, 2, 3, 4];

//* looging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});
//*JSON middleware
app.use(express.json());

app.use(catRouter);
//* 404 middleware
app.use((req, res, next) => {
  console.log("this is logging middleware");
  res.send({ error: "404 not fond error" });
});

app.listen(port, () => {
  console.log(`server in on... http://localhost:${port}`);
});
