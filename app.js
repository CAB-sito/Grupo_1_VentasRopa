const express = require("express");
const app = express();
const indexRouter = require('./router/index');
const loginRouter = require('./router/login');
const regitroRouter = require('./router/registro');
const productDtailRouter = require('./router/productDtail');
const pruductCartRouter = require('./router/productCart');


app.set('view engine','ejs'); 

app.use(express.static("public"));
app.use(indexRouter);
app.use(loginRouter);
app.use(regitroRouter);
app.use(productDtailRouter);
app.use(pruductCartRouter);

app.listen(3000, () => {
  console.log("Servidor funcionando");
});

