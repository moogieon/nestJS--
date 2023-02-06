"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8000;
app.get("/test", function (req, res) {
    res.send({ name: "Lee", age: 20, friends: ["Kim", "Park"] });
});
app.listen(port, function () {
    console.log("Example app listening on port at http://localhost:".concat(port));
});
//# sourceMappingURL=app.js.map