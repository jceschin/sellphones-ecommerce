const server = require("express").Router();
const { Category } = require("../db.js");
const validadmin = require("../verify");

server.get("/", (req, res, next) => {
  Category.findAll()
    .then((category) => {
      res.send(category);
    })
    .catch(next);
});
// aceptame
server.get("/search", (req, res) => {
  Category.findAll({
    where: {
      categoryName: req.query.query,
    },
  });
});

server.post("/", validadmin, (req, res, next) => {
  Category.create({
    name: req.body.name,
  })
    .then((category) => {
      res.json({ mensaje: "categoria creada OK", data: category });
    })
    .catch(next);
});

server.delete("/:id", validadmin, (req, res) => {
  const { id } = req.params;

  return Category.findOne({ where: { id } })
    .then((deleteCategory) => {
      deleteCategory.destroy();
      res.status(200).json({
        mensaje: "La categria fue eliminada correctamente",
        data: deleteCategory,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ mensaje: "No se pudo eliminar la categoria", data: err });
    });
});

server.put("/:id", validadmin, (req, res) => {
  //sacamos el id del producto que queremos modificar
  const { id } = req.params;
  //del body sacamos los datos que queremos modificar
  const { name } = req.body;

  return Category.findOne({ where: { id } })
    .then((category) => {
      //pisamos las propiedades del producto que encontramos
      category.name = name;
      category.save();
      res
        .status(200)
        .json({ mensaje: "Se modifico con exito", data: category });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ mensaje: "Los campos enviados no son correctos", data: err });
    });
});

module.exports = server;
