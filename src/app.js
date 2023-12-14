const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mainRouter = require("./router/main");
const productRouter = require("./router/producto");
const path = require("path");

app.use(methodOverride("_method"));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(mainRouter);
app.use("/producto", productRouter);
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.listen(3000, () => {
  console.log("Servidor funcionando");
});
