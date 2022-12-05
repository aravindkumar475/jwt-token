const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req,res) => {
  res.json({
    message: "Welcome to the Api",
  });
});
app.post("/api/posts", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err,authdata) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created",
        authdata
      });
    }
  });
});

app.post("/api/login", (req,res) => {
  const user = {
    id: 1,
    name: "ram",
    email: "ram@gmail.com",
  };
  jwt.sign({ user }, "secretkey",{expiresIn:'30s'} ,(err, token) => {
    res.json({
      token,
    });
  });
});

function verifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearertoken = bearer[1];
    req.token = bearertoken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(3000, () => console.log("Server started"));
