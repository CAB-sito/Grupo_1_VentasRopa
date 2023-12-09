const express = require("express");
const app = express();
const mainRouter = require("./router/main")
const productRouter = require("./router/producto");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(mainRouter);
app.use("/product", productRouter);
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.listen(3000, () => {
  console.log("Servidor funcionando");
});
