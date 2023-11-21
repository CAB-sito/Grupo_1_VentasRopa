const express = require("express");
const path = require("path");
const app = express();
const paht = require("path");

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Servidor funcionando");
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/index.html"));
});
app.get("/productCart", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/productCart.html"));
});
