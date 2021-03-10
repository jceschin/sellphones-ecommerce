const server = require("express").Router();
const { Order, User, Product } = require("../db.js");
const { Sequelize } = require("sequelize");

server.get("/cart/:id", (req, res) => {
  //ruta para encontrar la orden carrito y devolver el id de la orden

  const { id } = req.params;
  Order.findOne({
    where: { state: "cart", userId: id },
    include: [{ model: Product }],
  })
    .then((order) => {
      res.status(200).json({
        mensaje: "Se encontro el carrito",
        data: order,
      });
    })
    .catch((err) => {
      res.status(400).json({
        mensaje: "No se encontro el carrito",
        data: err,
      });
    });
});

//traer todas las ordenes de un usuario en especifico

server.get("/user/:id", (req, res) => {
  const { id } = req.params;
  Order.findAll({
    where: { userId: id },
    include: [{ model: Product }],
  })
    .then((orders) => {
      res.status(200).json({
        mensaje: "Se encontraron las ordenes",
        data: orders,
      });
    })
    .catch((err) => {
      res.status(400).json({
        mensaje: "No se encontraron Ordenes",
        data: err,
      });
    });
});

server.post("/cart", (req, res, next) => {
  //ruta para agregar elementos a la orden carrito y sumar con contador
  const { id } = req.body;
  Order.findAll({
    //cuando entra aca busca si ya existe una orden carrito
    where: {
      state: "cart",
      userId: id,
    },
  })
    .then((order) => {
      if (order[0]) {
        //si existe entonces devuelve el id de la orden
        res.status(200).json(order[0].dataValues.id);
      } else {
        //sino existe crea una nueva con el state en cart y devuelve el id de la orden creada
        Order.create({
          state: "cart",
          price: 0,
          userId: id,
        }).then((algo) => {
          Order.findByPk(algo.dataValues.id)
            .then((order) => order.setUser(id))
            .then((success) => res.status(200).json(algo.dataValues.id));
        });
      }
    })
    .catch((err) => {
      console.log(err);
      /* res.status(400).json({
      mensaje: "No se encontro el carrito",
      data: err,
    }); */
    });
});

// Crear ordenes al azar pueba de todas mis ordenes
server.post("/create/:userid", (req, res) => {
  const { userid } = req.params;
  Order.create({
    state: "success",
    price: 0,
    userId: userid,
  }).then((respn) => {
    res.status(200).json({ msg: "ok", data: respn });
  });
});

