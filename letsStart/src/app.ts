import * as express from "express";
const app: express.Express = express();
const port: number = 8000;

app.get("/test", (req: express.Request, res: express.Response) => {
  res.send({name:"Lee",age:20,friends:["Kim","Park"]});
});

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`);
});
