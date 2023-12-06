const express = require("express");
const app = express();
const indexRouter = require("./router/index");
const loginRouter = require("./router/login");
const regitroRouter = require("./router/registro");
const productRouter = require("./router/producto");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(indexRouter);
app.use(loginRouter);
app.use(regitroRouter);
app.use("/product", productRouter);
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.listen(3000, () => {
  console.log("Servidor funcionando");
});
