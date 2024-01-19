const fs = require("fs");
const path = require("path");

const recordameMiddleware = (req, res, next) => {
  if (!req.cookies?.recordame || req.session.usuario) {
    return next();
  }

  const email = req.cookies.recordame;
  let usersJSON = fs.readFileSync(
    path.resolve(__dirname, "../data/user.json"),
    {
      encoding: "utf-8",
    }
  );
  let users;
  if (usersJSON == "") {
    users = [];
  } else {
    users = JSON.parse(usersJSON);
  }

  let usuarioRecuperado;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      usuarioRecuperado = users[i];
      break;
    }
  }
  if (!usuarioRecuperado) {
    return next();
  }
  req.session.usuario = usuarioRecuperado;
  next();
};

module.exports = recordameMiddleware;
