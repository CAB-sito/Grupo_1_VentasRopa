const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const mainRouter = require("./router/main");
const productRouter = require("./router/producto");
const usersRouter = require("./router/users");
const apiRouter = require("./router/api");
const path = require("path");
const session = require("express-session");
const recordameMiddleware = require("./middlewares/recordameMiddleware");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "secreto" }));
app.use(recordameMiddleware);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(mainRouter);
app.use("/products", productRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.listen(3000, () => {
  console.log("Servidor funcionando");
});
