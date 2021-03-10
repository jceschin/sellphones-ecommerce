const server = require("express").Router();
const { User } = require("../db.js");
const validadmin = require("../verify");

server.get("/", async (req, res, next) => {
  try {
    //if (req.user?.isAdmin) {
    const result = await User.findAll();
    res.json(result);
    //else {
    //res.sendStatus(401);;
    //}
  } catch (error) {
    next(error);
  }
});
server.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

server.put("/:id", validadmin, (req, res) => {
  const { id } = req.params;
  //del body sacamos los datos que queremos modificar
  const { givenName, familyName, email, isAdmin } = req.body;
  console.log(isAdmin);

  return User.findOne({ where: { id } })
    .then((product) => {
      //pisamos las propiedades del producto que encontramos
      product.givenName = givenName;
      product.familyName = familyName;
      product.email = email;
      product.isAdmin = isAdmin;
      product.save();
      res.status(200).json({ mensaje: "Se modifico con exito", data: product });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ mensaje: "Los campos enviados no son correctos", data: err });
    });
});

server.post("/passwordreset", (req, res) => {
  const { oldpassword, password , id } = req.body;
  User.findOne({ where: { id } })
    .then((user) => {
      if (user.compare(oldpassword))
      {
        user.password = password;
        user.save();
        res.status(200).json({ mensaje: "Good"});
      }
      else
      res.status(200).json({ mensaje: "Incorrect"});
    })
    .catch((err) => {
      res
        .status(400)
        .json({ mensaje: "Los campos enviados no son correctos"});
    });
});



server.post("/passwordresetforgot", (req, res) => {
  const { password , id } = req.body;
  User.findOne({ where: { id } })
    .then((user) => {
      user.password = password;
      user.save();
      res.status(200).json({ mensaje: "Se modifico con exito", data: user });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ mensaje: "Los campos enviados no son correctos", data: err });
    });
});

server.delete("/:id", validadmin, (req, res) => {
  const { id } = req.params;

  return User.findOne({ where: { id } })
    .then((deleteProduct) => {
      deleteProduct.destroy();
      res.status(200).json({
        mensaje: "USER DELETED OK",
        data: deleteProduct,
      });
    })
    .catch((err) => {
      res.status(400).json({ mensaje: "IMPOSIBLE DELETE USER", data: err });
    });
});

module.exports = server;