server.post("/cart/:orderid", (req, res, next) => {
  //con el id de la orden creada y el id del producto se hace el addProduct a la tabla intermedia
  var orderPromisse = Order.findByPk(req.params.orderid);
  var productInit = Product.findByPk(req.body.idproduct);
  var produtOrder = Product.findOne({
    where: { id: req.body.idproduct },
    include: { where: { id: req.params.orderid }, model: Order },
  });

  //esta funcion se fija si existe ya un producto igual en esa orden
  Promise.all([orderPromisse, productInit, produtOrder])
    .then((data) => {
      data[0].hasProduct(req.body.idproduct).then((exist) => {
        if (exist) {
          //si existe suma el contador en 1
          // con sequelize literal puedo hacer la suma del contador
          var newCount = data[2].orders[0].order_line.count + 1;
          var newPrice = data[2].price * newCount;
          data[0]
            .addProduct(req.body.idproduct, {
              through: { price: newPrice, count: newCount },
            })
            .then((resp) => {
              res.send(resp);
            });
        } else {
          //si no existe agrega el producto
          data[0]
            .addProduct(req.body.idproduct, {
              through: { price: data[1].price },
            })
            .then((success) => res.sendStatus(201))
            .catch((err) => {
              console.log(err);
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/", (req, res) => {
  let state = req.query.status;
  let order;

  // Find order WHERE state: state, JOIN User ON order.user_id = user.id
  // We get array with object with a key 'user'. typeof user ==== 'object'
  if (state) {
    order = Order.findAll({
      where: {
        state,
      },
      include: {
        model: User,
      },
    });
  } else {
    order = Order.findAll({
      include: {
        model: User,
      },
    });
  }
  order.then((orders) => {
    res.send(orders);
  });
});

//Elimina una orden especifica del carrito
server.delete("/cart/:orderid", (req, res) => {
  const { orderid } = req.params;
  Order.findOne({
    where: { id: orderid }
  }).then(deleteOrder => {
    deleteOrder.destroy();
    res.status(200).json({
      mensaje: "Order Deleted", data: deleteOrder
    })
  })
    .catch(err => {
      res.status(400).json({ mensaje: "The order could not be deleted", data: err })
    })
})

server.delete("/cart/:orderid/:productid", (req, res, next) => {
  //borra un producto especifico del carrito

  var orderInc = Order.findByPk(req.params.orderid);
  var deleteProduct = Product.findByPk(req.params.productid);
  var produtOrder = Product.findOne({
    where: { id: req.params.productid },
    include: { where: { id: req.params.orderid }, model: Order },
  });

  Promise.all([orderInc, deleteProduct, produtOrder]).then((data) => {
    var deleteTotal =
      data[0].price - data[1].price * data[2].orders[0].order_line.count;
    data[0].price = deleteTotal;
    data[0].removeProduct(req.params.productid);
    data[0].save();
    res.status(200).json({
      message: "Se borro el producto del carrito",
      order: data[0],
      orderMin: data[2]
    });
  });
});

server.delete("/miniCart/:orderid/:productid", (req, res, next) => {
  //borra un producto especifico del carrito

  var orderInc = Order.findByPk(req.params.orderid);
  var deleteProduct = Product.findByPk(req.params.productid);
  var produtOrder = Product.findOne({
    where: { id: req.params.productid },
    include: { where: { id: req.params.orderid }, model: Order },
  });

  Promise.all([orderInc, deleteProduct, produtOrder]).then((data) => {
    var deleteTotal =
      data[0].price - data[1].price * data[2].orders[0].order_line.count;
    data[0].price = deleteTotal;
    data[0].removeProduct(req.params.productid);
    data[0].save();
    Order.findOne({
      where: { state: "cart", id: req.params.orderid },
      include: [{ model: Product }],
    })
      .then(result => {
        res.status(200).json({
          message: "Se borro el producto del carrito",
          order: result,
          orderMin: data[0]
        });
      })
  });
});


//Obtiene una orden especifica.
server.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Order.findOne({
    where: { id },
    include: {
      model: Product,
    },
  })
    .then((order) => {
      console.log(order);
      res.json({ mensaje: "Successfully", data: order });
    })
    .catch((err) => {
      res.status(400).json({ mensaje: "order not found" });
    });
});

//Modifica una orden especifica.
server.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    city,
    adress,
    phone,
    postal,
    subTotal,
    iva,
    price,
    paymentMethod,
    state,
  } = req.body;

  Order.findOne({
    where: { id: id },
  })
    .then((order) => {
      order.city = city;
      order.adress = adress;
      order.phone = phone;
      order.postal = postal;
      order.subTotal = subTotal;
      order.iva = iva;
      order.price = price;
      order.paymentMethod = paymentMethod;
      order.state = state;
      order.save();
      res.json({ mensaje: "Successfully modified order", data: order });
    })
    .catch((err) => {
      res.status(400).json({ mensaje: "Successfully modified order", err });
    });
});

//Get order with specific state
server.get('/state/:state', (req, res) => {
  let { state } = req.params;

  let order = Order.findAll({
    where: {
      state
    },
    include: {
      model: User
    }
  })
  order.then(orders => {
    res.send(orders);
  })
})

server.get("/orderproducts/:orderid", (req, res, next) => {
  let { orderid } = req.params;

  Order.findAll({
    where: { id: orderid },
    include: { model: Product },
  })
    .then((products) => {
      res.json({ message: "All products obtained", data: products });
    })
    .catch((err) => {
      res.status(400).json({ message: "Imposible", data: err });
    });
});
server.get("/orderproductsdetail/:orderid", (req, res, next) => {
  let { orderid } = req.params;

  Order.findOne({
    where: { id: orderid },
    include: { model: Product },
  })
    .then((products) => {
      res.json({ message: "All products obtained", data: products });
    })
    .catch((err) => {
      res.status(400).json({ message: "Imposible", data: err });
    });
});

server.get("/products/:orderid", (req, res, next) => {
  let { orderid } = req.params;

  Product.findAll({
    where: { id: orderid },
    include: { model: Order },
  })
    .then((products) => {
      res.json({ message: "All products obtained", data: products });
    })
    .catch((err) => {
      res.status(400).json({ message: "Imposible", data: err });
    });
});

module.exports = server;
