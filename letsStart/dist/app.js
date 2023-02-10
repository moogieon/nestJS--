"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats/cats.route");
var app = express();
var port = 8000;
var data = [1, 2, 3, 4];
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("this is logging middleware");
    next();
});
app.use(express.json());
app.use(cats_route_1.default);
app.use(function (req, res, next) {
    console.log("this is logging middleware");
    res.send({ error: "404 not fond error" });
});
app.listen(port, function () {
    console.log("server in on... http://localhost:".concat(port));
});
//# sourceMappingURL=app.js.map