import * as express from "express";
import { Cat, CatType } from "./app.model";
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

// app.get("/test", (req: express.Request, res: express.Response) => {
//   console.log(req.rawHeaders);
//   res.send({ cats: Cat });
// });
// app.get("/cats/blue", (req, res, next: express.NextFunction) => {
//   res.send({ blue: Cat[0] });
// });
// app.get("/cats/som", (req: express.Request, res: express.Response) => {
//   res.send({ som: Cat[1] });
// });

// app.post("/test", (req, res) => {
//   res.send({ person: "Yoon" });
// });

//* READ 고양이 전체 데이터 조회
app.get("/cats", (req: express.Request, res: express.Response) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});
//* READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req: express.Request, res: express.Response) => {
  try {
    const params = req.params;
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });

    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* CREATE 새로운 고양이 추가
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});
//* 404 middleware
app.use((req, res, next) => {
  console.log("this is logging middleware");
  res.send({ error: "404 not fond error" });
});

app.listen(port, () => {
  console.log(`server in on... http://localhost:${port}`);
});
