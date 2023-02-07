"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
var data = [1, 2, 3, 4];
app.get("/test", function (req, res) {
    console.log(req);
    res.send({ cats: app_model_1.Cat });
});
app.post("/test", function (req, res) {
    res.send({ person: "Yoon" });
});
app.listen(port, function () {
    console.log("server in on... http://localhost:".concat(port));
});
//# sourceMappingURL=app.js.map